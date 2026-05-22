import type { CSSProperties } from "react"
import type { QaRouteSummary, QaStatus } from "@/lib/qa/types"

type Props = { routes: QaRouteSummary[] }

function statusColor(status: QaStatus): { bg: string; fg: string; border: string } {
  switch (status) {
    case "fail":
      return { bg: "#D62828", fg: "#fff", border: "#D62828" }
    case "warning":
      return { bg: "var(--accent)", fg: "var(--accent-ink)", border: "var(--ink)" }
    case "pass":
    default:
      return { bg: "var(--surface)", fg: "var(--ink)", border: "var(--ink)" }
  }
}

function StatusBadge({ status }: { status: QaStatus }) {
  const c = statusColor(status)
  const style: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "3px 8px",
    background: c.bg,
    color: c.fg,
    border: `1.5px solid ${c.border}`,
  }
  return <span style={style}>{status}</span>
}

function RouteCard({ route }: { route: QaRouteSummary }) {
  const card: CSSProperties = {
    background: "var(--surface)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-brutal)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  }
  const thumbWrap: CSSProperties = {
    aspectRatio: "16 / 10",
    background: "var(--bg)",
    borderBottom: "1.5px solid var(--line)",
    overflow: "hidden",
    position: "relative",
  }
  const thumb: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top center",
    display: "block",
  }
  const thumbEmpty: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--muted)",
  }
  const body: CSSProperties = {
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  }
  const topRow: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  }
  const pathLabel: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--ink)",
  }
  const viewportLabel: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
  }
  const titleStyle: CSSProperties = {
    fontSize: "13px",
    color: "var(--ink-2)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }
  const headline: CSSProperties = {
    fontSize: "12px",
    color: "var(--ink-2)",
    lineHeight: 1.5,
    minHeight: "32px",
  }
  const chipRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: "6px" }
  const chip: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    padding: "2px 6px",
    background: "var(--bg)",
    color: "var(--ink-2)",
    border: "1px solid var(--line)",
  }

  return (
    <article style={card}>
      <div style={thumbWrap}>
        {route.screenshotPath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={route.screenshotPath}
            alt={`${route.name} @ ${route.viewport} screenshot`}
            style={thumb}
            loading="lazy"
          />
        ) : (
          <div style={thumbEmpty}>NO SCREENSHOT</div>
        )}
      </div>
      <div style={body}>
        <div style={topRow}>
          <div>
            <div style={pathLabel}>{route.path}</div>
            <div style={viewportLabel}>{route.viewport}</div>
          </div>
          <StatusBadge status={route.status} />
        </div>
        <div style={titleStyle}>{route.title || "(title 없음)"}</div>
        <div style={headline}>{route.headline}</div>
        {route.issueCodes.length > 0 && (
          <div style={chipRow}>
            {route.issueCodes.map((code, i) => (
              <span key={`${code}-${i}`} style={chip}>
                {code}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export function QaRouteGrid({ routes }: Props) {
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
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
  }

  return (
    <section style={section}>
      <div style={heading}>{"// ROUTES"}</div>
      <h2 style={subtitle}>라우트별 결과 ({routes.length})</h2>
      <div style={grid}>
        {routes.map((r) => (
          <RouteCard key={`${r.path}-${r.viewport}`} route={r} />
        ))}
      </div>
    </section>
  )
}
