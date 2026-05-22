import type { CSSProperties } from "react"
import type { QaRouteHotspot } from "@/lib/qa/types"

type Props = { hotspots: QaRouteHotspot[] }

export function QaHotspots({ hotspots }: Props) {
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
  const list: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "12px",
  }
  const item: CSSProperties = {
    background: "var(--surface)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-brutal-sm)",
    padding: "16px",
  }
  const pathLabel: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--ink)",
    marginBottom: "4px",
  }
  const viewportLabel: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "12px",
  }
  const numbers: CSSProperties = {
    display: "flex",
    gap: "12px",
    alignItems: "baseline",
    fontFamily: "var(--font-mono)",
    fontVariantNumeric: "tabular-nums",
  }
  const num = (color: string): CSSProperties => ({
    fontSize: "22px",
    fontWeight: 800,
    color,
    lineHeight: 1,
  })
  const numLabel: CSSProperties = {
    fontSize: "10px",
    color: "var(--muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  }

  if (hotspots.length === 0) {
    return (
      <section style={section}>
        <div style={heading}>{"// HOTSPOTS"}</div>
        <h2 style={subtitle}>핫스팟</h2>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          이슈가 있는 라우트가 없습니다.
        </p>
      </section>
    )
  }

  return (
    <section style={section}>
      <div style={heading}>{"// HOTSPOTS"}</div>
      <h2 style={subtitle}>이슈 많은 페이지 ({hotspots.length})</h2>
      <div style={list}>
        {hotspots.map((h) => (
          <div key={`${h.path}-${h.viewport}`} style={item}>
            <div style={pathLabel}>{h.path}</div>
            <div style={viewportLabel}>{h.viewport}</div>
            <div style={numbers}>
              <div>
                <div style={num("#D62828")}>{h.failCount}</div>
                <div style={numLabel}>fail</div>
              </div>
              <div>
                <div style={num("var(--accent)")}>{h.warningCount}</div>
                <div style={numLabel}>warn</div>
              </div>
              <div>
                <div style={num("var(--ink)")}>{h.issueCount}</div>
                <div style={numLabel}>total</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
