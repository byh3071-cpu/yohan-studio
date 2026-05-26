import type { CSSProperties } from "react"
import { vhkPains } from "@/data/vhk"

const section: CSSProperties = {
  background: "var(--surface)",
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
  fontSize: "clamp(28px, 4.5vw, 48px)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
}

const accent: CSSProperties = { color: "var(--accent)" }

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
}

const card: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "24px 26px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}

const num: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "28px",
  fontWeight: 800,
  lineHeight: 1,
  color: "var(--accent)",
}

const heading: CSSProperties = {
  fontSize: "17px",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
}

const text: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
}

const punchline: CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
  fontSize: "20px",
  lineHeight: 1.5,
  color: "var(--ink)",
  paddingTop: "32px",
  borderTop: "var(--border-w) solid var(--line)",
  maxWidth: "640px",
}

const punchAccent: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontStyle: "normal",
  fontWeight: 700,
  color: "var(--accent)",
}

export function VhkPain() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// 02 — PAIN"}</div>
          <h2 style={title}>
            AI IDE를 바꿀 때마다,
            <br />
            이런 경험 <span style={accent}>없나요?</span>
          </h2>
        </div>
        <div style={grid}>
          {vhkPains.map((p) => (
            <article key={p.heading} style={card}>
              <span style={num}>{p.num}</span>
              <h3 style={heading}>{p.heading}</h3>
              <p style={text}>{p.text}</p>
            </article>
          ))}
        </div>
        <p style={punchline}>
          도구는 바뀌어도, 프로젝트의 맥락은 바뀌지 않는다.
          <br />
          <span style={punchAccent}>VHK가 그 맥락을 지켜준다.</span>
        </p>
      </div>
    </section>
  )
}
