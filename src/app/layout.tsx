import type { Metadata } from "next"
import type { ReactNode } from "react"
import { JetBrains_Mono } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yohan.studio"

const GSC_GOOGLE_VERIFICATION =
  process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() ||
  "bq-eC8RKrpFaxv600G7KAk16rcAvXtKdD872ANYNeE4"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "요한 스튜디오 | Yohan Studio",
    template: "%s | 요한 스튜디오",
  },
  description: "백요한 — 바이브코더 · AI 기반 1인 기업",
  openGraph: {
    siteName: "요한 스튜디오",
    locale: "ko_KR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  verification: { google: GSC_GOOGLE_VERIFICATION },
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
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  )
}
