"use client"

import { useMemo, useState, type CSSProperties } from "react"

import { ProductCard } from "@/components/store/ProductCard"
import type { Database } from "@/types/database"

type ProductRow = Database["public"]["Tables"]["studio_products"]["Row"]
type Filter = "all" | "free" | "paid"

const tabBar: CSSProperties = {
  display: "inline-flex",
  border: "var(--border-w) solid var(--line)",
  background: "var(--bg)",
  boxShadow: "var(--shadow-sm)",
  marginBottom: "28px",
}

const tabBase: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "10px 18px",
  color: "var(--ink)",
  background: "transparent",
  border: "none",
  borderRight: "1px solid var(--line)",
  cursor: "pointer",
  transition: "background 100ms ease, color 100ms ease",
}

const tabLast: CSSProperties = { ...tabBase, borderRight: "none" }

const tabActive: CSSProperties = {
  background: "var(--accent)",
  color: "var(--accent-ink)",
}

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "24px",
}

const empty: CSSProperties = {
  border: "var(--border-w) solid var(--line)",
  padding: "48px 24px",
  textAlign: "center",
  color: "var(--muted)",
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  background: "var(--bg)",
}

const cardWrap: CSSProperties = { position: "relative" }

const freeBadge: CSSProperties = {
  position: "absolute",
  top: "10px",
  left: "10px",
  zIndex: 2,
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  background: "var(--accent)",
  color: "var(--accent-ink)",
  border: "1.5px solid var(--line)",
  padding: "4px 8px",
  boxShadow: "var(--shadow-sm)",
}

const meta: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  color: "var(--muted)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: "16px",
}

const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "free", label: "Free" },
  { id: "paid", label: "Paid" },
]

export function StoreTabs({ products }: { products: ProductRow[] }) {
  const [filter, setFilter] = useState<Filter>("all")

  const filtered = useMemo(() => {
    if (filter === "free") return products.filter((p) => p.price_cents === 0)
    if (filter === "paid") return products.filter((p) => p.price_cents > 0)
    return products
  }, [products, filter])

  return (
    <div>
      <div style={tabBar} role="tablist" aria-label="상품 필터">
        {TABS.map((t, i) => {
          const isLast = i === TABS.length - 1
          const isActive = filter === t.id
          const style: CSSProperties = {
            ...(isLast ? tabLast : tabBase),
            ...(isActive ? tabActive : null),
          }
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              style={style}
              onClick={() => setFilter(t.id)}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div style={meta}>{filtered.length} ITEMS</div>

      {filtered.length === 0 ? (
        <div style={empty}>해당 필터의 상품이 아직 없습니다.</div>
      ) : (
        <div style={grid}>
          {filtered.map((p) => (
            <div key={p.id} style={cardWrap}>
              {p.price_cents === 0 && <span style={freeBadge}>FREE</span>}
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
