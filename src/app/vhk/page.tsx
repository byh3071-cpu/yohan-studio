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
    "바이브코딩 CLI — AI 코딩 컨텍스트 하네스. RULES.md · cursorrules · vhk gate로 아이디어 검증 후 init. npm i -g @byh3071/vhk",
  alternates: { canonical: "/vhk" },
  openGraph: {
    title: "VHK — Vibe Harness Kit",
    description:
      "바이브코딩 CLI — IDE 위 운영·컨텍스트 레이어. Cursor · Claude · Codex.",
    url: "/vhk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VHK — Vibe Harness Kit",
    description:
      "바이브코딩 CLI — IDE 위 운영·컨텍스트 레이어. Cursor · Claude · Codex.",
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
    "바이브코딩 풀사이클 CLI. RULES.md 기반으로 Cursor · Claude · Codex 규칙을 동기화하고 .vhk/에 맥락을 저장한다.",
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
