import type { CSSProperties } from "react"
import type { FeaturedBlog, FeaturedProduct } from "@/data/featured"
import { featuredBlogs, featuredProducts } from "@/data/featured"

function BlogCard({
  idx,
  date,
  title,
  excerpt,
  tags,
}: FeaturedBlog & { idx: number }) {
  const card: CSSProperties = {
    background: "var(--bg)",
    border: "var(--border-w) solid var(--ink)",
    boxShadow: "var(--shadow)",
    padding: "20px 22px 22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }
  const top: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--ink)",
  }
  const num: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--muted)",
    letterSpacing: "0.05em",
  }
  const dt: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--accent)",
    letterSpacing: "0.05em",
  }
  const ttl: CSSProperties = {
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--ink)",
    lineHeight: 1.2,
    marginTop: "4px",
  }
  const exc: CSSProperties = {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "var(--ink-2)",
    flex: 1,
  }
  const tagsRow: CSSProperties = {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    marginTop: "6px",
  }
  const tag: CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    padding: "3px 8px",
    border: "1px solid var(--ink)",
    color: "var(--ink)",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  }
  return (
    <article style={card}>
      <div style={top}>
        <span style={num}>POST {String(idx).padStart(2, "0")}</span>
        <span style={dt}>{date}</span>
      </div>
      <h3 style={ttl}>{title}</h3>
      <p style={exc}>{excerpt}</p>
      <div style={tagsRow}>
        {tags.map((t) => (
          <span key={t} style={tag}>
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

function ProductCard({ idx, name, desc, price }: FeaturedProduct & { idx: number }) {
  const card: CSSProperties = {
    background: "var(--bg)",
    border: "var(--border-w) solid var(--ink)",
    boxShadow: "var(--shadow)",
    display: "flex",
    flexDirection: "column",
  }
  const thumb: CSSProperties = {
    height: "140px",
    background: "var(--surface-2)",
    borderBottom: "var(--border-w) solid var(--ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    position: "relative",
  }
  const thumbNum: CSSProperties = {
    position: "absolute",
    top: "10px",
    left: "12px",
    fontSize: "11px",
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    color: "var(--muted)",
  }
  const body: CSSProperties = { padding: "20px 22px 22px" }
  const ttl: CSSProperties = {
    fontSize: "18px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "var(--ink)",
    lineHeight: 1.2,
    marginBottom: "6px",
  }
  const dsc: CSSProperties = {
    fontSize: "13px",
    color: "var(--ink-2)",
    marginBottom: "14px",
    lineHeight: 1.6,
  }
  const row: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "14px",
    borderTop: "1px solid var(--ink)",
  }
  const prc: CSSProperties = {
    fontSize: "20px",
    fontWeight: 800,
    color: "var(--ink)",
    letterSpacing: "-0.02em",
  }
  const cta: CSSProperties = {
    fontSize: "12px",
    fontWeight: 700,
    fontFamily: "var(--font-mono)",
    padding: "6px 12px",
    background: "var(--accent)",
    color: "var(--accent-ink)",
    border: "1px solid var(--ink)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }
  return (
    <article style={card}>
      <div style={thumb}>
        <span style={thumbNum}>SKU {String(idx).padStart(2, "0")}</span>
        IMAGE / PLACEHOLDER
      </div>
      <div style={body}>
        <h3 style={ttl}>{name}</h3>
        <p style={dsc}>{desc}</p>
        <div style={row}>
          <span style={prc}>{price}</span>
          <span style={cta}>BUY →</span>
        </div>
      </div>
    </article>
  )
}

export function Featured() {
  const sectionStyle: CSSProperties = {
    background: "var(--bg)",
    padding: "96px 24px",
    borderBottom: "var(--border-w) solid var(--ink)",
  }
  const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }
  const block: CSSProperties = { marginBottom: "80px" }
  const blockLast: CSSProperties = { marginBottom: 0 }
  const head: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "end",
    gap: "20px",
    paddingBottom: "24px",
    marginBottom: "32px",
    borderBottom: "var(--border-w) solid var(--ink)",
  }
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
    fontSize: "clamp(32px, 4.5vw, 48px)",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    color: "var(--ink)",
  }
  const accentMark: CSSProperties = { color: "var(--accent)" }
  const more: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 700,
    padding: "8px 14px",
    border: "1.5px solid var(--ink)",
    background: "var(--bg)",
    color: "var(--ink)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  }
  const grid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
  }

  return (
    <section id="blog-and-store" style={sectionStyle}>
      <div style={inner}>
        <div id="blog" style={block}>
          <div style={head}>
            <div>
              <div style={eyebrow}>// 03 — 글</div>
              <h2 style={title}>
                블로그<span style={accentMark}>.</span>
              </h2>
            </div>
            <a href="#" style={more}>
              모두 보기 →
            </a>
          </div>
          <div style={grid}>
            {featuredBlogs.map((b, i) => (
              <BlogCard key={b.title} idx={i + 1} {...b} />
            ))}
          </div>
        </div>

        <div id="store" style={blockLast}>
          <div style={head}>
            <div>
              <div style={eyebrow}>// 04 — 디지털 상품</div>
              <h2 style={title}>
                스토어<span style={accentMark}>.</span>
              </h2>
            </div>
            <a href="#" style={more}>
              모두 보기 →
            </a>
          </div>
          <div style={grid}>
            {featuredProducts.map((p, i) => (
              <ProductCard key={p.name} idx={i + 1} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
