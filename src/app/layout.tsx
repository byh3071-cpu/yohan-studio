import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google"
import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import "./globals.css"

// Precedence: ?theme= URL param  →  localStorage  →  system preference  →  light
// Matches design/v2/theme-init.js.
const THEME_INIT_SCRIPT = `
try {
  var params = new URLSearchParams(location.search);
  var fromUrl = params.get('theme');
  var fromUrlValid = (fromUrl === 'dark' || fromUrl === 'light') ? fromUrl : null;
  var stored = localStorage.getItem('yohan-theme');
  var storedValid = (stored === 'dark' || stored === 'light') ? stored : null;
  var fromSys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var theme = fromUrlValid || storedValid || fromSys;
  document.documentElement.setAttribute('data-theme', theme);
  if (fromUrlValid) localStorage.setItem('yohan-theme', fromUrlValid);
} catch (e) {}
`

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

// Editorial serif accent — italic only, used for headline word emphasis.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  style: ["italic"],
  weight: ["400", "600"],
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yohan.studio"

const GSC_GOOGLE_VERIFICATION =
  process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim() ||
  "3OUsp9VZJ9Hdp-HFKhDtaipWOlVK5MtOLZOT-Xjzmno"

// Site-wide JSON-LD: Person + Organization + WebSite under a single @graph so
// answer engines (ChatGPT / Perplexity / Gemini) can resolve the entity behind the brand.
const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "백요한",
      alternateName: "Yohan Baek",
      jobTitle: "바이브코더 · 1인 기업가",
      description:
        "바리스타 출신 바이브코더. AI 코드 에이전트와 자동화 워크플로로 콘텐츠와 제품을 만드는 1인 기업가.",
      url: BASE_URL,
      email: "byh3071@gmail.com",
      worksFor: { "@id": `${BASE_URL}/#org` },
      knowsAbout: [
        "바이브코딩",
        "AI 코드 에이전트",
        "Next.js",
        "Notion",
        "자동화 워크플로",
        "1인 기업",
      ],
      sameAs: ["https://github.com/byh3071-cpu"],
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#org`,
      name: "Yohan Studio",
      alternateName: "요한 스튜디오",
      url: BASE_URL,
      description:
        "백요한의 1인 기업. 바이브코딩 · AI 자동화 · 콘텐츠 · 제품을 한 사람이 직접 설계하고 운영한다.",
      founder: { "@id": `${BASE_URL}/#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Yohan Studio",
      inLanguage: "ko-KR",
      publisher: { "@id": `${BASE_URL}/#org` },
    },
  ],
}

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
    <html
      lang="ko"
      className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD) }}
        />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  )
}
