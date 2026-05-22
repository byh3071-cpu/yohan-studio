import type { CSSProperties } from "react"
import type { QaReportSummary } from "@/lib/qa/types"

type Props = {
  totals: QaReportSummary
  baseUrl: string
  createdAt: string
  sourceCreatedAt: string
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toISOString().replace("T", " ").slice(0, 19) + " UTC"
  } catch {
    return iso
  }
}

export function QaHeader({ totals, baseUrl, createdAt, sourceCreatedAt }: Props) {
  const wrap: CSSProperties = { marginBottom: "40px" }
  const eyebrow: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "10px",
  }
  const title: CSSProperties = {
    fontSize: "clamp(32px, 4.5vw, 52px)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: "var(--ink)",
    marginBottom: "16px",
  }
  const accent: CSSProperties = { color: "var(--accent-text)" }
  const meta: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--ink-2)",
    lineHeight: 1.7,
    marginBottom: "28px",
  }
  const metric: CSSProperties = {
    flex: "1 1 160px",
    background: "var(--surface)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-brutal-sm)",
    padding: "20px",
  }
  const metricLabel: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "8px",
  }
  const metricNumber = (color: string): CSSProperties => ({
    fontSize: "44px",
    fontWeight: 800,
    color,
    lineHeight: 1,
    fontVariantNumeric: "tabular-nums",
  })
  const row: CSSProperties = { display: "flex", gap: "16px", flexWrap: "wrap" }

  const passColor = totals.passed > 0 ? "var(--ink)" : "var(--muted)"
  const warnColor = totals.warnings > 0 ? "var(--accent)" : "var(--muted)"
  const failColor = totals.failed > 0 ? "#D62828" : "var(--muted)"

  return (
    <header style={wrap}>
      <div style={eyebrow}>{"// QA REPORT"}</div>
      <h1 style={title}>
        QA<span style={accent}>.</span>
      </h1>
      <div style={meta}>
        baseUrl: {baseUrl} · raw: {formatDate(sourceCreatedAt)} · summary:{" "}
        {formatDate(createdAt)}
      </div>
      <div style={row}>
        <div style={metric}>
          <div style={metricLabel}>total routes</div>
          <div style={metricNumber("var(--ink)")}>{totals.totalRoutes}</div>
        </div>
        <div style={metric}>
          <div style={metricLabel}>pass</div>
          <div style={metricNumber(passColor)}>{totals.passed}</div>
        </div>
        <div style={metric}>
          <div style={metricLabel}>warning</div>
          <div style={metricNumber(warnColor)}>{totals.warnings}</div>
        </div>
        <div style={metric}>
          <div style={metricLabel}>fail</div>
          <div style={metricNumber(failColor)}>{totals.failed}</div>
        </div>
      </div>
    </header>
  )
}
