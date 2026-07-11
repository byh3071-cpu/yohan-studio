import type { CSSProperties } from "react"
import Link from "next/link"
import { STORE_PAUSED_LABEL, STORE_SALES_ENABLED } from "@/data/storeConfig"
import { getPublishedPosts } from "@/lib/blog"
import { supabase } from "@/lib/supabase"
import { BlogCard } from "@/components/blog/BlogCard"
import { PriceTag } from "@/components/store/PriceTag"

type FeaturedProduct = {
  name: string
  desc: string
  slug: string
  priceCents: number
  currency: string
}

async function fetchFeaturedProducts(): Promise<FeaturedProduct[]> {
  try {
    const { data, error } = await supabase
      .from("studio_products")
      .select("name, description, slug, price_cents, currency")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(3)
    if (error || !data) return []
    return data.map((p) => ({
      name: p.name,
      desc: p.description ?? "",
      slug: p.slug,
      priceCents: p.price_cents,
      currency: p.currency,
    }))
  } catch {
    return []
  }
}

function ProductCard({ idx, name, desc, slug, priceCents, currency }: FeaturedProduct & { idx: number }) {
  const card: CSSProperties = {
    background: "var(--bg)",
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow)",
    display: "flex",
    flexDirection: "column",
  }
  const thumb: CSSProperties = {
    height: "140px",
    background: "var(--surface-2)",
    borderBottom: "var(--border-w) solid var(--line)",
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
    fontWeight: 400,
    fontFamily: "var(--font-en)",
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
    borderTop: "1px solid var(--line)",
  }
  const badge: CSSProperties = {
    fontSize: "12px",
    fontWeight: 700,
    fontFamily: "var(--font-mono)",
    padding: "6px 12px",
    background: "var(--surface-2)",
    color: "var(--muted)",
    border: "1px solid var(--line)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }
  return (
    <Link href={`/store/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <article style={card}>
        <div style={thumb}>
          <span style={thumbNum}>SKU {String(idx).padStart(2, "0")}</span>
          IMAGE / PLACEHOLDER
        </div>
        <div style={body}>
          <h3 style={ttl}>{name}</h3>
          <p style={dsc}>{desc}</p>
          <div style={row}>
            <PriceTag priceCents={priceCents} currency={currency} size="sm" tbd={!STORE_SALES_ENABLED} />
            {!STORE_SALES_ENABLED && (
              <span style={badge} aria-label="판매 준비 중">{STORE_PAUSED_LABEL}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export async function Featured() {
  const products = await fetchFeaturedProducts()
  const publishedPosts = getPublishedPosts().slice(0, 3)
  const blogs = publishedPosts.map((p) => ({
    date: p.date,
    title: p.title,
    excerpt: p.description,
    tags: p.tags,
    slug: p.slug,
  }))

  const sectionStyle: CSSProperties = {
    background: "var(--bg)",
    padding: "96px 24px",
    borderBottom: "var(--border-w) solid var(--line)",
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
    borderBottom: "var(--border-w) solid var(--line)",
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
    border: "1.5px solid var(--line)",
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
              <div style={eyebrow}>{"// 03 — 글"}</div>
              <h2 style={title}>
                블로그<span style={accentMark}>.</span>
              </h2>
            </div>
            <Link href="/blog" style={more}>
              모두 보기 →
            </Link>
          </div>
          <div style={grid}>
            {blogs.map((b, i) => (
              <BlogCard key={b.title} idx={i + 1} {...b} />
            ))}
          </div>
        </div>

        <div id="store" style={blockLast}>
          <div style={head}>
            <div>
              <div style={eyebrow}>{"// 04 — 디지털 상품"}</div>
              <h2 style={title}>
                스토어<span style={accentMark}>.</span>
              </h2>
            </div>
            <Link href="/store" style={more}>
              스토어 보기 →
            </Link>
          </div>
          {products.length > 0 ? (
            <div style={grid}>
              {products.map((p, i) => (
                <ProductCard key={p.slug} idx={i + 1} {...p} />
              ))}
            </div>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--muted)",
                letterSpacing: "0.04em",
                border: "1.5px dashed var(--line)",
                padding: "28px 24px",
                margin: 0,
              }}
            >
              {"// 스토어 준비 중 — 곧 공개됩니다"}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
