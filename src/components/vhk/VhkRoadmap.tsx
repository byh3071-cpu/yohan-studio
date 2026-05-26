import type { CSSProperties } from "react"
import { vhkRoadmap } from "@/data/vhk"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const head: CSSProperties = {
  paddingBottom: "32px",
  marginBottom: "48px",
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
  marginBottom: "12px",
}

const accent: CSSProperties = { color: "var(--accent)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "640px",
}

const timeline: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0",
  position: "relative",
}

const row: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(140px, 180px) 1fr",
  gap: "32px",
  padding: "32px 0",
  borderBottom: "1px dashed var(--muted-2)",
  alignItems: "start",
}

const phaseLabel: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
}

const dot: CSSProperties = {
  width: "14px",
  height: "14px",
  flexShrink: 0,
}

const phaseText: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ink)",
}

const state: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginTop: "4px",
}

const stepTitle: CSSProperties = {
  fontSize: "clamp(22px, 3vw, 28px)",
  fontWeight: 800,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  marginBottom: "10px",
}

const stepDesc: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "560px",
}

const punchline: CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
  fontSize: "20px",
  lineHeight: 1.5,
  color: "var(--ink)",
  marginTop: "48px",
  maxWidth: "640px",
}

const punchAccent: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontStyle: "normal",
  fontWeight: 700,
  color: "var(--accent)",
}

export function VhkRoadmap() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// 05 — ROADMAP"}</div>
          <h2 style={title}>
            VHK는 <span style={accent}>진화한다</span>.
          </h2>
          <p style={lead}>
            Layer 1은 v1.0 현재. Layer 2~4는{" "}
            <span style={{ fontWeight: 700, color: "var(--ink)" }}>미래 비전</span>
            {" "}— 인텔리전스, 플랫폼, 프로토콜 단계로 확장한다.
          </p>
        </div>

        <div style={timeline}>
          {vhkRoadmap.map((r, i) => (
            <div
              key={r.phase}
              style={{
                ...row,
                ...(i === vhkRoadmap.length - 1
                  ? { borderBottom: "var(--border-w) solid var(--line)" }
                  : {}),
              }}
            >
              <div>
                <div style={phaseLabel}>
                  <span style={{ ...dot, background: r.color }} />
                  <span style={phaseText}>{r.phase}</span>
                </div>
                <div style={state}>{r.state}</div>
              </div>
              <div>
                <h3 style={stepTitle}>{r.title}</h3>
                <p style={stepDesc}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={punchline}>
          코드에 Git이 있듯,
          <br />
          <span style={punchAccent}>.vhk가 AI 코딩 컨텍스트의 업계 표준이 된다.</span>
        </p>
      </div>
    </section>
  )
}
