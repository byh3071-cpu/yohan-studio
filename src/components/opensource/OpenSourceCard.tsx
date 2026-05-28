import type { CSSProperties } from "react"
import type { OpenSourceItem } from "@/data/opensourceItems"

const card: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "22px 24px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  transition: "transform 150ms ease, box-shadow 150ms ease",
}

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  paddingBottom: "12px",
  borderBottom: "1px solid var(--line)",
}

const cat: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  color: "var(--accent)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
}

const year: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--muted)",
  letterSpacing: "0.05em",
}

const badgeRow: CSSProperties = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
}

const badge: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 700,
  padding: "4px 8px",
  border: "1.5px solid var(--line)",
  background: "var(--surface)",
  color: "var(--ink)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
}

const badgeAccent: CSSProperties = {
  ...badge,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  borderColor: "var(--line)",
}

const title: CSSProperties = {
  fontSize: "24px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  lineHeight: 1.15,
}

const summary: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
}

const block: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  paddingTop: "10px",
  borderTop: "1px dashed var(--muted-2)",
}

const label: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
}

const valueList: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: 0,
  margin: 0,
  listStyle: "none",
}

const valueItem: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
  paddingLeft: "16px",
  position: "relative",
}

const valueBullet: CSSProperties = {
  position: "absolute",
  left: 0,
  top: "9px",
  width: "8px",
  height: "2px",
  background: "var(--accent)",
}

const tags: CSSProperties = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
  marginTop: "4px",
}

const tagItem: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  fontFamily: "var(--font-mono)",
  padding: "3px 8px",
  border: "1px solid var(--line)",
  color: "var(--ink)",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
}

const links: CSSProperties = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  paddingTop: "12px",
  borderTop: "1px solid var(--line)",
  marginTop: "auto",
}

const linkStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  color: "var(--accent)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  textDecoration: "none",
}

function isAccentBadge(b: string) {
  return b === "Open Source"
}

export function OpenSourceCard({ item }: { item: OpenSourceItem }) {
  return (
    <article
      style={card}
      data-category={item.category}
      className="opensource-card"
    >
      <div style={top}>
        <span style={cat}>{item.category}</span>
        <span style={year}>{item.year}</span>
      </div>
      <div style={badgeRow}>
        {item.badges.map((b) => (
          <span key={b} style={isAccentBadge(b) ? badgeAccent : badge}>
            {b}
          </span>
        ))}
      </div>
      <h3 style={title}>{item.title}</h3>
      <p style={summary}>{item.summary}</p>
      <div style={block}>
        <span style={label}>핵심</span>
        <ul style={valueList}>
          {item.valueProps.map((v) => (
            <li key={v} style={valueItem}>
              <span style={valueBullet} />
              {v}
            </li>
          ))}
        </ul>
      </div>
      <div style={tags}>
        {item.stack.map((s) => (
          <span key={s} style={tagItem}>
            {s}
          </span>
        ))}
      </div>
      <div style={links}>
        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noreferrer noopener"
            style={linkStyle}
          >
            GitHub →
          </a>
        )}
        {item.npm && (
          <a
            href={item.npm}
            target="_blank"
            rel="noreferrer noopener"
            style={linkStyle}
          >
            npm →
          </a>
        )}
        {item.demo && (
          <a
            href={item.demo}
            target="_blank"
            rel="noreferrer noopener"
            style={linkStyle}
          >
            Live →
          </a>
        )}
        {item.download && (
          <a
            href={item.download}
            target="_blank"
            rel="noreferrer noopener"
            style={linkStyle}
          >
            Download →
          </a>
        )}
      </div>
    </article>
  )
}
