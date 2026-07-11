import type { CSSProperties, ReactNode } from "react"
import type { ShowroomProject } from "@/data/showroomProjects"

const section: CSSProperties = {
  marginBottom: "40px",
  paddingBottom: "32px",
  borderBottom: "1px dashed var(--muted-2)",
}

const label: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "14px",
}

const body: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--ink-2)",
  maxWidth: "760px",
  wordBreak: "keep-all",
}

const metaGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
  marginBottom: "40px",
}

const card: CSSProperties = {
  border: "var(--border-w) solid var(--line)",
  background: "var(--surface)",
  boxShadow: "var(--shadow-sm)",
  padding: "18px 20px",
}

const cardKey: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "8px",
}

const cardValue: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.55,
  fontWeight: 700,
  color: "var(--ink)",
}

const metricGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
}

const metricValue: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "clamp(22px, 3.2vw, 30px)",
  fontWeight: 800,
  lineHeight: 1.2,
  letterSpacing: "-0.03em",
  color: "var(--accent)",
  marginBottom: "8px",
  wordBreak: "keep-all",
}

const note: CSSProperties = {
  fontSize: "12px",
  lineHeight: 1.55,
  color: "var(--muted)",
}

const list: CSSProperties = {
  display: "grid",
  gap: "10px",
  padding: 0,
  margin: 0,
  listStyle: "none",
  maxWidth: "760px",
}

const listItem: CSSProperties = {
  position: "relative",
  paddingLeft: "18px",
  fontSize: "15px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
}

const dot: CSSProperties = {
  position: "absolute",
  left: 0,
  top: "11px",
  width: "9px",
  height: "2px",
  background: "var(--accent)",
}

const decisionGrid: CSSProperties = {
  display: "grid",
  gap: "16px",
  maxWidth: "900px",
}

const decisionTitle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 800,
  color: "var(--ink)",
  marginBottom: "10px",
}

const privacy: CSSProperties = {
  ...section,
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  background: "var(--surface)",
  padding: "24px",
}

const statusLabels: Record<NonNullable<ShowroomProject["status"]>, string> = {
  operating: "운영 중",
  shipped: "출시·운영 검증",
  prototype: "프로토타입",
  archived: "운영 종료",
}

function BulletList({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <ul style={list}>
      {items.map((item) => (
        <li key={item} style={listItem}>
          <span style={dot} />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={section}>
      <h2 style={label}>{title}</h2>
      {children}
    </section>
  )
}

export function CaseStudyDetails({ project }: { project: ShowroomProject }) {
  if (project.kind !== "case-study") return null

  return (
    <>
      <div style={metaGrid} aria-label="프로젝트 개요">
        {project.status && (
          <div style={card}>
            <div style={cardKey}>Status</div>
            <div style={cardValue}>{statusLabels[project.status]}</div>
          </div>
        )}
        {project.context && (
          <div style={card}>
            <div style={cardKey}>Context</div>
            <div style={cardValue}>{project.context}</div>
          </div>
        )}
        {project.role && (
          <div style={card}>
            <div style={cardKey}>My Role</div>
            <div style={cardValue}>{project.role}</div>
          </div>
        )}
        {project.duration && (
          <div style={card}>
            <div style={cardKey}>Duration</div>
            <div style={cardValue}>{project.duration}</div>
          </div>
        )}
      </div>

      {project.problem && (
        <Block title="01 · 문제 정의">
          <p style={body}>{project.problem}</p>
        </Block>
      )}

      {project.constraints?.length ? (
        <Block title="02 · 요구사항과 제약">
          <BulletList items={project.constraints} />
        </Block>
      ) : null}

      {project.metrics?.length ? (
        <Block title="03 · 측정된 결과">
          <div style={metricGrid}>
            {project.metrics.map((metric) => (
              <article key={metric.label} style={card}>
                <div style={cardKey}>{metric.label}</div>
                <div style={metricValue}>
                  {metric.before ? `${metric.before} → ` : ""}
                  {metric.after}
                </div>
                <p style={note}>
                  {metric.verified ? "검증됨" : "참고값"} · {metric.basis}
                </p>
              </article>
            ))}
          </div>
        </Block>
      ) : null}

      {project.decisions?.length ? (
        <Block title="04 · 선택 이유와 트레이드오프">
          <div style={decisionGrid}>
            {project.decisions.map((decision) => (
              <article key={decision.choice} style={card}>
                <h3 style={decisionTitle}>{decision.choice}</h3>
                <p style={body}>{decision.reason}</p>
                {decision.alternatives.length > 0 && (
                  <p style={{ ...note, marginTop: "10px" }}>
                    검토한 대안 · {decision.alternatives.join(" / ")}
                  </p>
                )}
                <p style={{ ...note, marginTop: "6px" }}>
                  트레이드오프 · {decision.tradeoff}
                </p>
              </article>
            ))}
          </div>
        </Block>
      ) : null}

      {project.verification?.length ? (
        <Block title="05 · 검증과 운영">
          <BulletList items={project.verification} />
        </Block>
      ) : null}

      {project.evidence?.length ? (
        <Block title="06 · 증거">
          <div style={decisionGrid}>
            {project.evidence.map((item) => (
              <article key={`${item.type}:${item.label}`} style={card}>
                <div style={cardKey}>{item.type}</div>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ ...cardValue, color: "var(--accent)" }}
                  >
                    {item.label} →
                  </a>
                ) : (
                  <div style={cardValue}>{item.label}</div>
                )}
                {item.note && <p style={{ ...note, marginTop: "8px" }}>{item.note}</p>}
              </article>
            ))}
          </div>
        </Block>
      ) : null}

      {project.privacyNote && (
        <section style={privacy}>
          <h2 style={{ ...label, color: "var(--accent)" }}>07 · 개인정보와 운영 책임</h2>
          <p style={body}>{project.privacyNote}</p>
        </section>
      )}

      {project.limitations?.length ? (
        <Block title="08 · 한계">
          <BulletList items={project.limitations} />
        </Block>
      ) : null}

      {project.nextSteps?.length ? (
        <Block title="09 · 다음 개선">
          <BulletList items={project.nextSteps} />
        </Block>
      ) : null}
    </>
  )
}
