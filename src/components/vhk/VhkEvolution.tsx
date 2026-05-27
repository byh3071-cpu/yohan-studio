"use client"

import { useState, type CSSProperties } from "react"
import { vhkEvolution, vhkSeries } from "@/data/vhk"

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
  fontSize: "clamp(28px, 4.5vw, 48px)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  margin: "0 0 12px",
}

const accent: CSSProperties = { color: "var(--accent)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "720px",
  margin: 0,
}

const rowsWrap: CSSProperties = {
  border: "var(--border-w) solid var(--line)",
  background: "var(--surface)",
}

const rowBase: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "96px 110px 1fr auto",
  gap: "16px",
  alignItems: "center",
  padding: "14px 20px",
  fontSize: "14px",
  lineHeight: 1.5,
  cursor: "pointer",
  transition: "background 0.1s",
  background: "transparent",
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderLeftWidth: 0,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "var(--line-soft)",
  borderRadius: 0,
  width: "100%",
  textAlign: "left",
  font: "inherit",
  color: "inherit",
}

const rowCurrentExtra: CSSProperties = {
  background: "var(--bg)",
  borderLeftWidth: "4px",
  borderLeftStyle: "solid",
  borderLeftColor: "var(--accent)",
  paddingLeft: "16px",
}

const ver: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontWeight: 800,
  color: "var(--ink)",
  fontSize: "14px",
  letterSpacing: "-0.01em",
}

const verCurrent: CSSProperties = { ...ver, color: "var(--accent)" }

const date: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  color: "var(--muted)",
}

const headline: CSSProperties = {
  color: "var(--ink)",
  fontWeight: 600,
}

const kw: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontWeight: 700,
  color: "var(--accent)",
  marginRight: "6px",
}

const ghLink: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  color: "var(--muted-2)",
  textDecoration: "none",
}

const detail: CSSProperties = {
  padding: "0 20px 16px 132px",
  background: "var(--surface)",
  fontSize: "13px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "var(--line-soft)",
}

const detailList: CSSProperties = {
  margin: "4px 0 0",
  paddingLeft: "18px",
}

const seriesGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
  marginTop: "48px",
}

const seriesCard: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "24px 26px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}

const seriesCardFuture: CSSProperties = {
  ...seriesCard,
  borderStyle: "dashed",
  boxShadow: "none",
  background: "transparent",
  opacity: 0.7,
}

const badge: CSSProperties = {
  display: "inline-block",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--accent-ink)",
  background: "var(--accent)",
  padding: "4px 10px",
  border: "var(--border-w) solid var(--line)",
  width: "fit-content",
}

const badgeFuture: CSSProperties = {
  ...badge,
  background: "transparent",
  color: "var(--muted)",
  borderColor: "var(--muted)",
}

const mver: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "22px",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
}

const mrange: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  color: "var(--muted)",
}

const mhead: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 1.3,
  color: "var(--ink)",
}

const mdesc: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
  margin: 0,
}

const note: CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
  fontSize: "16px",
  lineHeight: 1.5,
  color: "var(--ink-2)",
  marginTop: "40px",
  paddingTop: "24px",
  borderTop: "var(--border-w) solid var(--line)",
  maxWidth: "640px",
}

const noteAccent: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontStyle: "normal",
  fontWeight: 700,
  color: "var(--accent)",
}

export function VhkEvolution() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// 05 — EVOLUTION"}</div>
          <h2 style={title}>
            VHK는 <span style={accent}>자라고 있다</span>.
          </h2>
          <p style={lead}>
            v0.4 (시작 메뉴 + 자연어) 부터 v1.3 (자율 하네스) 까지. minor 단위는 한 줄로 압축,
            v2.0 부터는 메이저 카드로 묶는다 — 페이지 길이는 화면 1개 이하 유지.
          </p>
        </div>

        <div style={rowsWrap}>
          {vhkEvolution.map((v, i) => {
            const isOpen = openIndex === i
            const isLast = i === vhkEvolution.length - 1
            const rowStyle: CSSProperties = {
              ...rowBase,
              ...(v.current ? rowCurrentExtra : {}),
              ...(isLast && !isOpen ? { borderBottomWidth: 0 } : {}),
            }
            return (
              <div key={v.version}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`vhk-evo-${v.version}`}
                  style={rowStyle}
                  onMouseEnter={(e) => {
                    if (!v.current) e.currentTarget.style.background = "var(--bg)"
                  }}
                  onMouseLeave={(e) => {
                    if (!v.current) e.currentTarget.style.background = "transparent"
                  }}
                >
                  <span style={v.current ? verCurrent : ver}>{v.version}</span>
                  <span style={date}>{v.date}</span>
                  <span style={headline}>
                    <span style={kw}>[{v.tag}]</span>
                    {v.headline}
                  </span>
                  <a
                    href={v.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={ghLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub →
                  </a>
                </button>
                {isOpen && (
                  <div
                    id={`vhk-evo-${v.version}`}
                    style={{
                      ...detail,
                      ...(isLast ? { borderBottomWidth: 0 } : {}),
                    }}
                  >
                    <ul style={detailList}>
                      {v.bullets.map((b, j) => (
                        <li key={j} style={{ marginBottom: "2px" }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div style={seriesGrid}>
          {vhkSeries.map((s) => (
            <article
              key={s.version}
              style={s.future ? seriesCardFuture : seriesCard}
            >
              <span style={s.future ? badgeFuture : badge}>{s.label}</span>
              <div style={mver}>{s.version}</div>
              <div style={mrange}>{s.range}</div>
              <div style={mhead}>{s.headline}</div>
              <p style={mdesc}>{s.desc}</p>
            </article>
          ))}
        </div>

        <p style={note}>
          처음엔 한 줄, 누적되면 카드.
          <br />
          <span style={noteAccent}>스토리는 남기되, 스크롤은 늘지 않는다.</span>
        </p>
      </div>
    </section>
  )
}
