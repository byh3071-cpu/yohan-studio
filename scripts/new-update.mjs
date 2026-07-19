#!/usr/bin/env node
// scripts/new-update.mjs
// /updates 릴리즈 노트(MDX) 스캐폴드 — 이원화 운영의 "모든 버전 5분 기록" 쪽 도구.
//   node scripts/new-update.mjs <product> <version> ["한 줄 요약"]
//   예: node scripts/new-update.mjs snapcontext 0.4.0 "원격 캡처 트리거"
// - src/content/updates/<product>-<version>.mdx 생성 (published:false)
// - product는 src/lib/updatesShared.ts의 PRODUCTS 화이트리스트와 대조
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, "src", "content", "updates")
const SHARED = path.join(ROOT, "src", "lib", "updatesShared.ts")
const VERSION_RE = /^\d+\.\d+\.\d+$/

function fail(msg) {
  console.error(`✖ ${msg}`)
  process.exit(1)
}

// updatesShared.ts의 PRODUCTS 키를 소스에서 직접 파싱 — 목록이 코드와 어긋나지 않게.
function loadProductIds() {
  const src = fs.readFileSync(SHARED, "utf8")
  const block = src.match(/PRODUCTS = \{([\s\S]*?)\}/)
  if (!block) fail("updatesShared.ts에서 PRODUCTS를 찾지 못했습니다.")
  return [...block[1].matchAll(/^\s*([a-z0-9]+):/gm)].map((m) => m[1])
}

const [product, version, ...titleParts] = process.argv.slice(2)
if (!product || !version) {
  fail('사용법: node scripts/new-update.mjs <product> <version> ["한 줄 요약"]')
}
const products = loadProductIds()
if (!products.includes(product)) {
  fail(`알 수 없는 product: "${product}" — 허용: ${products.join(", ")} (추가는 src/lib/updatesShared.ts PRODUCTS에 먼저)`)
}
if (!VERSION_RE.test(version)) {
  fail(`version 형식 오류: "${version}" — semver 세 자리 (예: 0.4.0), v 접두 없이`)
}

const title = titleParts.join(" ").trim() || "TODO: 한 줄 요약"
const date = new Date().toISOString().slice(0, 10)
const mdxPath = path.join(CONTENT_DIR, `${product}-${version}.mdx`)
if (fs.existsSync(mdxPath)) {
  fail(`이미 존재합니다: src/content/updates/${product}-${version}.mdx`)
}

const template = `---
product: ${product}
version: "${version}"
date: "${date}"
title: "${title}"
types: [NEW]
# blogSlug: 큰-릴리즈면-블로그-글-슬러그   # 이원화: 글 승격 시에만
published: false
---

- **TODO** — 사용자향 언어로 3~10줄. 개발용어는 쉬운 말로 바꾼다.
`

fs.mkdirSync(CONTENT_DIR, { recursive: true })
fs.writeFileSync(mdxPath, template, "utf8")

console.log(`✓ 릴리즈 노트 스캐폴드: src/content/updates/${product}-${version}.mdx`)
console.log("")
console.log("  체크리스트:")
console.log("    1. title·본문 불릿을 사용자향으로 (원장: 해당 제품 changelog)")
console.log("    2. types를 실제 변경 유형으로 (NEW/IMPROVED/FIXED/SECURITY)")
console.log("    3. published: true → pnpm build → /updates에서 항목 개수 육안 확인")
