import type { CSSProperties } from "react"

const section: CSSProperties = {
  background: "var(--surface)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "20px",
}

const quote: CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
  fontSize: "clamp(28px, 4.5vw, 48px)",
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  marginBottom: "48px",
  maxWidth: "920px",
}

const accent: CSSProperties = { color: "var(--accent)" }

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "24px",
  marginTop: "32px",
  paddingTop: "32px",
  borderTop: "1px solid var(--line)",
}

const card: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px 22px",
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
}

const num: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "var(--accent)",
}

const title: CSSProperties = {
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

const principles = [
  {
    title: "시스템 우선",
    text: "도구가 아니라 결정 루프가 시스템이다. 입력 양식을 좁히면 회고가 쉬워진다.",
  },
  {
    title: "AI는 필터",
    text: "AI는 콘텐츠 생성보다 결정·필터에 쓸 때 일상 효과가 크다.",
  },
  {
    title: "공개된 빌드로그",
    text: "만들면서 쓰고, 쓰면서 팔린다. 빌드로그 자체가 자산이다.",
  },
]

export function Philosophy() {
  return (
    <section id="philosophy" style={section}>
      <div style={inner}>
        <div style={eyebrow}>{"// 01 — 철학"}</div>
        <p style={quote}>
          좋은 시스템은 나를 <span style={accent}>복제</span>한다.
          <br />
          좋은 AI는 나를 <span style={accent}>확장</span>한다.
        </p>
        <div style={grid}>
          {principles.map((p, i) => (
            <div key={p.title} style={card}>
              <span style={num}>0{i + 1}</span>
              <h3 style={title}>{p.title}</h3>
              <p style={text}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
