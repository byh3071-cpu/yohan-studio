import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { OpenSourceGrid } from "@/components/opensource/OpenSourceGrid"
import { opensourceItems } from "@/data/opensourceItems"
import { getSiteUrl } from "@/lib/siteUrl"

const PAGE_PATH = "/open-source"
const PAGE_TITLE = "Open Source — Yohan Studio"
const PAGE_DESC =
  "요한 스튜디오가 공개한 오픈소스·무료 리소스 모음. 노션 위젯 10종, VHK CLI, 노션 미니 템플릿 — 모두 무료로 사용 가능."

export function generateMetadata(): Metadata {
  const base = getSiteUrl()
  const url = `${base}${PAGE_PATH}`
  return {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: PAGE_TITLE,
      description: PAGE_DESC,
      siteName: "Yohan Studio",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: PAGE_TITLE,
      description: PAGE_DESC,
    },
  }
}

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const head: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "end",
  gap: "20px",
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
}

const accentMark: CSSProperties = { color: "var(--accent)" }

const count: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--ink)",
  border: "1.5px solid var(--line)",
  padding: "8px 14px",
  background: "var(--bg)",
  letterSpacing: "0.04em",
}

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--ink-2)",
  maxWidth: "640px",
  marginBottom: "48px",
}

function CollectionJsonLd() {
  const base = getSiteUrl()
  const url = `${base}${PAGE_PATH}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESC,
    url,
    inLanguage: "ko-KR",
    isPartOf: { "@id": `${base}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opensourceItems.length,
      itemListElement: opensourceItems.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "CreativeWork",
          name: item.title,
          description: item.summary,
          url: item.github ?? item.npm ?? item.demo ?? item.download ?? url,
          keywords: item.keywords,
          dateCreated: item.dateCreated,
          ...(item.github ? { codeRepository: item.github } : {}),
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function OpenSourcePage() {
  return (
    <section style={section}>
      <CollectionJsonLd />
      <div style={inner}>
        <div style={head}>
          <div>
            <div style={eyebrow}>{"// OPEN SOURCE — 공개한 것들"}</div>
            <h1 style={title}>
              오픈소스<span style={accentMark}>.</span>
            </h1>
          </div>
          <div style={count}>{opensourceItems.length} ITEMS</div>
        </div>
        <p style={lead}>
          요한 스튜디오가 공개한 무료·오픈소스 리소스. 노션 위젯·CLI·템플릿 —
          누구나 복제·포크해서 본인 워크플로우에 맞게 쓸 수 있다.
        </p>
        <OpenSourceGrid />
      </div>
    </section>
  )
}
