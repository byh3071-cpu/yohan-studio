"use client"

import { useCallback, useMemo } from "react"
import type { CSSProperties, ReactNode } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { PRODUCTS, type ProductId, type UpdateEntryMeta } from "@/lib/updatesShared"
import { UpdateEntry } from "@/components/updates/UpdateEntry"

export type FeedEntry = {
  meta: UpdateEntryMeta
  content: ReactNode
}

type Props = { entries: FeedEntry[] }

const productIds = Object.keys(PRODUCTS) as ProductId[]

function withParam(current: URLSearchParams, key: string, value: string | null): string {
  const next = new URLSearchParams(current)
  if (value && value.length > 0) next.set(key, value)
  else next.delete(key)
  const s = next.toString()
  return s ? `?${s}` : ""
}

export function UpdatesFeed({ entries }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rawProduct = searchParams.get("product")
  const activeProduct = productIds.includes(rawProduct as ProductId)
    ? (rawProduct as ProductId)
    : null
  // 알 수 없는 product 쿼리는 필터 미적용이 아니라 0건으로 처리해야 사용자가 오타를 알아챈다.
  const unknownProduct = rawProduct !== null && rawProduct !== "" && activeProduct === null

  const filtered = useMemo(() => {
    if (unknownProduct) return []
    return entries.filter(
      (e) => activeProduct === null || e.meta.product === activeProduct,
    )
  }, [entries, activeProduct, unknownProduct])

  const onProductClick = useCallback(
    (product: ProductId | null) => {
      const next = activeProduct === product ? null : product
      const qs = withParam(searchParams, "product", next)
      router.replace(`${pathname}${qs}`, { scroll: false })
    },
    [activeProduct, pathname, router, searchParams],
  )

  const chipRow: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "32px",
  }
  const list: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  }
  const empty: CSSProperties = {
    border: "var(--border-w) solid var(--line)",
    boxShadow: "var(--shadow-sm)",
    padding: "32px 24px",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    color: "var(--muted)",
    background: "var(--surface)",
    textAlign: "center",
  }

  function chipStyle(product: ProductId | null): CSSProperties {
    const active = product === activeProduct
    return {
      fontSize: "11px",
      fontWeight: 600,
      fontFamily: "var(--font-mono)",
      padding: "5px 12px",
      border: "1px solid var(--line)",
      background: active ? "var(--accent)" : "var(--bg)",
      color: active ? "var(--accent-ink)" : "var(--ink)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      cursor: "pointer",
    }
  }

  return (
    <div>
      <div style={chipRow} role="group" aria-label="제품 필터">
        <button type="button" onClick={() => onProductClick(null)} style={chipStyle(null)}>
          전체
        </button>
        {productIds.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onProductClick(id)}
            style={chipStyle(id)}
          >
            {PRODUCTS[id]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={empty}>해당하는 업데이트가 없습니다.</p>
      ) : (
        <div style={list}>
          {filtered.map((e) => (
            <UpdateEntry key={e.meta.slug} meta={e.meta} content={e.content} />
          ))}
        </div>
      )}
    </div>
  )
}
