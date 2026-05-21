import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { DiagnosisForm } from "@/components/diagnosis/DiagnosisForm"

export const metadata: Metadata = {
  title: "AI'm Scan — 1인 기업 자가진단 · Yohan Studio",
  description:
    "7영역 × 3문항 = 21문항으로 AI 시대 1인 기업의 운영 체계를 진단한다. 방향·전략·구조·수익화·프롬프트·디자인·의사결정.",
}

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "880px", margin: "0 auto" }

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
  fontSize: "clamp(36px, 6vw, 56px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  marginBottom: "16px",
}

const accentMark: CSSProperties = { color: "var(--accent)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "620px",
}

export default function DiagnosisPage() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// AI'M SCAN v0.1 — 21문항"}</div>
          <h1 style={title}>
            1인 기업 자가진단<span style={accentMark}>.</span>
          </h1>
          <p style={lead}>
            7개 영역·21문항으로 운영 체계의 빈 곳을 찾는다. 결과는 이 페이지에만 표시되며 저장되지 않는다.
          </p>
        </div>
        <DiagnosisForm />
      </div>
    </section>
  )
}
