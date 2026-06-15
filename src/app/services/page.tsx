import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { services } from "@/data/services"
import { PricingSection } from "@/components/services/PricingSection"
import { PageFaq, type FaqItem } from "@/components/seo/PageFaq"
import { getSiteUrl } from "@/lib/siteUrl"

export const metadata: Metadata = {
  title: "Services — Yohan Studio",
  description:
    "AI 시대 1인 기업 운영체계를 함께 설계한다. A'Im Scan Report, A'Im OS Template, A'Im OS Build.",
}

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const head: CSSProperties = {
  paddingBottom: "32px",
  marginBottom: "40px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "12px",
}

const title: CSSProperties = {
  fontSize: "clamp(40px, 6vw, 64px)",
  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  marginBottom: "16px",
}

const accentMark: CSSProperties = { color: "var(--accent)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "640px",
}

const faqs: FaqItem[] = [
  {
    q: "어떤 서비스부터 시작하면 좋아요?",
    a: "A'Im Scan 자가진단을 먼저 풀고, 결과 해석이 막히면 A'Im Scan Report로 30일 처방을 받는 흐름을 권한다. 검증된 구조가 바로 필요하면 A'Im OS Template, 같이 설계할 파트너가 필요하면 A'Im OS Build로 올라간다. 리포트 → 템플릿 → 빌드 순으로 깊이가 깊어진다.",
  },
  {
    q: "가격은 어떻게 되나요?",
    a: "A'Im Scan Report는 49,000~99,000원, A'Im OS Template는 19,000~49,000원, A'Im OS Build는 290,000~590,000원이다. 작업 범위와 일정에 따라 구간 안에서 책정된다.",
  },
  {
    q: "혼자 운영하는데 의뢰가 가능한가요?",
    a: "1인 운영이라 동시에 받는 빌드 프로젝트 수가 제한적이다. byh3071@gmail.com 으로 목표·예산·일정을 보내면 가능 여부와 일정을 회신한다. 리포트·템플릿은 상시 신청할 수 있다.",
  },
  {
    q: "작업 기간은 얼마나 걸리나요?",
    a: "A'Im Scan Report는 3~5영업일, A'Im OS Template는 즉시 제공, A'Im OS Build는 킥오프부터 약 4주(주간 1:1 4회)로 진행된다.",
  },
]

const SITE_ORIGIN = getSiteUrl()

function buildServiceJsonLd(contactUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      "@id": `${SITE_ORIGIN}/services#${s.slug}`,
      name: s.name,
      description: s.tagline,
      provider: {
        "@type": "Person",
        name: "요한",
        url: SITE_ORIGIN,
      },
      areaServed: "KR",
      url: `${SITE_ORIGIN}/services#${s.slug}`,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "KRW",
        lowPrice: s.priceMin,
        highPrice: s.priceMax,
        availability: "https://schema.org/InStock",
        url: contactUrl || `${SITE_ORIGIN}/services`,
      },
    })),
  }
}

export default function ServicesPage() {
  const contactUrl = process.env.NEXT_PUBLIC_CONTACT_FORM_URL ?? ""
  const ld = buildServiceJsonLd(contactUrl)

  return (
    <>
      <section style={section}>
        <div style={inner}>
          <div style={head}>
            <div style={eyebrow}>{"// SERVICES — 함께 만든다"}</div>
            <h1 style={title}>
              서비스<span style={accentMark}>.</span>
            </h1>
            <p style={lead}>
              AI 시대 1인 기업 운영체계의 빈 곳을 진단하고, 템플릿을 건네고, 같이 짓는다.
              리포트 → 템플릿 → 빌드, 세 가지 깊이로 선택할 수 있다.
            </p>
          </div>
          <PricingSection contactUrl={contactUrl} />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </section>
      <PageFaq
        eyebrow="// FAQ — 서비스 자주 묻는 질문"
        heading="서비스, 물어볼 만한 것들."
        faqs={faqs}
      />
    </>
  )
}
