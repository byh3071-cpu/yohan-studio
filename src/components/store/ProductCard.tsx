import Link from "next/link"
import type { CSSProperties } from "react"

import { PriceTag } from "@/components/store/PriceTag"
import type { Database } from "@/types/database"

type ProductRow = Database["public"]["Tables"]["studio_products"]["Row"]

const card: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
  color: "inherit",
  transition: "transform 100ms ease, box-shadow 100ms ease",
  height: "100%",
}

const thumb: CSSProperties = {
  width: "100%",
  aspectRatio: "16 / 10",
  background: "var(--surface-2, #e5e0d2)",
  borderBottom: "var(--border-w) solid var(--line)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  color: "var(--muted)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  overflow: "hidden",
}

const thumbImg: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
}

const body: CSSProperties = {
  padding: "20px 22px 22px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flexGrow: 1,
}

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "8px",
  borderBottom: "1px dashed var(--muted-2, var(--muted))",
}

const typeBadge: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 700,
  color: "var(--accent)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
}

const inactiveBadge: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 700,
  background: "var(--ink)",
  color: "var(--bg)",
  padding: "2px 6px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
}

const title: CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  color: "var(--ink)",
  margin: 0,
}

const desc: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}

const footer: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "10px",
  borderTop: "1px solid var(--line)",
  marginTop: "auto",
}

const cta: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  color: "var(--accent)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
}

export function ProductCard({ product }: { product: ProductRow }) {
  return (
    <Link href={`/store/${product.slug}`} style={card} data-product-type={product.product_type}>
      <div style={thumb}>
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.name} style={thumbImg} />
        ) : (
          <span>{product.product_type}</span>
        )}
      </div>
      <div style={body}>
        <div style={top}>
          <span style={typeBadge}>{product.product_type}</span>
          {!product.active && <span style={inactiveBadge}>품절</span>}
        </div>
        <h3 style={title}>{product.name}</h3>
        {product.description && <p style={desc}>{product.description}</p>}
        <div style={footer}>
          <PriceTag priceCents={product.price_cents} currency={product.currency} size="sm" />
          <span style={cta}>자세히 →</span>
        </div>
      </div>
    </Link>
  )
}
