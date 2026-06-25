import type { CSSProperties } from "react"
import { AREAS, AREA_LABELS_KO } from "@/data/aimScanQuestions"
import { TrackedLink } from "@/components/analytics/TrackedLink"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = {
  maxWidth: "var(--max-w)",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 360px)",
  gap: "48px",
  alignItems: "start",
}

const head: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
}

const title: CSSProperties = {
  fontSize: "clamp(32px, 5vw, 52px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
}

const accent: CSSProperties = { color: "var(--accent)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "540px",
}

const stats: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, auto)",
  gap: "32px",
  paddingTop: "24px",
  borderTop: "1px solid var(--line)",
}

const statItem: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}

const statValue: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "32px",
  fontWeight: 800,
  lineHeight: 1,
  color: "var(--ink)",
}

const statLabel: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--muted)",
}

const ctaRow: CSSProperties = {
  display: "flex",
  gap: "12px",
  paddingTop: "24px",
  flexWrap: "wrap",
}

const btnPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px 26px",
  fontSize: "15px",
  fontWeight: 700,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

const areasBox: CSSProperties = {
  background: "var(--surface)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-lg)",
  padding: "24px 26px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}

const areasTitle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  paddingBottom: "8px",
  borderBottom: "1px solid var(--line)",
  marginBottom: "8px",
}

const areaRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px dashed var(--muted-2)",
  fontSize: "14px",
}

const areaLabel: CSSProperties = {
  fontWeight: 700,
  color: "var(--ink)",
}

const areaNum: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "12px",
  color: "var(--accent)",
  fontWeight: 600,
}

export function ScanIntro() {
  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div style={eyebrow}>{"// 04 — 진단"}</div>
          <h2 style={title}>
            <span style={accent}>A&rsquo;Im Scan</span>으로 빈 곳을 먼저 찾는다.
          </h2>
          <p style={lead}>
            방향·전략·구조·수익화·프롬프트·디자인·의사결정 — 7개 영역을 21문항으로 진단한다.
            결과는 5단계 레벨과 약한 영역 TOP 3으로 정리된다.
          </p>
          <div style={stats}>
            <div style={statItem}>
              <span style={statValue}>7</span>
              <span style={statLabel}>영역</span>
            </div>
            <div style={statItem}>
              <span style={statValue}>21</span>
              <span style={statLabel}>문항</span>
            </div>
            <div style={statItem}>
              <span style={statValue}>5</span>
              <span style={statLabel}>레벨</span>
            </div>
          </div>
          <div style={ctaRow}>
            <TrackedLink
              href="/diagnosis"
              event="cta_click"
              params={{ location: "scan_intro", target: "diagnosis" }}
              style={btnPrimary}
            >
              지금 진단하기 →
            </TrackedLink>
          </div>
        </div>

        <aside style={areasBox}>
          <div style={areasTitle}>{"// 진단 영역"}</div>
          {AREAS.map((a, i) => (
            <div key={a} style={areaRow}>
              <span style={areaLabel}>{AREA_LABELS_KO[a]}</span>
              <span style={areaNum}>0{i + 1}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
}
