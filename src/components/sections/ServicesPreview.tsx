import type { CSSProperties } from "react"
import Link from "next/link"
import { services } from "@/data/services"

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

const accent: CSSProperties = { color: "var(--accent-text)" }

const allLink: CSSProperties = {
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
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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

const eyebrowSmall: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--accent-text)",
}

const duration: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 500,
  color: "var(--muted)",
}

const name: CSSProperties = {
  fontSize: "22px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  color: "var(--ink)",
}

const tagline: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
}

const price: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "18px",
  fontWeight: 800,
  color: "var(--ink)",
  paddingTop: "10px",
  borderTop: "1px dashed var(--muted-2)",
}

export function ServicesPreview() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div>
            <div style={eyebrow}>{"// 05 — 서비스"}</div>
            <h2 style={title}>
              <span style={accent}>같이</span> 짓는 세 가지 깊이.
            </h2>
          </div>
          <Link href="/services" style={allLink}>
            전체 보기 →
          </Link>
        </div>
        <div style={grid}>
          {services.map((s) => (
            <Link key={s.slug} href={`/services#${s.slug}`} style={{ textDecoration: "none" }}>
              <article style={card}>
                <div style={cardTop}>
                  <span style={eyebrowSmall}>{s.featured ? "★ POPULAR" : "SERVICE"}</span>
                  <span style={duration}>{s.durationDays}</span>
                </div>
                <h3 style={name}>{s.name}</h3>
                <p style={tagline}>{s.tagline}</p>
                <p style={price}>{s.priceRange}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
