import type { CSSProperties } from "react"
import type { Metadata } from "next"

import { ProductCard } from "@/components/store/ProductCard"
import { supabase } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Store — Yohan Studio",
  description:
    "AI 시대 1인 기업가를 위한 템플릿·도구·강의 스토어. 바이브코딩 결과물을 바로 사용 가능한 형태로 제공합니다.",
}

export const revalidate = 60

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const head: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "end",
  gap: "20px",
  paddingBottom: "32px",
  marginBottom: "40px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "12px",
}

const title: CSSProperties = {
  fontSize: "clamp(40px, 6vw, 64px)",
  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  margin: 0,
}

const accentMark: CSSProperties = { color: "var(--accent)" }

const count: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--ink)",
  border: "1.5px solid var(--line)",
  padding: "8px 14px",
  background: "var(--bg)",
  letterSpacing: "0.04em",
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

const errorBox: CSSProperties = {
  ...empty,
  color: "var(--accent)",
  borderColor: "var(--accent)",
}

export default async function StorePage() {
  const { data: products, error } = await supabase
    .from("studio_products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })

  return (
    <section style={section}>
      <div style={inner}>
        <div style={head}>
          <div>
            <div style={eyebrow}>{"// STORE — 템플릿·도구·강의"}</div>
            <h1 style={title}>
              스토어<span style={accentMark}>.</span>
            </h1>
          </div>
          <div style={count}>{products?.length ?? 0} ITEMS</div>
        </div>

        {error ? (
          <div style={errorBox}>상품 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</div>
        ) : !products || products.length === 0 ? (
          <div style={empty}>곧 첫 상품이 등록됩니다. 조금만 기다려주세요.</div>
        ) : (
          <div style={grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
