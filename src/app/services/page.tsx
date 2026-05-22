import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { services } from "@/data/services"
import { PricingSection } from "@/components/services/PricingSection"
import { getSiteUrl } from "@/lib/siteUrl"

export const metadata: Metadata = {
  title: "Services — Yohan Studio",
  description:
    "AI 시대 1인 기업 운영체계를 함께 설계한다. AI'm Scan Report, AI'm OS Template, AI'm OS Build.",
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

const accentMark: CSSProperties = { color: "var(--accent-text)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "640px",
}

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
        name: "백요한",
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
  )
}
