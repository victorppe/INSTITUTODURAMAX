"use client"

import { useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface QuizStep {
  tipo: "q" | "info"
  t: string
  sub?: string
  op?: string[]
  img?: string
  depo?: string
  bullets?: string[]
}

interface QuizState {
  currentStep: number
  isAnalyzing: boolean
  analyzeProgress: number
  showResults: boolean
  isTransitioning: boolean
  userAnswers: Record<number, string>
  pencilSize: number // Default size in cm
  showDragInterface: boolean
  showPlanLoading: boolean
  planProgress: number
}

const QUIZ_CONFIG = {
  TOTAL_STEPS: 10, // Updated to include new drag step
  PROGRESS_INTERVAL: 250,
  PROGRESS_INCREMENT: 3.7,
  TRANSITION_DELAY: 300,
  ANALYSIS_DELAY: 500,
  MAX_PROGRESS: 96,
  INITIAL_ANALYZE_PROGRESS: 5,
  LOADING_PROGRESS_INTERVAL: 100,
  LOADING_PROGRESS_INCREMENT: 2,
  LOADING_COMPLETE_DELAY: 6500,
} as const

const STEPS: QuizStep[] = [
  { tipo: "q", t: "QUANTOS ANOS VOCÊ TEM?", op: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"] },
  {
    tipo: "q",
    t: "QUANTAS HORAS VOCÊ COSTUMA DORMIR POR NOITE?",
    op: ["Menos de 5h (sempre cansado)", "De 5 a 6h", "De 6 a 7h", "8h ou mais (na régua)"],
  },
  {
    tipo: "q",
    t: "VOCÊ TREINA OU FAZ ALGUMA ATIVIDADE FÍSICA?",
    op: ["Nunca", "1 vez na semana ou menos", "2 a 3 vezes na semana", "4 vezes ou mais"],
  },
  {
    tipo: "q",
    t: "E A SUA ALIMENTAÇÃO, COMO TÁ?",
    op: [
      "Péssima (fast food e refri direto)",
      "Mais ou menos (metade saudável, metade besteira)",
      "Boa (a maioria das refeições é saudável)",
      "Top (dieta equilibrada todo dia)",
    ],
  },
  {
    tipo: "q",
    t: "VOCÊ COSTUMA SE MASTURBAR…?",
    op: ["Mais de 1 vez por dia", "Todos os dias", "2 a 4 vezes por semana", "Raramente"],
  },
  { tipo: "q", t: "VOCÊ ACORDA COM EREÇÃO PELA MANHÃ?", op: ["Quase nunca", "Raramente", "Às vezes", "Quase sempre"] },
  {
    tipo: "q",
    t: "SOBRE O TAMANHO, VOCÊ DIRIA QUE ESTÁ…?",
    op: ["Abaixo da média", "Na média", "Um pouco acima", "Bem acima"],
  },
  {
    tipo: "q",
    t: "SE EXISTISSE UM MÉTODO NATURAL, USADO POR MILHARES DE CARAS, QUE AUMENTA O TAMANHO SEM REMÉDIO NEM CIRURGIA, VOCÊ GOSTARIA DE CONHECER?",
    op: ["Com certeza", "Talvez, quero entender melhor", "Só se for 100% seguro", "Não teria interesse"],
  },
  {
    tipo: "info",
    t: "Você está em boas mãos",
    sub: "O Método Congolês foi desenvolvido a partir de tradições milenares combinadas com descobertas modernas da saúde sexual masculina.",
    bullets: [
      "Apenas 5 minutos por dia já são suficientes para iniciar sua transformação.",
      "Pode ser praticado em qualquer lugar — em casa, no trabalho ou até durante uma simples caminhada.",
      "Os exercícios são completamente discretos, ninguém percebe que você está praticando.",
      "O programa evolui de forma progressiva, respeitando o seu ritmo.",
      "Inclui fundamentos teóricos, exercícios práticos, rituais energéticos, técnicas avançadas e um plano diário passo a passo.",
      "78% dos homens relatam sentir melhorias perceptíveis já nas primeiras 4 semanas.",
    ],
  },
]

const useQuizState = () => {
  const [state, setState] = useState({
    currentStep: 1,
    isAnalyzing: false,
    analyzeProgress: QUIZ_CONFIG.INITIAL_ANALYZE_PROGRESS,
    showResults: false,
    isTransitioning: false,
    userAnswers: {},
    pencilSize: 12, // Default size in cm
    showDragInterface: false,
    showPlanLoading: false,
    planProgress: 0,
  })

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  return { state, updateState }
}

const LogoSection = () => (
  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
      <div className="w-4 h-5 sm:w-5 sm:h-7 md:w-6 md:h-8 bg-gradient-to-b from-[#0053C1] to-[#003d91] rounded-full relative">
        <div className="absolute top-0.5 sm:top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-white rounded-full"></div>
      </div>
    </div>
    <div className="text-left">
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-wide leading-tight">
        MÉTODO
      </div>
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-wide leading-tight">
        CONGOLÊS
      </div>
    </div>
  </div>
)

const QuizHeader = () => (
  <header className="bg-[#0053C1] text-center py-4 sm:py-6 md:py-8 lg:py-10 px-4">
    <div className="flex flex-col items-center justify-center mt-[-5px] sm:mt-[-10px] mb-[-1px]">
      <LogoSection />
      <div className="text-xs sm:text-sm md:text-base lg:text-lg text-white uppercase tracking-widest font-semibold mt-[-5px] sm:mt-[-10px] mb-[-15px]">
        DIAGNÓSTICO PERSONALIZADO
      </div>
    </div>
  </header>
)

const ProgressBar = ({ progress }) => (
  <div className="mx-2 sm:mx-4 md:mx-8 mb-3 sm:mb-4">
    <div className="h-1 sm:h-1.5 md:h-2 bg-[#edf2f7] rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#4A90E2] to-[#0053C1] transition-all duration-500 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
)

const OptionText = ({ text }) => (
  <span className="block w-full break-words leading-5 sm:leading-6 md:leading-7 font-medium sm:text-base md:text-lg text-lg">
    {text.length > 20 ? (
      <span
        dangerouslySetInnerHTML={{
          __html: text
            .replace(/(\w+\s+\w+\s+\w+)\s+/g, "$1<br />")
            .replace(/,\s+/g, ",<br />")
            .replace(/\?\s+/g, "?<br />")
            .replace(/\.\s+/g, ".<br />"),
        }}
      />
    ) : (
      text
    )}
  </span>
)

const QuestionOptions = ({ options, onAnswer }) => (
  <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-[-5px] sm:mt-[-10px] sm:px-[50px] px-6">
    {options.map((option, idx) => (
      <Button
        key={`option-${idx}-${option.slice(0, 10)}`}
        onClick={() => onAnswer(option)}
        className="w-full bg-white text-[#2a3b57] hover:bg-[#f8fafc] border border-[#e2e8f0] shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 p-3 sm:p-4 md:p-5 rounded-[10px] sm:rounded-[12px] md:rounded-[14px] text-center font-normal text-xs sm:text-sm md:text-base leading-relaxed min-h-[45px] sm:min-h-[50px] md:min-h-[60px] h-auto"
      >
        <OptionText text={option} />
      </Button>
    ))}
  </div>
)

const BulletList = ({ bullets }) => (
  <ul className="space-y-3 sm:space-y-4 px-1 sm:px-2">
    {bullets.map((bullet, idx) => (
      <li
        key={`bullet-${idx}-${bullet.slice(0, 20)}`}
        className="bg-white border border-[#e6ecf3] text-[#2a3b57] p-4 sm:p-5 md:p-6 rounded-xl shadow-lg font-bold text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px] lg:min-h-[90px]"
      >
        {bullet}
      </li>
    ))}
  </ul>
)

const StepIcon = () => (
  <svg
    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#0053C1] flex-shrink-0"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6s-24-10.8-24-24V240c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
  </svg>
)

const DragInterface = ({ pencilSize, onPencilSizeChange, onContinue }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const size = Math.round(8 + (percentage / 100) * 12) // 8-20cm range
    onPencilSizeChange(size)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const size = Math.round(8 + (percentage / 100) * 12) // 8-20cm range
    onPencilSizeChange(size)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const size = Math.round(8 + (percentage / 100) * 12) // 8-20cm range
    onPencilSizeChange(size)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const size = Math.round(8 + (percentage / 100) * 12) // 8-20cm range
    onPencilSizeChange(size)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    handleDrag(e)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleTouchEnd = () => setIsDragging(false)

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-center text-[#0053C1] uppercase tracking-wide px-1 sm:px-2">
        QUAL SEU TAMANHO ATUAL?
      </h2>

      <div className="text-center text-[#0053C1] text-sm sm:text-base md:text-lg mb-6">
        Arraste para selecionar seu tamanho atual
      </div>

      <div className="bg-gradient-to-r from-[#0053C1] to-[#003d91] p-6 rounded-xl text-center">
        <div className="text-white text-lg mb-4">Tamanho Atual</div>
        <div className="text-4xl font-black text-white mb-4">{pencilSize}cm</div>

        <div
          className="relative w-full h-12 bg-white/20 rounded-full cursor-pointer mb-4 select-none"
          onClick={handleDrag}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-200 ${
              isDragging ? "scale-110" : "scale-100"
            }`}
            style={{ left: `${((pencilSize - 8) / 12) * 100}%`, marginLeft: "-12px" }}
          />
        </div>

        <div className="flex justify-between text-white/80 text-sm">
          <span>8cm</span>
          <span>20cm</span>
        </div>
      </div>

      <Button
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-[#0053C1] to-[#003d91] hover:from-[#003d91] hover:to-[#0053C1] text-white font-bold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-[10px] sm:rounded-[12px] md:rounded-[14px] text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
      >
        CONTINUAR
      </Button>
    </div>
  )
}

const DiagnosticQuiz = () => {
  const { state, updateState } = useQuizState()
  const {
    currentStep,
    isAnalyzing,
    analyzeProgress,
    showResults,
    isTransitioning,
    userAnswers,
    pencilSize,
    showDragInterface,
    showPlanLoading,
    planProgress,
  } = state

  const currentStepData = useMemo(() => STEPS[currentStep - 1], [currentStep])
  const progress = useMemo(() => (currentStep / QUIZ_CONFIG.TOTAL_STEPS) * 100, [currentStep])

  const getStepLabel = useCallback((step) => {
    if (step === 9) return "ANALISANDO..."
    if (step === 10) return "SEU TAMANHO"
    return `PERGUNTA ${step}`
  }, [])

  const startAnalysis = useCallback(() => {
    console.log("[v0] Starting analysis with new loading behavior")

    let currentProgress = QUIZ_CONFIG.INITIAL_ANALYZE_PROGRESS

    const interval = setInterval(() => {
      currentProgress += QUIZ_CONFIG.LOADING_PROGRESS_INCREMENT

      if (currentProgress >= 100) {
        clearInterval(interval)
        console.log("[v0] Loading reached 100%, showing drag interface")

        updateState({
          analyzeProgress: 100,
          showDragInterface: true,
          currentStep: 10,
          isAnalyzing: false,
        })
      } else {
        updateState({ analyzeProgress: currentProgress })
      }
    }, QUIZ_CONFIG.LOADING_PROGRESS_INTERVAL)

    return () => clearInterval(interval)
  }, [updateState])

  const startPlanPreparation = useCallback(() => {
    console.log("[v0] Starting plan preparation loading")

    let currentProgress = 0

    const interval = setInterval(() => {
      currentProgress += 2

      if (currentProgress >= 100) {
        clearInterval(interval)
        console.log("[v0] Plan preparation complete, redirecting to protocol")

        // Redirect to protocol page after loading completes
        window.location.href = "/protocolo"
      } else {
        updateState({ planProgress: currentProgress })
      }
    }, 100)

    return () => clearInterval(interval)
  }, [updateState])

  const handlePencilSizeChange = useCallback(
    (size) => {
      updateState({ pencilSize: size })
    },
    [updateState],
  )

  const handleDragContinue = useCallback(() => {
    updateState({
      showResults: true,
      showDragInterface: false,
      isTransitioning: true,
    })

    setTimeout(() => {
      updateState({ isTransitioning: false })
    }, 600) // Updated to 600ms for slower fade
  }, [updateState])

  const handleAnswer = useCallback(
    (answer) => {
      updateState({
        userAnswers: { ...userAnswers, [currentStep]: answer },
        isTransitioning: true,
      })

      setTimeout(() => {
        if (currentStep === 8) {
          updateState({
            currentStep: 9,
            isAnalyzing: true,
            isTransitioning: false,
          })
          setTimeout(() => {
            startAnalysis()
          }, 100)
        } else if (currentStep < 8) {
          updateState({
            currentStep: currentStep + 1,
            isTransitioning: false,
          })
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, QUIZ_CONFIG.TRANSITION_DELAY)
    },
    [currentStep, userAnswers, updateState, startAnalysis],
  )

  if (currentStep === 9 && isAnalyzing) {
    return (
      <div className="min-h-screen bg-[#0053C1] text-white font-sans">
        <div className="bg-[#0053C1]">
          <QuizHeader />

          <main className="max-w-[350px] sm:max-w-[400px] md:max-w-[500px] mx-auto p-3 sm:p-4 md:p-6">
            <div className="bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-[#0f1a2a] mb-3 sm:mb-4">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <div className="text-xs sm:text-sm md:text-base text-slate-500 font-medium mb-1 tracking-widest">
                  PASSO {currentStep}/10
                </div>

                <div className="flex items-center justify-center gap-1 mb-2">
                  <StepIcon />
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-[#0053C1] tracking-widest text-center space-y-0">
                    {getStepLabel(currentStep)}:
                  </span>
                </div>
                <ProgressBar progress={progress} />
              </div>

              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <h2 className="sm:text-xl md:text-2xl lg:text-3xl text-[#0053C1] leading-tight font-black uppercase mt-[-3px] sm:mt-[-5px] text-2xl py-1.5 text-center">
                  CALCULANDO SEU POTENCIAL
                </h2>
                <div className="text-center text-[#0053C1] italic px-1 sm:px-2 text-sm sm:text-base md:text-lg">
                  Determinando quantos centímetros você pode ganhar…
                </div>
                <div className="mx-2 sm:mx-4 md:mx-8">
                  <div className="h-2 sm:h-3 md:h-4 bg-[#edf2f7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4A90E2] to-[#0053C1] transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${analyzeProgress}%` }}
                    />
                  </div>
                </div>
                <div className="text-center text-[#0053C1] font-bold text-lg sm:text-xl md:text-2xl">
                  {Math.round(analyzeProgress)}%
                </div>
              </div>
            </div>

            <div className="bg-[#0053C1] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-6 text-center mb-4 sm:mb-6">
              <div className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
                <strong>Aviso de Privacidade:</strong> Suas respostas são 100% anônimas e confidenciais.
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (currentStep === 10 && showDragInterface) {
    return (
      <div className="min-h-screen bg-[#0053C1] text-white font-sans">
        <div className="bg-[#0053C1]">
          <QuizHeader />

          <main className="max-w-[350px] sm:max-w-[400px] md:max-w-[500px] mx-auto p-3 sm:p-4 md:p-6">
            <div className="bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-[#0f1a2a] mb-3 sm:mb-4">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <div className="text-xs sm:text-sm md:text-base text-slate-500 font-medium mb-1 tracking-widest">
                  PASSO {currentStep}/10
                </div>

                <div className="flex items-center justify-center gap-1 mb-2">
                  <StepIcon />
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-[#0053C1] tracking-widest text-center space-y-0">
                    {getStepLabel(currentStep)}:
                  </span>
                </div>
                <ProgressBar progress={(currentStep / QUIZ_CONFIG.TOTAL_STEPS) * 100} />
              </div>

              <DragInterface
                pencilSize={pencilSize}
                onPencilSizeChange={handlePencilSizeChange}
                onContinue={handleDragContinue}
              />
            </div>

            <div className="bg-[#0053C1] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-6 text-center mb-4 sm:mb-6">
              <div className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
                <strong>Aviso de Privacidade:</strong> Suas respostas são 100% anônimas e confidenciais.
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (currentStep === 10 && showResults && !showPlanLoading) {
    const userAge = userAnswers[1] || "25 a 29"

    const baseSizeNum = pencilSize
    const potentialGain = baseSizeNum >= 16 ? 3 : Math.floor(Math.random() * 4) + 4 // 3cm for 16cm+, 4-7cm for others
    const maxSize = baseSizeNum + potentialGain

    return (
      <div className="min-h-screen bg-[#0053C1] text-white font-sans">
        <div className="bg-[#0053C1]">
          <QuizHeader />

          <main className="max-w-[350px] sm:max-w-[400px] md:max-w-[500px] mx-auto p-3 sm:p-4 md:p-6">
            <div className="bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-[#0f1a2a] mb-3 sm:mb-4">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <div className="text-xs sm:text-sm md:text-base text-slate-500 font-medium mb-1 tracking-widest">
                  PASSO 10/10
                </div>

                <div className="flex items-center justify-center gap-1 mb-2">
                  <StepIcon />
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-[#0053C1] tracking-widest text-center">
                    RESULTADO:
                  </span>
                </div>
                <ProgressBar progress={100} />
              </div>

              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <h2 className="sm:text-xl md:text-2xl lg:text-3xl text-[#0053C1] leading-tight font-black uppercase mt-[-3px] sm:mt-[-5px] text-2xl py-1.5 text-center">
                  SEU POTENCIAL DE CRESCIMENTO
                </h2>

                <div className="bg-gradient-to-r from-[#0053C1] to-[#003d91] p-6 rounded-xl text-center">
                  <div className="text-white text-lg mb-4">Você pode aumentar até</div>
                  <div className="text-4xl font-black text-white mb-4">{potentialGain}cm</div>
                  <div className="text-white text-sm">em apenas 30 dias</div>
                </div>

                <div className="flex justify-between items-center bg-gray-100 p-3 sm:p-4 rounded-xl">
                  <div className="text-center">
                    <div className="text-gray-600 text-xs sm:text-sm">Tamanho Atual</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#0053C1]">{baseSizeNum}cm</div>
                  </div>
                  <div className="text-[#0053C1] text-xl sm:text-2xl">→</div>
                  <div className="text-center">
                    <div className="text-gray-600 text-xs sm:text-sm">Seu Potencial</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#003d91]">{maxSize}cm</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm md:text-base text-yellow-800 font-semibold">
                    ⚠️ <strong>Importante:</strong> Estes resultados são alcançados apenas com dedicação, consistência e
                    seguindo rigorosamente o protocolo por pelo menos 30 dias consecutivos.
                  </p>
                </div>

                <div className="bg-[#F5F5DC] border-l-4 border-[#0053C1] p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm md:text-base text-[#0053C1] font-semibold">
                    ✓ 97% dos homens conseguem alcançar seu potencial máximo em 30 dias
                  </p>
                </div>

                <div className="text-center px-2 sm:px-4">
                  <Button
                    onClick={() => {
                      updateState({ showPlanLoading: true, planProgress: 0 })
                      setTimeout(() => {
                        startPlanPreparation()
                      }, 100)
                    }}
                    className="bg-gradient-to-r from-[#0053C1] to-[#003d91] hover:from-[#003d91] hover:to-[#0053C1] text-white font-bold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl min-w-[280px] sm:min-w-[300px] w-full md:w-auto text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    COMEÇAR MEU CRESCIMENTO AGORA!
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-[#0053C1] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-6 text-center mb-4 sm:mb-6">
              <div className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
                <strong>Aviso de Privacidade:</strong> Suas respostas são 100% anônimas e confidenciais.
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (showPlanLoading) {
    return (
      <div className="min-h-screen bg-[#0053C1] text-white font-sans">
        <div className="bg-[#0053C1]">
          <QuizHeader />

          <main className="max-w-[350px] sm:max-w-[400px] md:max-w-[500px] mx-auto p-3 sm:p-4 md:p-6">
            <div className="bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-[#0f1a2a] mb-3 sm:mb-4">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <div className="text-xs sm:text-sm md:text-base text-slate-500 font-medium mb-1 tracking-widest">
                  FINALIZANDO...
                </div>

                <div className="flex items-center justify-center gap-1 mb-2">
                  <StepIcon />
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-[#0053C1] tracking-widest text-center space-y-0">
                    PREPARANDO SEU PLANO:
                  </span>
                </div>
                <ProgressBar progress={100} />
              </div>

              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <h2 className="sm:text-xl md:text-2xl lg:text-3xl text-[#0053C1] leading-tight font-black uppercase mt-[-3px] sm:mt-[-5px] text-2xl py-1.5 text-center">
                  PREPARANDO O SEU PLANO PERSONALIZADO
                </h2>
                <div className="text-center text-[#0053C1] italic px-1 sm:px-2 text-sm sm:text-base md:text-lg">
                  Criando seu protocolo baseado nas suas respostas...
                </div>
                <div className="mx-2 sm:mx-4 md:mx-8">
                  <div className="h-2 sm:h-3 md:h-4 bg-[#edf2f7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4A90E2] to-[#0053C1] transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${planProgress}%` }}
                    />
                  </div>
                </div>
                <div className="text-center text-[#0053C1] font-bold text-lg sm:text-xl md:text-2xl">
                  {Math.round(planProgress)}%
                </div>

                <div className="bg-[#F5F5DC] border-l-4 border-[#0053C1] p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm md:text-base text-[#0053C1] font-semibold">
                    ✓ Analisando suas respostas e criando um plano exclusivo para você
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0053C1] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-3 sm:p-4 md:p-6 text-center mb-4 sm:mb-6">
              <div className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
                <strong>Aviso de Privacidade:</strong> Suas respostas são 100% anônimas e confidenciais.
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0053C1] text-white font-sans">
      <div className="bg-[#0053C1]">
        <QuizHeader />
        <div className="flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 mb-0">
          <div
            className={`bg-white rounded-[25px] max-w-[350px] sm:max-w-lg shadow-2xl transition-all duration-600 ease-in-out h-auto w-full ${
              isTransitioning ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
            }`}
            style={{
              paddingTop: "30px",
              paddingBottom: "50px",
              paddingLeft: "0px",
              paddingRight: "10px",
              gap: "0px",
            }}
          >
            <div className="text-center mb-4 sm:mb-6 md:mb-8 mt-[-2px] sm:mt-[-3px] px-4 sm:px-6 md:px-8">
              <div className="text-xs sm:text-sm md:text-base text-slate-500 font-medium mb-1 tracking-widest">
                PASSO {currentStep}/10
              </div>

              <div className="flex items-center justify-center gap-1 mt-[-5px] sm:mt-[-10px] mb-0.5">
                <StepIcon />
                <span className="text-sm sm:text-base md:text-lg font-semibold text-[#0053C1] tracking-widest text-center space-y-0">
                  {getStepLabel(currentStep)}:
                </span>
              </div>
              <ProgressBar progress={progress} />
            </div>

            <div className="text-center mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6 md:px-8">
              <h2 className="sm:text-xl md:text-2xl lg:text-3xl text-[#0053C1] leading-tight font-black uppercase mt-[-3px] sm:mt-[-5px] text-2xl py-1.5">
                {currentStepData?.t}
              </h2>
              {currentStepData?.sub && (
                <p className="text-sm sm:text-base md:text-lg text-[#6b7280] mt-2 sm:mt-3 leading-relaxed">
                  {currentStepData.sub}
                </p>
              )}
            </div>

            {currentStepData?.tipo === "q" && currentStepData.op && (
              <div className="px-4 sm:px-6 md:px-8">
                <QuestionOptions options={currentStepData.op} onAnswer={handleAnswer} />
              </div>
            )}

            {currentStepData?.tipo === "info" && (
              <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-8">
                {currentStepData.img && (
                  <div className="text-center">
                    <Image
                      src={currentStepData.img || "/placeholder.svg"}
                      alt="Método Congolês"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {currentStepData.bullets && <BulletList bullets={currentStepData.bullets} />}

                {currentStepData.depo && (
                  <div className="bg-[#F5F5DC] border-l-4 border-[#0053C1] p-3 sm:p-4 md:p-5 rounded-lg">
                    <p className="text-xs sm:text-sm md:text-base text-[#0053C1] italic leading-relaxed">
                      "{currentStepData.depo}"
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => handleAnswer("Continuar")}
                  className="w-full bg-gradient-to-r from-[#0053C1] to-[#003d91] hover:from-[#003d91] hover:to-[#0053C1] text-white font-bold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-[10px] sm:rounded-[12px] md:rounded-[14px] text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  CONTINUAR
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#0053C1] text-center py-3 sm:py-4 px-3 sm:px-4">
          <p className="text-white text-xs sm:text-sm sm:mt-[-10px] mt-[-10px]">
            <span className="font-semibold">Aviso de Privacidade:</span> Suas respostas são 100% anônimas e
            confidenciais.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DiagnosticQuiz
