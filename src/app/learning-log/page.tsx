import type { CSSProperties } from "react"
import type { Metadata } from "next"

import { LearningLogCard } from "@/components/learning-log/LearningLogCard"
import { getLearningLogIndex } from "@/lib/notion"
import { getSiteUrl } from "@/lib/siteUrl"

const PAGE_PATH = "/learning-log"
const PAGE_TITLE = "러닝 로그 — Yohan Studio"
const PAGE_DESC =
  "특강·강연에서 배운 것의 현장 기록. 노션 세컨드브레인에서 쓰고, 요한 스튜디오에서 바로 읽는 러닝 로그."

export const revalidate = 3600

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

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--ink-2)",
  maxWidth: "640px",
  marginBottom: "48px",
}

const list: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "760px",
}

const empty: CSSProperties = {
  padding: "48px 26px",
  border: "var(--border-w) solid var(--line)",
  background: "var(--surface)",
  fontFamily: "var(--font-mono)",
  fontSize: "14px",
  color: "var(--muted)",
  textAlign: "center",
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
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function LearningLogPage() {
  const items = await getLearningLogIndex()
  const sorted = [...items].sort((a, b) => b.lastEdited.localeCompare(a.lastEdited))

  return (
    <section style={section}>
      <CollectionJsonLd />
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// LEARNING LOG — 배움 기록"}</div>
          <h1 style={title}>
            러닝 로그<span style={accentMark}>.</span>
          </h1>
        </div>
        <p style={lead}>
          특강·강연에서 배운 것을 정리한 현장 기록. 노션 세컨드브레인에서 쓰고,
          여기서 바로 읽는다.
        </p>
        {sorted.length === 0 ? (
          <div style={empty}>아직 공개된 러닝 로그가 없습니다.</div>
        ) : (
          <div style={list}>
            {sorted.map((item) => (
              <LearningLogCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
