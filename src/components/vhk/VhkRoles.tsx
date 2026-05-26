import type { CSSProperties } from "react"
import { vhkProductRoles } from "@/data/vhk"

const section: CSSProperties = {
  background: "var(--surface)",
  padding: "0 24px 64px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const label: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "12px",
}

const table: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  background: "var(--bg)",
}

const th: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textAlign: "left",
  padding: "12px 16px",
  borderBottom: "var(--border-w) solid var(--line)",
  background: "var(--surface)",
  color: "var(--muted)",
}

const td: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.5,
  padding: "14px 16px",
  borderBottom: "1px solid var(--muted-2)",
  color: "var(--ink-2)",
  verticalAlign: "top",
}

const product: CSSProperties = {
  fontWeight: 800,
  color: "var(--ink)",
}

export function VhkRoles() {
  return (
    <section style={section} aria-labelledby="vhk-roles-heading">
      <div style={inner}>
        <p id="vhk-roles-heading" style={label}>
          {"// 제품 역할 — 맥락이 겹치지 않게"}
        </p>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>제품</th>
              <th style={th}>레이어</th>
              <th style={th}>역할</th>
            </tr>
          </thead>
          <tbody>
            {vhkProductRoles.map((row, i) => (
              <tr
                key={row.product}
                style={
                  i === vhkProductRoles.length - 1
                    ? {}
                    : undefined
                }
              >
                <td style={{ ...td, ...(i === vhkProductRoles.length - 1 ? { borderBottom: "none" } : {}) }}>
                  <span style={product}>{row.product}</span>
                </td>
                <td style={{ ...td, ...(i === vhkProductRoles.length - 1 ? { borderBottom: "none" } : {}) }}>
                  {row.layer}
                </td>
                <td style={{ ...td, ...(i === vhkProductRoles.length - 1 ? { borderBottom: "none" } : {}) }}>
                  {row.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
