import type { Metadata } from "next"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Faq } from "@/components/sections/Faq"
import { Featured } from "@/components/sections/Featured"
import { Hero } from "@/components/sections/Hero"
import { Philosophy } from "@/components/sections/Philosophy"
import { ProblemSection } from "@/components/sections/ProblemSection"
import { ScanIntro } from "@/components/sections/ScanIntro"
import { ServicesPreview } from "@/components/sections/ServicesPreview"
import { ShowroomPreview } from "@/components/sections/ShowroomPreview"

// Home-specific metadata. Overrides the layout default with a keyword-rich
// description so the SERP snippet covers the core intents (바이브코딩 / 1인 기업 OS
// / AI 자동화) instead of the short brand fallback.
const HOME_DESCRIPTION =
  "AI 시대 1인 기업가를 위한 운영체계(OS). 바이브코딩으로 콘텐츠·제품·자동화를 한 사람이 직접 설계하고 운영하는 요한 스튜디오. 1인 기업 자가진단, 쇼룸, 서비스, 블로그를 한곳에서."

export const metadata: Metadata = {
  title: {
    absolute: "요한 스튜디오 — AI 1인 기업 운영체계 · 바이브코딩 플랫폼",
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "요한 스튜디오 — AI 1인 기업 운영체계",
    description: HOME_DESCRIPTION,
    url: "/",
    type: "website",
  },
  twitter: {
    title: "요한 스튜디오 — AI 1인 기업 운영체계",
    description: HOME_DESCRIPTION,
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ProblemSection />
      <ShowroomPreview />
      <Featured />
      <ScanIntro />
      <ServicesPreview />
      <About />
      <Faq />
      <Contact />
    </>
  )
}
