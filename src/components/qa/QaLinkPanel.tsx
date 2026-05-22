import type { CSSProperties } from "react"
import type { QaLinkAggregate, QaViewport } from "@/lib/qa/types"

type Props = {
  storeLinks: QaLinkAggregate[]
  externalLinks: QaLinkAggregate[]
  missingH1: Array<{ name: string; path: string; viewport: QaViewport }>
}

function PanelSection({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  const wrap: CSSProperties = {
    background: "var(--surface)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-brutal-sm)",
    padding: "20px",
  }
  const eb: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "8px",
  }
  const head: CSSProperties = {
    fontSize: "16px",
    fontWeight: 800,
    color: "var(--ink)",
    marginBottom: "14px",
  }
  return (
    <div style={wrap}>
      <div style={eb}>{eyebrow}</div>
      <h3 style={head}>{title}</h3>
      {children}
    </div>
  )
}

function LinkList({ links }: { links: QaLinkAggregate[] }) {
  const list: CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }
  const item: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "10px",
    paddingBottom: "8px",
    borderBottom: "1px solid var(--line)",
  }
  const href: CSSProperties = {
    color: "var(--ink)",
    wordBreak: "break-all",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
  }
  const count: CSSProperties = {
    color: "var(--muted)",
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  }

  if (links.length === 0) {
    return <p style={{ color: "var(--muted)", fontSize: "13px" }}>(없음)</p>
  }

  return (
    <ul style={list}>
      {links.map((l) => (
        <li key={l.href} style={item}>
          <span style={href}>{l.href}</span>
          <span style={count}>{l.foundOn.length}회</span>
        </li>
      ))}
    </ul>
  )
}

export function QaLinkPanel({ storeLinks, externalLinks, missingH1 }: Props) {
  const section: CSSProperties = { marginBottom: "48px" }
  const heading: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "12px",
  }
  const subtitle: CSSProperties = {
    fontSize: "22px",
    fontWeight: 800,
    color: "var(--ink)",
    marginBottom: "16px",
  }
  const grid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  }
  const list: CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--ink)",
  }

  return (
    <section style={section}>
      <div style={heading}>{"// SIDE PANEL"}</div>
      <h2 style={subtitle}>링크 · 점검 항목</h2>
      <div style={grid}>
        <PanelSection eyebrow="STORE LINKS" title={`/store · /#store (${storeLinks.length})`}>
          <LinkList links={storeLinks} />
        </PanelSection>
        <PanelSection
          eyebrow="EXTERNAL LINKS"
          title={`외부 링크 (${externalLinks.length})`}
        >
          <LinkList links={externalLinks} />
        </PanelSection>
        <PanelSection eyebrow="MISSING H1" title={`h1 없는 페이지 (${missingH1.length})`}>
          {missingH1.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: "13px" }}>(없음)</p>
          ) : (
            <ul style={list}>
              {missingH1.map((r) => (
                <li key={`${r.path}-${r.viewport}`}>
                  {r.path}{" "}
                  <span style={{ color: "var(--muted)" }}>@ {r.viewport}</span>
                </li>
              ))}
            </ul>
          )}
        </PanelSection>
      </div>
    </section>
  )
}
