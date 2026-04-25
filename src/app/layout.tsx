import type { Metadata } from "next"
import type { ReactNode } from "react"
import { JetBrains_Mono } from "next/font/google"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "요한 스튜디오 | Yohan Studio",
  description: "백요한 — 바이브코더 · AI 기반 1인 기업",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko" className={jetbrainsMono.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
