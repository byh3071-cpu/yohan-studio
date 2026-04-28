import type { CSSProperties } from "react"
import { aboutTimeline } from "@/data/aboutTimeline"

const section: CSSProperties = {
  background: "var(--surface)",
  padding: "96px 24px",
  borderBottom: "1.5px solid var(--ink)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

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
  fontSize: "clamp(36px, 5vw, 56px)",
  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  marginBottom: "48px",
}

const accent: CSSProperties = { color: "var(--accent)" }

const tl: CSSProperties = {
  position: "relative",
  paddingLeft: "36px",
  maxWidth: "720px",
}

const line: CSSProperties = {
  position: "absolute",
  left: "8px",
  top: "10px",
  bottom: "10px",
  width: "1.5px",
  background: "var(--ink)",
}

const it: CSSProperties = {
  position: "relative",
  marginBottom: "20px",
  background: "var(--bg)",
  border: "1.5px solid var(--ink)",
  boxShadow: "4px 4px 0 var(--ink)",
  padding: "16px 20px",
}

function dot(active: boolean): CSSProperties {
  return {
    position: "absolute",
    left: "-36px",
    top: "20px",
    width: "18px",
    height: "18px",
    background: active ? "var(--accent)" : "var(--bg)",
    border: "1.5px solid var(--ink)",
  }
}

const dt: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  color: "var(--accent)",
  letterSpacing: "0.05em",
  marginBottom: "4px",
}

const ttl: CSSProperties = {
  fontSize: "17px",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
  marginBottom: "4px",
}

const dsc: CSSProperties = {
  fontSize: "13px",
  color: "var(--ink-2)",
  lineHeight: 1.55,
}

export function About() {
  return (
    <section id="about" style={section}>
      <div style={inner}>
        <div style={eyebrow}>{"// 05 — about"}</div>
        <h2 style={title}>
          바리스타에서
          <br />
          바이브<span style={accent}>코더</span>로.
        </h2>
        <div style={tl}>
          <div style={line} />
          {aboutTimeline.map((i) => (
            <div key={`${i.date}-${i.title}`} style={it}>
              <span style={dot(i.active)} />
              <div style={dt}>{i.date}</div>
              <div style={ttl}>{i.title}</div>
              <div style={dsc}>{i.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
