import type { CSSProperties } from "react"
import type { QaIssueAggregate } from "@/lib/qa/types"

type Props = { aggregates: QaIssueAggregate[] }

function badgeStyle(severity: "fail" | "warning"): CSSProperties {
  const fail = severity === "fail"
  return {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "3px 8px",
    border: `1.5px solid ${fail ? "#D62828" : "var(--ink)"}`,
    background: fail ? "#D62828" : "var(--accent)",
    color: fail ? "#fff" : "var(--accent-ink)",
    display: "inline-block",
    whiteSpace: "nowrap",
  }
}

export function QaIssueAggregateTable({ aggregates }: Props) {
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
  const table: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    background: "var(--surface)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-brutal)",
  }
  const th: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    textAlign: "left",
    padding: "12px 16px",
    borderBottom: "1.5px solid var(--line)",
  }
  const td: CSSProperties = {
    padding: "14px 16px",
    fontSize: "14px",
    color: "var(--ink)",
    borderBottom: "1px solid var(--line)",
    verticalAlign: "top",
  }
  const codeCell: CSSProperties = {
    ...td,
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
  }
  const countCell: CSSProperties = {
    ...td,
    fontFamily: "var(--font-mono)",
    fontVariantNumeric: "tabular-nums",
    textAlign: "right",
    width: "80px",
    fontWeight: 700,
  }

  if (aggregates.length === 0) {
    return (
      <section style={section}>
        <div style={heading}>{"// ISSUE AGGREGATES"}</div>
        <h2 style={subtitle}>이슈 코드별 집계</h2>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          이슈가 없습니다. 모든 라우트가 깨끗합니다.
        </p>
      </section>
    )
  }

  return (
    <section style={section}>
      <div style={heading}>{"// ISSUE AGGREGATES"}</div>
      <h2 style={subtitle}>이슈 코드별 집계 ({aggregates.length}종)</h2>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>severity</th>
            <th style={th}>code</th>
            <th style={{ ...th, textAlign: "right" }}>count</th>
            <th style={th}>sample message</th>
          </tr>
        </thead>
        <tbody>
          {aggregates.map((agg) => (
            <tr key={agg.code}>
              <td style={td}>
                <span style={badgeStyle(agg.severity)}>{agg.severity}</span>
              </td>
              <td style={codeCell}>{agg.code}</td>
              <td style={countCell}>{agg.count}</td>
              <td style={td}>{agg.sampleMessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
