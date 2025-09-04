import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Protocolo Duramax — Resolva sua Ejaculação Precoce em 21 Dias",
  description:
    "Protocolo natural cientificamente comprovado para resolver ejaculação precoce. Técnicas exclusivas, exercícios personalizados e controle emocional.",
  viewport: "width=device-width, initial-scale=1",
  generator: "v0.app",
  other: {
    "theme-color": "#000000",
    "msapplication-navbutton-color": "#000000",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
