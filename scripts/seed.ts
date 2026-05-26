/**
 * scripts/seed.ts — studio_products 테스트 상품 시드
 *
 * 사용:  npx tsx scripts/seed.ts
 *
 * - .env.local 자동 로드 (수동 파싱, dotenv 의존 없음)
 * - service_role 키 사용 → RLS 우회하여 INSERT
 * - slug 기준 upsert → 여러 번 실행해도 중복 안 생김
 */

import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

import { createClient } from "@supabase/supabase-js"

import type { Database } from "../src/types/database"

// ---------- .env.local 수동 로드 ----------
function loadDotenv(file: string) {
  const path = resolve(process.cwd(), file)
  if (!existsSync(path)) return
  const text = readFileSync(path, "utf8")
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith("#")) continue
    const eq = line.indexOf("=")
    if (eq < 0) continue
    const key = line.slice(0, eq).trim()
    let val = line.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!(key in process.env)) {
      process.env[key] = val
    }
  }
}

loadDotenv(".env.local")
loadDotenv(".env")

// ---------- env 검증 ----------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "[seed] 누락된 환경변수: NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY",
  )
  console.error("[seed] .env.local 확인 후 다시 실행하세요.")
  process.exit(1)
}

// ---------- 시드 데이터 ----------
type ProductInsert = Database["public"]["Tables"]["studio_products"]["Insert"]

const products: ProductInsert[] = [
  {
    slug: "yohan-os-lite",
    name: "요한 OS 라이트 템플릿",
    description:
      "1인 기업가의 일·프로젝트·지식을 한 곳에서 관리하는 Notion 운영체계 라이트 버전. 즉시 복제해 사용 가능한 11개 핵심 데이터베이스 + 대시보드 포함.",
    price_cents: 990,
    currency: "KRW",
    product_type: "template",
    stripe_price_id: "prod_UaVleZMqIIwMh7",
    active: true,
    metadata: { highlights: ["Notion 템플릿", "11 DB", "대시보드"] },
  },
  {
    slug: "vibe-coding-prompts",
    name: "바이브코딩 프롬프트 팩",
    description:
      "Claude Code · Cursor · Codex 실전 운영에 바로 쓰는 프롬프트 50개 모음. 기획·구현·디버깅·리팩터·문서화 5단계 워크플로우 커버.",
    price_cents: 590,
    currency: "KRW",
    product_type: "prompt",
    stripe_price_id: "prod_UaVl5hn1ZEC2Ca",
    active: true,
    metadata: { highlights: ["프롬프트 50개", "5단계 워크플로우"] },
  },
  {
    slug: "n8n-workflow-bundle",
    name: "n8n 자동화 워크플로우 번들",
    description:
      "콘텐츠 발행·고객 응대·리포트 자동화를 위한 n8n 워크플로우 JSON 번들. import 한 번으로 즉시 가동 가능한 5종 + 가이드 문서.",
    price_cents: 1990,
    currency: "KRW",
    product_type: "automation",
    stripe_price_id: "prod_UaVl8V3SnluBAD",
    active: true,
    metadata: { highlights: ["워크플로우 5종", "import JSON", "가이드 PDF"] },
  },
]

// 이전 시드에서 만든 slug — 새 slug로 갈아엎기 위해 정리
const obsoleteSlugs = [
  "yohan-os-lite-template",
  "vibecoding-prompt-pack",
  "n8n-automation-workflow",
]

// ---------- 실행 ----------
async function main() {
  const supabase = createClient<Database>(SUPABASE_URL!, SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  // 1) 옛 slug 정리 (구매 row가 product_id로 잡고 있으면 FK 제약으로 거부됨 → 그땐 그냥 무시)
  const { error: cleanupErr } = await supabase
    .from("studio_products")
    .delete()
    .in("slug", obsoleteSlugs)
  if (cleanupErr) {
    console.warn(`[seed] 옛 slug 정리 스킵: ${cleanupErr.message}`)
  } else {
    console.log(`[seed] 옛 slug 정리 완료: ${obsoleteSlugs.join(", ")}`)
  }

  // 2) 새 시드 upsert
  console.log(`[seed] ${products.length}개 상품 upsert 시작…`)

  const { data, error } = await supabase
    .from("studio_products")
    .upsert(products, { onConflict: "slug" })
    .select("id, slug, name, price_cents, product_type, stripe_price_id, active")

  if (error) {
    console.error("[seed] 실패:", error.message)
    process.exit(1)
  }

  console.table(data)
  console.log(`[seed] 완료. localhost:3050/store 에서 확인하세요.`)
}

main().catch((err) => {
  console.error("[seed] 예외:", err)
  process.exit(1)
})
