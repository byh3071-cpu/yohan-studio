import type { CSSProperties } from "react"
import type { PortfolioProject } from "@/data/portfolioProjects"
import { portfolioProjects } from "@/data/portfolioProjects"

function PortfolioCard({
  idx,
  title,
  desc,
  tags,
  year,
}: PortfolioProject & { idx: number }) {
  const card: CSSProperties = {
    background: "var(--bg)",
    border: "var(--border-w) solid var(--ink)",
    boxShadow: "var(--shadow)",
    padding: "20px 22px 22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: "220px",
  }
  const top: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--ink)",
  }
  const num: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--muted)",
    letterSpacing: "0.05em",
  }
  const yr: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--accent)",
    letterSpacing: "0.05em",
  }
  const titleS: CSSProperties = {
    fontSize: "22px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--ink)",
    lineHeight: 1.15,
    marginTop: "6px",
  }
  const descS: CSSProperties = {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "var(--ink-2)",
    flex: 1,
  }
  const tagsRow: CSSProperties = {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    marginTop: "8px",
  }
  const tag: CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    padding: "3px 8px",
    border: "1px solid var(--ink)",
    color: "var(--ink)",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  }

  return (
    <article style={card}>
      <div style={top}>
        <span style={num}>№ {String(idx).padStart(2, "0")}</span>
        <span style={yr}>{year}</span>
      </div>
      <h3 style={titleS}>{title}</h3>
      <p style={descS}>{desc}</p>
      <div style={tagsRow}>
        {tags.map((t) => (
          <span key={t} style={tag}>
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

export function Portfolio() {
  const section: CSSProperties = {
    background: "var(--surface)",
    padding: "96px 24px",
    borderBottom: "var(--border-w) solid var(--ink)",
  }
  const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }
  const head: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "end",
    gap: "20px",
    paddingBottom: "32px",
    marginBottom: "40px",
    borderBottom: "var(--border-w) solid var(--ink)",
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
    fontSize: "clamp(36px, 5vw, 56px)",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    color: "var(--ink)",
  }
  const accentMark: CSSProperties = { color: "var(--accent)" }
  const count: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--ink)",
    border: "1.5px solid var(--ink)",
    padding: "8px 14px",
    background: "var(--bg)",
  }
  const grid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
  }

  return (
    <section id="portfolio" style={section}>
      <div style={inner}>
        <div style={head}>
          <div>
            <div style={eyebrow}>// 02 — 만든 것들</div>
            <h2 style={title}>
              포트폴리오<span style={accentMark}>.</span>
            </h2>
          </div>
          <div style={count}>{portfolioProjects.length} PROJECTS</div>
        </div>
        <div style={grid}>
          {portfolioProjects.map((p, i) => (
            <PortfolioCard key={p.title} idx={i + 1} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
