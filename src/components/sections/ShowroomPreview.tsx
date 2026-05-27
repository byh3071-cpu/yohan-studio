import type { CSSProperties } from "react"
import Link from "next/link"
import { showroomProjects } from "@/data/showroomProjects"

const section: CSSProperties = {
  background: "var(--surface)",
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
  fontSize: "clamp(32px, 5vw, 52px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
}

const accentMark: CSSProperties = { color: "var(--accent)" }

const link: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ink)",
  border: "var(--border-w) solid var(--line)",
  background: "var(--bg)",
  padding: "10px 16px",
  boxShadow: "var(--shadow-sm)",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
}

const card: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "22px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}

const cardTop: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  paddingBottom: "10px",
  borderBottom: "1px solid var(--line)",
}

const cat: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--accent)",
}

const year: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--muted)",
}

const ttl: CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  lineHeight: 1.15,
}

const summary: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
}

export function ShowroomPreview() {
  const featured = showroomProjects.filter((p) => p.featured)
  const others = showroomProjects.filter((p) => !p.featured)
  const preview = [...featured, ...others].slice(0, 6)

  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div>
            <div style={eyebrow}>{"// 03 — 만든 것들"}</div>
            <h2 style={title}>
              쇼룸 미리보기<span style={accentMark}>.</span>
            </h2>
          </div>
          <Link href="/showroom" style={link}>
            전체 보기 →
          </Link>
        </div>
        <div style={grid}>
          {preview.map((p) => (
            <article key={p.slug} style={card}>
              <div style={cardTop}>
                <span style={cat}>{p.category}</span>
                <span style={year}>{p.year}</span>
              </div>
              <h3 style={ttl}>{p.title}</h3>
              <p style={summary}>{p.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
