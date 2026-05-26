import type { CSSProperties } from "react"
import { featuredProducts } from "@/data/featured"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
  scrollMarginTop: "72px",
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

const status: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--muted)",
  border: "var(--border-w) solid var(--line)",
  background: "var(--surface)",
  padding: "10px 16px",
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
  display: "flex",
  flexDirection: "column",
}

const thumb: CSSProperties = {
  height: "120px",
  background: "var(--surface-2)",
  borderBottom: "var(--border-w) solid var(--line)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  color: "var(--muted)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  position: "relative",
}

const thumbNum: CSSProperties = {
  position: "absolute",
  top: "10px",
  left: "12px",
  fontSize: "11px",
  fontWeight: 400,
  fontFamily: "var(--font-en)",
  color: "var(--muted)",
}

const body: CSSProperties = { padding: "20px 22px 22px" }

const name: CSSProperties = {
  fontSize: "18px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  lineHeight: 1.2,
  marginBottom: "6px",
}

const desc: CSSProperties = {
  fontSize: "13px",
  color: "var(--ink-2)",
  marginBottom: "14px",
  lineHeight: 1.6,
}

const row: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "14px",
  borderTop: "1px solid var(--line)",
}

const price: CSSProperties = {
  fontSize: "18px",
  fontWeight: 800,
  color: "var(--ink)",
  letterSpacing: "-0.02em",
}

const badge: CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  fontFamily: "var(--font-mono)",
  padding: "6px 12px",
  background: "var(--surface-2)",
  color: "var(--muted)",
  border: "1px solid var(--line)",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}

export function StorePreview() {
  return (
    <section id="store" style={section} aria-labelledby="store-heading">
      <div style={inner}>
        <div style={head}>
          <div>
            <div style={eyebrow}>{"// 06 — 디지털 상품"}</div>
            <h2 id="store-heading" style={title}>
              스토어<span style={accentMark}>.</span>
            </h2>
          </div>
          <span style={status} aria-label="스토어는 Phase 3 오픈 예정">
            Phase 3 오픈 예정
          </span>
        </div>
        <div style={grid}>
          {featuredProducts.map((p, i) => (
            <article key={p.name} style={card}>
              <div style={thumb}>
                <span style={thumbNum}>SKU {String(i + 1).padStart(2, "0")}</span>
                IMAGE / PLACEHOLDER
              </div>
              <div style={body}>
                <h3 style={name}>{p.name}</h3>
                <p style={desc}>{p.desc}</p>
                <div style={row}>
                  <span style={price}>{p.price}</span>
                  <span style={badge} aria-label="판매 준비 중">준비 중</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
