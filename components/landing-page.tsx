"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleDotClick = (index: number) => {
    setCurrentTestimonial(index)
    const track = document.querySelector(".testimonials-track") as HTMLElement
    if (track) {
      track.style.transform = `translateX(-${index * 100}%)`
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    // Snap to nearest testimonial
    const carousel = carouselRef.current
    if (carousel) {
      const slideWidth = carousel.offsetWidth
      const newIndex = Math.round(carousel.scrollLeft / slideWidth)
      const clampedIndex = Math.max(0, Math.min(6, newIndex))
      setCurrentTestimonial(clampedIndex)

      const track = document.querySelector(".testimonials-track") as HTMLElement
      if (track) {
        track.style.transform = `translateX(-${clampedIndex * 100}%)`
      }
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#122033] font-sans">
      {/* Header */}
      <header className="max-w-[1120px] mx-auto px-4 md:px-6 py-4 md:py-[18px]"></header>

      {/* Main Content */}
      <main className="max-w-[1120px] mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <section className="grid gap-4 md:gap-6 mb-[18px]">
          <div className="text-xs tracking-[0.18em] text-[#6B7C91] uppercase">Criamos um plano personalizado para</div>
          <h1 className="text-[clamp(24px,6vw,40px)] leading-[1.15] my-[10px_0_4px] text-[#1E5AD6] font-black uppercase text-balance text-[rgba(8,66,153,1)]">
            AUMENTAR SEU PÊNIS EM 7CM EM APENAS 30 DIAS
          </h1>
          <p className="text-[#6B7C91] text-sm md:text-base leading-relaxed">
            Com base nas suas respostas, desenvolvemos um <strong>protocolo natural</strong> que vai atacar diretamente
            as <strong>causas</strong> em até 30 dias.
          </p>
          <div className="rounded-[14px] overflow-hidden border border-[#E6ECF3] shadow-lg">
            <Image
              src="https://i.imgur.com/CEdir9D.png"
              alt="Gráfico evolução"
              width={1024}
              height={677}
              className="w-full h-auto"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-[10px]">
            <div className="bg-[#0F172A] text-white rounded-[12px] p-3 md:p-4 text-center">
              <strong className="text-lg md:text-xl block">4.7</strong>
              <div className="text-[#b7c2d0] text-xs md:text-sm">Avaliação</div>
            </div>
            <div className="bg-[#0F172A] text-white rounded-[12px] p-3 md:p-4 text-center">
              <strong className="text-lg md:text-xl block">10k+</strong>
              <div className="text-[#b7c2d0] text-xs md:text-sm">Usuários</div>
            </div>
            <div className="bg-[#0F172A] text-white rounded-[12px] p-3 md:p-4 text-center">
              <strong className="text-lg md:text-xl block">1k+</strong>
              <div className="text-[#b7c2d0] text-xs md:text-sm">5 Estrelas</div>
            </div>
          </div>
        </section>

        {/* Solução Completa */}
        <section className="grid gap-4 mt-[18px]">
          <div className="text-xs tracking-[0.18em] text-[#6B7C91] uppercase">
            MÉTODO{" "}
            <span className="inline-block bg-[#FFCC23] text-[#1F1F1F] px-2 py-[0.15rem] rounded-md font-extrabold text-xs tracking-[0.06em]">
              ANCESTRAL
            </span>
          </div>
          <h2 className="text-[clamp(22px,4vw,30px)] leading-[1.2] my-3 text-[#122033] font-extrabold text-[rgba(8,66,152,1)]">
            <span className="text-[#1E5AD6] text-[rgba(8,66,152,1)]">MÉTODO </span> CONGOLÊS
          </h2>
          <p>
            O <strong>Método Congolês</strong> é uma <strong>técnica ancestral da África</strong> que combina bioativos
            naturais e ativa hormônios para promover crescimento peniano real e seguro.
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-white border border-[#E6ECF3] rounded-[8px] sm:rounded-[14px] p-2 sm:p-[18px] shadow-sm hover:shadow-md transition-shadow">
              <Image
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/01.-Kegel.webp"
                alt="Kegel"
                width={300}
                height={200}
                className="w-full h-auto mb-1 sm:mb-3 rounded-lg"
              />
              <h3 className="text-[clamp(12px,2.5vw,20px)] leading-[1.25] my-1 sm:my-2 text-[#122033] font-bold text-center">
                Kegel
              </h3>
            </div>
            <div className="bg-white border border-[#E6ECF3] rounded-[8px] sm:rounded-[14px] p-2 sm:p-[18px] shadow-sm hover:shadow-md transition-shadow">
              <Image
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/02.-Fitness.webp"
                alt="Rotinas"
                width={300}
                height={200}
                className="w-full h-auto mb-1 sm:mb-3 rounded-lg"
              />
              <h3 className="text-[clamp(12px,2.5vw,20px)] leading-[1.25] my-1 sm:my-2 text-[#122033] font-bold text-center">
                Rotinas
              </h3>
            </div>
            <div className="bg-white border border-[#E6ECF3] rounded-[8px] sm:rounded-[14px] p-2 sm:p-[18px] shadow-sm hover:shadow-md transition-shadow">
              <Image
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/03.-Breathing.webp"
                alt="Controle"
                width={300}
                height={200}
                className="w-full h-auto mb-1 sm:mb-3 rounded-lg"
              />
              <h3 className="text-[clamp(12px,2.5vw,20px)] leading-[1.25] my-1 sm:my-2 text-[#122033] font-bold text-center">
                Controle
              </h3>
            </div>
          </div>
          <h3 className="text-[clamp(18px,3vw,22px)] leading-[1.25] my-2 text-[#122033] font-bold mt-[6px]">
            Como é o <span className="text-[#1E5AD6] border-b-[3px] border-[#FFCC23]">método</span>?
          </h3>
          <ul className="grid gap-[10px] m-0 p-0 list-none">
            <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
              <span className="w-[18px] h-[18px] rounded-full bg-[#1E5AD6] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full"></span>
              <span>
                <strong>Estímulos vasculares específicos</strong> que aumentam o fluxo sanguíneo para os corpos
                cavernosos.
              </span>
            </li>
            <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
              <span className="w-[18px] h-[18px] rounded-full bg-[#1E5AD6] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full"></span>
              <span>
                <strong>Técnicas de alongamento natural</strong> baseadas em práticas tribais milenares.
              </span>
            </li>
            <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
              <span className="w-[18px] h-[18px] rounded-full bg-[#1E5AD6] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full"></span>
              <span>
                <strong>Bioativos de plantas africanas</strong> que potencializam o crescimento celular.
              </span>
            </li>
            <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
              <span className="w-[18px] h-[18px] rounded-full bg-[#1E5AD6] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full flex-shrink-0 mt-1"></span>
              <span>
                <span>
                  <strong>Técnicas exclusivas</strong> de fortalecimento do assoalho pélvico para maior controle
                  ejaculatório.
                </span>
              </span>
            </li>
          </ul>
        </section>

        {/* Antes / Depois */}
        <section className="grid gap-4 mt-[18px]">
          <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
            <div className="bg-white border border-[#E6ECF3] rounded-[8px] sm:rounded-[14px] p-2 sm:p-[18px] shadow-sm">
              <h3 className="text-[clamp(14px,2.5vw,22px)] leading-[1.25] my-1 sm:my-2 text-[#DB4747] font-bold text-center mb-2 sm:mb-4">
                Antes
              </h3>
              <Image
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/Niveis-_Antes_-630x1024.webp"
                alt="Antes"
                width={630}
                height={1024}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="bg-white border border-[#E6ECF3] rounded-[8px] sm:rounded-[14px] p-2 sm:p-[18px] shadow-sm">
              <h3 className="text-[clamp(14px,2.5vw,22px)] leading-[1.25] my-1 sm:my-2 text-[#19B14D] font-bold text-center mb-2 sm:mb-4">
                Depois
              </h3>
              <Image
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/Niveis-_Depois_-630x1024.webp"
                alt="Depois"
                width={630}
                height={1024}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          <div className="bg-[#CFEFDD] rounded-[14px] p-[18px] text-center lg:text-left">
            <strong>90%</strong> dos homens com perfis semelhantes ao seu melhoraram sua vida íntima aplicando o{" "}
            <strong>Método Congolês</strong>.
          </div>
        </section>

        {/* Logos */}
        <section className="grid gap-4 mt-[18px]">
          <h2 className="text-[clamp(18px,3vw,22px)] leading-[1.25] my-2 text-[#122033] font-bold">
            Os <strong>exercício de Kegel</strong> e fortalecimento do <strong>Assoalho Pélvico</strong> são
            recomendados internacionalmente:
          </h2>
          <div className="bg-white rounded-[14px] p-4 md:p-6 flex justify-center">
            <Image
              src="https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/instituicoes-_white_-1.webp"
              alt="Instituições que recomendam exercícios de Kegel"
              width={779}
              height={186}
              className="max-w-3xl bg-[rgba(39,47,65,1)] rounded-lg opacity-100 h-auto w-full"
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#272F41] rounded-[14px] p-3 sm:p-4 md:p-6 lg:p-8 mt-[18px]">
          <h2 className="text-[clamp(18px,4vw,30px)] leading-[1.2] sm:leading-[1.3] my-3 sm:my-4 font-extrabold text-center text-white mb-4 sm:mb-6 md:mb-8">
            <span className="block mb-1 sm:mb-2">VEJA ALGUNS DEPOIMENTOS DOS</span>
            <span
              className="text-[#1F1F1F] px-2 sm:px-3 py-1 sm:py-2 rounded-md font-extrabold inline-block text-sm sm:text-base"
              style={{ background: "linear-gradient(135deg, #FFCC23, #FFD55B)" }}
            >
              NOSSOS USUÁRIOS
            </span>
          </h2>

          <div className="overflow-hidden rounded-[14px] bg-transparent p-2 sm:p-4 mb-4 sm:mb-6 h-auto py-2 sm:py-4">
            <div className="flex animate-scroll gap-2 sm:gap-3 justify-center">
              {Array.from({ length: 34 }, (_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20"
                >
                  <Image
                    src={`https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/foto-depoimentos-${i + 1}-1.png`}
                    alt={`Depoimento ${i + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {Array.from({ length: 34 }, (_, i) => (
                <div
                  key={`duplicate-${i}`}
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20"
                >
                  <Image
                    src={`https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/foto-depoimentos-${i + 1}-1.png`}
                    alt={`Depoimento ${i + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-white text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8 font-medium px-2">
            Mais de 10.000 homens já colocaram em prática o protocolo, você pode ser o próximo!
          </p>

          <div className="relative max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-0">
            <div
              ref={carouselRef}
              className="testimonials-carousel overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
              style={{ userSelect: "none" }}
            >
              <div className="testimonials-track flex transition-transform duration-300 ease-in-out">
                <div className="testimonial-slide flex-shrink-0 w-full px-1 sm:px-2">
                  <div className="bg-white rounded-[14px] p-3 sm:p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="font-bold text-[#122033] text-sm sm:text-base">Ricardo T.</div>
                      <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                    </div>
                    <p className="text-[#6B7C91] leading-relaxed text-xs sm:text-sm md:text-base">
                      "Eu estava em um ponto em que preferia nem arriscar do que falhar de novo... Mas agora só tenho a
                      agradecer, a paz mental com esse protocolo vale mais que qualquer remédio."
                    </p>
                  </div>
                </div>

                <div className="testimonial-slide flex-shrink-0 w-full px-1 sm:px-2">
                  <div className="bg-white rounded-[14px] p-3 sm:p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="font-bold text-[#122033] text-sm sm:text-base">Leonardo A.</div>
                      <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                    </div>
                    <p className="text-[#6B7C91] leading-relaxed text-xs sm:text-sm md:text-base">
                      "Finalmente, alguém está levando isso a sério. Sem enrolação, pura ciência e práticas baseadas em
                      evidências. Obrigado, pessoal!"
                    </p>
                  </div>
                </div>

                <div className="testimonial-slide flex-shrink-0 w-full px-1 sm:px-2">
                  <div className="bg-white rounded-[14px] p-3 sm:p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="font-bold text-[#122033] text-sm sm:text-base">Pedro V.</div>
                      <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                    </div>
                    <p className="text-[#6B7C91] leading-relaxed text-xs sm:text-sm md:text-base">
                      "Resolvi a ejaculação precoce com esses caras. Eles explicam tudo de forma clara e sem
                      constrangimento. Só queria ter encontrado isso antes."
                    </p>
                  </div>
                </div>

                <div className="testimonial-slide flex-shrink-0 w-full px-1 sm:px-2">
                  <div className="bg-white rounded-[14px] p-3 sm:p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="font-bold text-[#122033] text-sm sm:text-base">João C.</div>
                      <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                    </div>
                    <p className="text-[#6B7C91] leading-relaxed text-xs sm:text-sm md:text-base">
                      "Depois de queimar a largada algumas vez, achei que meus dias de ouro tinham ficado para trás...
                      Mas com esse programa consegui voltar a ativa e com um controle absurdo."
                    </p>
                  </div>
                </div>

                <div className="testimonial-slide flex-shrink-0 w-full px-1 sm:px-2">
                  <div className="bg-white rounded-[14px] p-3 sm:p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="font-bold text-[#122033] text-sm sm:text-base">Felipe N.</div>
                      <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                    </div>
                    <p className="text-[#6B7C91] leading-relaxed text-xs sm:text-sm md:text-base">
                      "Nem a 'azulzinha' me trouxe resultados iguais às técnicas e exercícios desse protocolo kkk Eu
                      realmente estou impressionado."
                    </p>
                  </div>
                </div>

                <div className="testimonial-slide flex-shrink-0 w-full px-1 sm:px-2">
                  <div className="bg-white rounded-[14px] p-3 sm:p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="font-bold text-[#122033] text-sm sm:text-base">Lucas C.</div>
                      <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                    </div>
                    <p className="text-[#6B7C91] leading-relaxed text-xs sm:text-sm md:text-base">
                      "Estou na quarta semana e já percebi várias mudanças. Estou curioso para ver o que mais vai
                      acontecer. Ótimo trabalho, continuem assim! Recomendo!"
                    </p>
                  </div>
                </div>

                <div className="testimonial-slide flex-shrink-0 w-full px-1 sm:px-2">
                  <div className="bg-white rounded-[14px] p-3 sm:p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="font-bold text-[#122033] text-sm sm:text-base">Gustavo T.</div>
                      <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                    </div>
                    <p className="text-[#6B7C91] leading-relaxed text-xs sm:text-sm md:text-base">
                      "Fantástico para a saúde masculina. Está me ajudando a alcançar meus objetivos de forma muito mais
                      prática e direta."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-6">
              {Array.from({ length: 7 }, (_, i) => (
                <button
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-110 ${
                    i === currentTestimonial ? "bg-white" : "bg-white/30 hover:bg-white/50"
                  }`}
                  onClick={() => handleDotClick(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios + Mockup */}
        <section className="grid gap-4 mt-[18px]">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-gradient-to-br from-[#FEF2F2] to-[#EBF4FF] border border-[#DC2626] rounded-[14px] p-[18px] shadow-sm">
              <h2 className="text-[clamp(22px,4vw,30px)] leading-[1.2] my-3 text-[#1E5AD6] font-extrabold text-[rgba(8,66,152,1)]">
                Transforme sua <span className="text-[#DC2626]">Vida Sexual</span>
              </h2>
              <p className="mb-4 text-[#374151]">Ao adquirir o método, você terá:</p>
              <ul className="grid gap-[10px] m-0 p-0 list-none">
                <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#DC2626] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full flex-shrink-0 mt-1 text-[rgba(8,66,152,1)] bg-[rgba(8,66,152,1)]"></span>
                  <span>
                    <strong>Técnicas Ancestrais Africanas</strong> passo a passo.
                  </span>
                </li>
                <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#1E5AD6] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full flex-shrink-0 mt-1 bg-[rgba(8,66,152,1)]"></span>
                  <span>
                    <strong>Vídeos Demonstrativos</strong> com especialistas.
                  </span>
                </li>
                <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#DC2626] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full flex-shrink-0 mt-1 bg-[rgba(8,66,152,1)]"></span>
                  <span>
                    <strong>Cronograma de 30 Dias</strong> para resultados máximos.
                  </span>
                </li>
                <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#DC2626] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full flex-shrink-0 mt-1 bg-[rgba(8,66,152,1)]"></span>
                  <span>
                    <strong>Lista de Bioativos Naturais</strong> e onde encontrar.
                  </span>
                </li>
                <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#DC2626] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full flex-shrink-0 mt-1 bg-[rgba(8,66,152,1)]"></span>
                  <span>
                    <strong>Suporte Especializado</strong> para dúvidas.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white border border-[#E6ECF3] rounded-[14px] p-[18px] shadow-sm flex items-center justify-center">
              <Image
                src="https://spcdn.shortpixel.ai/spio/ret_img,q_orig,to_webp,s_webp/institutoduramax.com/wp-content/uploads/2024/10/Mockup-Protocolo-Duramax-1024x479.webp"
                alt="Mockup do Protocolo"
                width={1024}
                height={479}
                className="w-full h-auto max-w-md lg:max-w-full"
              />
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section className="grid gap-4 mt-[18px]">
          <div className="bg-gradient-to-r from-[#EBF4FF] to-[#FEF2F2] border border-[#1E5AD6] rounded-[14px] p-[18px]">
            <h2 className="text-[clamp(22px,4vw,30px)] leading-[1.2] my-3 text-[#1E5AD6] font-extrabold text-[rgba(8,66,152,1)]">
              Resultados comprovados do método
            </h2>
            <ul className="grid gap-[10px] m-0 p-0 list-none">
              <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                <span className="w-[18px] h-[18px] rounded-full bg-[#DC2626] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full bg-[rgba(8,66,152,1)]"></span>
                <span>Aumento de até 7cm em comprimento</span>
              </li>
              <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                <span className="w-[18px] h-[18px] rounded-full bg-[#1E5AD6] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full bg-[rgba(8,66,152,1)]"></span>
                <span>Melhora significativa na circunferência</span>
              </li>
              <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                <span className="w-[18px] h-[18px] rounded-full bg-[#DC2626] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full bg-[rgba(8,66,152,1)]"></span>
                <span>Ereções mais duras e duradouras</span>
              </li>
              <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                <span className="w-[18px] h-[18px] rounded-full bg-[#1E5AD6] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full bg-[rgba(8,66,152,1)]"></span>
                <span>Aumento da autoestima e confiança</span>
              </li>
              <li className="grid grid-cols-[22px_1fr] items-start gap-[10px]">
                <span className="w-[18px] h-[18px] rounded-full bg-[#DC2626] inline-block relative after:content-[''] after:absolute after:inset-1 after:bg-white after:rounded-full bg-[rgba(8,66,152,1)]"></span>
                <span>Satisfação total com qualquer mulher</span>
              </li>
            </ul>
            <p className="text-[#1E5AD6] mt-[6px]">
              <em className="text-gray-950">Baseado em pesquisa com usuários após 30 dias de aplicação do método.</em>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="grid gap-4 mt-[18px]">
          <div className="bg-gradient-to-r from-[#0f172a] to-[#0F172A] rounded-[14px] p-4 md:p-[18px] text-white shadow-lg border border-[#DC2626]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center">
              <div className="text-center lg:text-left">
                <div className="text-[#b7c2d0] text-sm md:text-base">
                  De{" "}
                  <span className="relative text-[#ffcdcd] after:content-[''] after:absolute after:left-0 after:right-0 after:top-1/2 after:h-0.5 after:bg-[#DC2626]">
                    R$ 97
                  </span>{" "}
                  por apenas
                </div>
                <h2 className="text-white text-[clamp(28px,8vw,48px)] leading-[1.2] my-2 md:my-3 font-extrabold">
                  R$ 29,90
                </h2>
                <div className="text-[#c9d3e0] text-sm md:text-base">ou 5x de R$ 6,63</div>
              </div>
              <div className="flex items-center justify-center">
                <Link
                  href="/diagnostico"
                  className="inline-flex gap-2 items-center justify-center bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-[10px] px-6 md:px-[18px] py-4 md:py-[14px] font-extrabold shadow-[0_8px_20px_rgba(220,38,38,0.25)] transition-all duration-200 hover:-translate-y-0.5 w-full max-w-xs text-sm md:text-base"
                >
                  QUERO O PROTOCOLO!
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-[10px] mt-4 text-center">
              <div className="text-[#c9d3e0] text-xs md:text-sm">✓ Compra segura</div>
              <div className="text-[#c9d3e0] text-xs md:text-sm">✓ Privacidade protegida</div>
              <div className="text-[#c9d3e0] text-xs md:text-sm">✓ Garantia de 7 dias</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#FEF2F2] to-[#EBF4FF] border border-[#DC2626] rounded-[14px] p-[18px] text-center lg:text-left">
            <strong className="text-[#DC2626] text-black">94%</strong> dos homens que aplicaram o{" "}
            <strong className="text-[#1E5AD6] text-[rgba(8,66,152,1)]">Método Congolês</strong> relataram aumento significativo e melhora na
            autoestima sexual.
          </div>
        </section>

        {/* FAQ */}
        <section className="grid gap-4 mt-[18px] mb-[90px]">
          <h2 className="text-[clamp(22px,4vw,30px)] leading-[1.2] my-3 text-[#1E5AD6] font-extrabold text-[rgba(8,66,152,1)]">
            FAQ — Dúvidas Frequentes
          </h2>
          <details
            open
            className="bg-gradient-to-r from-[#FEF2F2] to-[#EBF4FF] border border-[#DC2626] rounded-[14px] p-[18px]"
          >
            <summary className="font-bold cursor-pointer text-[#1E5AD6] text-[rgba(8,66,152,1)]">O que é o Método Congolês?</summary>
            <p className="mt-2">
              É uma técnica ancestral africana 100% natural que combina estímulos vasculares específicos com bioativos
              de plantas para aumentar o tamanho peniano de forma segura e eficaz.
            </p>
          </details>
          <details className="bg-gradient-to-r from-[#EBF4FF] to-[#FEF2F2] border border-[#1E5AD6] rounded-[14px] p-[18px]">
            <summary className="font-bold cursor-pointer text-[#DC2626] text-[rgba(8,66,152,1)]">
              Quanto tempo leva para ver resultados?
            </summary>
            <p className="mt-2">
              A maioria dos homens relata primeiros resultados visíveis já na 2ª semana. Resultados significativos
              aparecem entre 21-30 dias de aplicação consistente.
            </p>
          </details>
          <details className="bg-gradient-to-r from-[#FEF2F2] to-[#EBF4FF] border border-[#1E5AD6] rounded-[14px] p-[18px]">
            <summary className="font-bold cursor-pointer text-[#1E5AD6] text-[rgba(8,66,152,1)]">É realmente seguro?</summary>
            <p className="mt-2">
              Sim, o método é 100% natural e não invasivo. Não utiliza medicamentos, bombas ou cirurgias. Baseado em
              técnicas milenares testadas por gerações.
            </p>
          </details>
          <details className="bg-gradient-to-r from-[#EBF4FF] to-[#FEF2F2] border border-[#1E5AD6] rounded-[14px] p-[18px]">
            <summary className="font-bold cursor-pointer text-[#DC2626] text-[rgba(8,66,152,1)]">Quanto tempo por dia preciso dedicar?</summary>
            <p className="mt-2">
              Apenas 7 minutos por dia são suficientes para aplicar as técnicas e obter resultados máximos.
            </p>
          </details>
          <details className="bg-gradient-to-r from-[#FEF2F2] to-[#EBF4FF] border border-[#1E5AD6] rounded-[14px] p-[18px]">
            <summary className="font-bold cursor-pointer text-[#1E5AD6] text-[rgba(8,66,152,1)]">Funciona para qualquer idade?</summary>
            <p className="mt-2">
              O método é eficaz para homens adultos de qualquer idade, desde que sigam corretamente as instruções e
              mantenham a consistência na aplicação.
            </p>
          </details>
        </section>
      </main>

      {/* CTA Sticky */}
      <div className="fixed left-0 right-0 bottom-0 z-50 bg-gradient-to-r from-[#1E5AD6] to-[#0F172A] text-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-[#DC2626]">
        
      </div>

      {/* Footer */}
      <footer className="max-w-[1120px] mx-auto px-4 md:px-6 py-8 md:py-[26px] pb-24 md:pb-20 bg-gradient-to-br from-slate-50 to-blue-50 border-t border-slate-200">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-xl md:text-2xl font-bold text-slate-800">Método Congolês</div>
            <div className="w-16 h-1 bg-gradient-to-r from-[#DC2626] to-[#1E5AD6] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-3">
            <div className="text-sm md:text-base text-slate-600 font-medium">
              Copyright © 2025 – Todos os direitos reservados
            </div>
            <div className="text-sm text-slate-500">contato@metodocongoles.com</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center text-sm font-medium">
            <a
              href="#"
              className="text-slate-700 hover:text-[#DC2626] transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-slate-700 hover:text-[#1E5AD6] transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
            >
              Termos de Uso
            </a>
            <a
              href="#"
              className="text-slate-700 hover:text-[#DC2626] transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
            >
              Contato
            </a>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl p-4 max-w-3xl mx-auto">
            <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-700">Aviso Legal:</span> Este produto não substitui orientação
              médica profissional. Consulte sempre um especialista para questões de saúde. Os resultados podem variar de
              pessoa para pessoa. Método destinado apenas para homens adultos.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
