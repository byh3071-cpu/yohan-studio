import type { CSSProperties } from "react"
import Link from "next/link"

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
  fontSize: "clamp(32px, 5vw, 52px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
}

const accent: CSSProperties = { color: "var(--accent)" }

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginBottom: "32px",
}

const card: CSSProperties = {
  background: "var(--surface)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "24px 26px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}

const num: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "32px",
  fontWeight: 800,
  lineHeight: 1,
  color: "var(--accent)",
}

const heading: CSSProperties = {
  fontSize: "18px",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
}

const text: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
}

const ctaRow: CSSProperties = {
  display: "flex",
  paddingTop: "24px",
  borderTop: "var(--border-w) solid var(--line)",
}

const cta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: 700,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  textDecoration: "none",
}

const symptoms = [
  {
    heading: "AI는 쓴다, 시스템이 없다",
    text: "Cursor·Claude·GPT를 매일 쓰지만 결과물이 한 곳에 모이지 않는다.",
  },
  {
    heading: "결정을 매주 다시 한다",
    text: "할 일·자료·회고가 도구마다 흩어져 같은 결정을 매주 재발견한다.",
  },
  {
    heading: "공개할 게 없다",
    text: "혼자 만든 것은 많은데 보여줄 거점이 없어 신뢰가 쌓이지 않는다.",
  },
]

export function ProblemSection() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// 02 — 문제"}</div>
          <h2 style={title}>
            AI는 쓰는데 <span style={accent}>시스템</span>이 없는 사람들.
          </h2>
        </div>
        <div style={grid}>
          {symptoms.map((s, i) => (
            <article key={s.heading} style={card}>
              <span style={num}>0{i + 1}</span>
              <h3 style={heading}>{s.heading}</h3>
              <p style={text}>{s.text}</p>
            </article>
          ))}
        </div>
        <div style={ctaRow}>
          <Link href="/diagnosis" style={cta}>
            내 운영체계 진단하기 →
          </Link>
        </div>
      </div>
    </section>
  )
}
