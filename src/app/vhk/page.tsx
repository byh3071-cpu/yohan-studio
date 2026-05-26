import type { Metadata } from "next"
import { VhkHero } from "@/components/vhk/VhkHero"
import { VhkPain } from "@/components/vhk/VhkPain"
import { VhkFeatures } from "@/components/vhk/VhkFeatures"
import { VhkSpec } from "@/components/vhk/VhkSpec"
import { VhkRoadmap } from "@/components/vhk/VhkRoadmap"
import { VhkCta } from "@/components/vhk/VhkCta"
import { getSiteUrl } from "@/lib/siteUrl"

const BASE_URL = getSiteUrl()

export const metadata: Metadata = {
  title: "VHK — Vibe Harness Kit",
  description:
    "AI 코딩 컨텍스트, 어디서든. .vhk/ 스펙 하나로 Cursor · Claude · Copilot까지 따라온다. npm i -g @byh3071/vhk",
  alternates: { canonical: "/vhk" },
  openGraph: {
    title: "VHK — Vibe Harness Kit",
    description: "Your AI Coding Context, Everywhere.",
    url: "/vhk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VHK — Vibe Harness Kit",
    description: "Your AI Coding Context, Everywhere.",
  },
}

const SOFTWARE_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/vhk#software`,
  name: "VHK — Vibe Harness Kit",
  alternateName: "Vibe Harness Kit",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  description:
    "AI 코딩 컨텍스트를 IDE 간 이식 가능하게 만드는 CLI 도구. .vhk/ 스펙으로 Cursor · Claude · Copilot의 규칙을 한 곳에서 관리.",
  url: `${BASE_URL}/vhk`,
  downloadUrl: "https://www.npmjs.com/package/@byh3071/vhk",
  author: { "@id": `${BASE_URL}/#person` },
  publisher: { "@id": `${BASE_URL}/#org` },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export default function VhkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_LD) }}
      />
      <VhkHero />
      <VhkPain />
      <VhkFeatures />
      <VhkSpec />
      <VhkRoadmap />
      <VhkCta />
    </>
  )
}
