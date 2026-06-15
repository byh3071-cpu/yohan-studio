import type { CSSProperties } from "react"

export type FaqItem = { q: string; a: string }

// Reusable answer-engine-friendly FAQ block. Renders the visible Q&A list and a
// schema.org FAQPage JSON-LD whose mainEntity is sourced from the same array, so
// the markup and structured data never drift. Used by funnel pages (/services,
// /diagnosis). The home page keeps its own bespoke Faq section.
const section: CSSProperties = {
  background: "var(--surface)",
  padding: "72px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "16px",
}

const heading: CSSProperties = {
  fontSize: "clamp(28px, 4.5vw, 44px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  lineHeight: 1.05,
  color: "var(--ink)",
  marginBottom: "32px",
}

const list: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
  listStyle: "none",
  padding: 0,
  margin: 0,
}

const item: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  padding: "22px 24px",
}

const question: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
  marginBottom: "10px",
  display: "flex",
  alignItems: "baseline",
  gap: "10px",
}

const qMark: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "13px",
  fontWeight: 700,
  color: "var(--accent)",
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
}

const answer: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.75,
  color: "var(--ink-2)",
  margin: 0,
}

type PageFaqProps = {
  eyebrow: string
  heading: string
  faqs: FaqItem[]
}

export function PageFaq({ eyebrow: eyebrowText, heading: headingText, faqs }: PageFaqProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }

  return (
    <section id="faq" style={section}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={inner}>
        <div style={eyebrow}>{eyebrowText}</div>
        <h2 style={heading}>{headingText}</h2>
        <ul style={list} className="faq-list">
          {faqs.map(({ q, a }, i) => (
            <li key={q} style={item}>
              <h3 style={question}>
                <span style={qMark}>Q{String(i + 1).padStart(2, "0")}</span>
                <span>{q}</span>
              </h3>
              <p style={answer}>{a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
