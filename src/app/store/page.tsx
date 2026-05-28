import type { CSSProperties } from "react"
import type { Metadata } from "next"

import { StoreTabs } from "@/components/store/StoreTabs"
import { SiteSearch } from "@/components/search/SiteSearch"
import { getSearchDocuments } from "@/lib/searchData"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/database"

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

const searchHint: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  color: "var(--ink)",
  border: "1.5px solid var(--line)",
  padding: "8px 12px",
  background: "var(--bg)",
  letterSpacing: "0.04em",
  boxShadow: "var(--shadow-sm)",
  whiteSpace: "nowrap",
}

const errorBox: CSSProperties = {
  border: "var(--border-w) solid var(--accent)",
  padding: "48px 24px",
  textAlign: "center",
  color: "var(--accent)",
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  background: "var(--bg)",
}

type ProductRow = Database["public"]["Tables"]["studio_products"]["Row"]

// Placeholder shown only when Supabase returns no rows (env missing or empty table)
// so the Free/Paid tabs have something to demo against during local/preview builds.
const placeholderProducts: ProductRow[] = [
  {
    id: "placeholder-free-1",
    slug: "starter-notion-os",
    name: "Starter Notion OS",
    description: "1인 기업가를 위한 기본 노션 OS 템플릿. Decision · Resource · Review DB 한 세트.",
    price_cents: 0,
    currency: "KRW",
    product_type: "template",
    image_url: null,
    download_url: null,
    stripe_price_id: null,
    active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "placeholder-free-2",
    slug: "vibe-coding-checklist",
    name: "Vibe Coding Checklist",
    description: "Cursor·Claude Code 세팅부터 첫 배포까지 — 30분 안에 끝내는 체크리스트.",
    price_cents: 0,
    currency: "KRW",
    product_type: "ebook",
    image_url: null,
    download_url: null,
    stripe_price_id: null,
    active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "placeholder-paid-1",
    slug: "aim-scan-report-sample",
    name: "A'Im Scan Report (샘플)",
    description: "21문항 진단 리포트의 실제 PDF 샘플. 강·약점 분석 + 30일 처방 구조 미리보기.",
    price_cents: 49000,
    currency: "KRW",
    product_type: "ebook",
    image_url: null,
    download_url: null,
    stripe_price_id: null,
    active: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

async function fetchActiveProducts(): Promise<{ products: ProductRow[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("studio_products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })
    return { products: data, error: error?.message ?? null }
  } catch (e) {
    return { products: null, error: e instanceof Error ? e.message : "unknown" }
  }
}

export default async function StorePage() {
  const { products, error } = await fetchActiveProducts()
  const list: ProductRow[] = products && products.length > 0 ? products : placeholderProducts
  const searchDocs = getSearchDocuments()

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
          <div style={searchHint}>⌘ + K · 사이트 검색</div>
        </div>

        {error ? (
          <div style={errorBox}>상품 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</div>
        ) : (
          <StoreTabs products={list} />
        )}
      </div>
      <SiteSearch docs={searchDocs} />
    </section>
  )
}
