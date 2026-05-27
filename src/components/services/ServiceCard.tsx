import type { CSSProperties } from "react"
import type { Service } from "@/data/services"

const card: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "28px 30px 30px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}

const cardFeatured: CSSProperties = {
  ...card,
  background: "var(--surface)",
  boxShadow: "var(--shadow-lg)",
}

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  paddingBottom: "12px",
  borderBottom: "1px solid var(--line)",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--accent)",
}

const duration: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.06em",
  color: "var(--muted)",
}

const name: CSSProperties = {
  fontSize: "26px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  color: "var(--ink)",
}

const tagline: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
}

const block: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  paddingTop: "12px",
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

const text: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
}

const list: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  paddingLeft: 0,
  listStyle: "none",
}

const listItem: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
  paddingLeft: "16px",
  position: "relative",
}

const bullet: CSSProperties = {
  position: "absolute",
  left: 0,
  top: "8px",
  width: "8px",
  height: "2px",
  background: "var(--accent)",
}

const price: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "22px",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
}

const ctaRow: CSSProperties = {
  display: "flex",
  paddingTop: "16px",
  borderTop: "var(--border-w) solid var(--line)",
}

const cta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "14px 22px",
  fontSize: "14px",
  fontWeight: 700,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

export function ServiceCard({
  service,
  contactUrl,
}: {
  service: Service
  contactUrl: string
}) {
  const ctaHref = contactUrl
    ? `${contactUrl}${contactUrl.includes("?") ? "&" : "?"}service=${service.slug}`
    : `/contact?service=${service.slug}`
  const isExternal = Boolean(contactUrl)

  return (
    <article style={service.featured ? cardFeatured : card} data-service={service.slug}>
      <div style={top}>
        <span style={eyebrow}>{service.featured ? "★ POPULAR" : "SERVICE"}</span>
        <span style={duration}>{service.durationDays}</span>
      </div>
      <h3 style={name}>{service.name}</h3>
      <p style={tagline}>{service.tagline}</p>

      <div style={block}>
        <span style={label}>대상</span>
        <p style={text}>{service.audience}</p>
      </div>

      <div style={block}>
        <span style={label}>제공물</span>
        <ul style={list}>
          {service.deliverables.map((d) => (
            <li key={d} style={listItem}>
              <span style={bullet} />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div style={block}>
        <span style={label}>가격</span>
        <p style={price}>{service.priceRange}</p>
      </div>

      <div style={ctaRow}>
        <a
          href={ctaHref}
          {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          style={cta}
          aria-label={`${service.name} ${service.ctaLabel}`}
        >
          {service.ctaLabel} →
        </a>
      </div>
    </article>
  )
}
