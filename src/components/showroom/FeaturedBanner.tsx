import type { CSSProperties } from "react"
import Link from "next/link"
import type { ShowroomProject } from "@/data/showroomProjects"

const wrap: CSSProperties = {
  display: "grid",
  gap: "20px",
  marginBottom: "40px",
}

const banner: CSSProperties = {
  background: "var(--surface)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-lg)",
  padding: "32px 36px",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: "24px",
  alignItems: "end",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--accent)",
  marginBottom: "12px",
}

const title: CSSProperties = {
  fontSize: "clamp(28px, 4vw, 44px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  marginBottom: "12px",
}

const summary: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
  maxWidth: "640px",
}

const meta: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--muted)",
  whiteSpace: "nowrap",
}

export function FeaturedBanner({ projects }: { projects: ShowroomProject[] }) {
  const featured = projects.filter((p) => p.featured)
  if (featured.length === 0) return null

  return (
    <div style={wrap}>
      {featured.map((p) => (
        <article key={p.slug} style={banner}>
          <div>
            <div style={eyebrow}>★ FEATURED · {p.category}</div>
            <h3 style={title}>
              <Link href={`/showroom/${p.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                {p.title}
              </Link>
            </h3>
            <p style={summary}>{p.summary}</p>
            <Link
              href={`/showroom/${p.slug}`}
              style={{
                display: "inline-block",
                marginTop: "16px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              프로젝트 상세 →
            </Link>
          </div>
          <div style={meta}>{p.year}</div>
        </article>
      ))}
    </div>
  )
}
