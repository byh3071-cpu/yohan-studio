#!/usr/bin/env node
// scripts/new-project.mjs
// 새 쇼룸 프로젝트(MDX) 스캐폴드.
//   node scripts/new-project.mjs <slug> ["제목"]
// - src/content/showroom/<slug>.mdx 에 ShowroomProject frontmatter 템플릿 생성
// - public/showroom/<slug>/.gitkeep 생성
// - 중복 slug 거부
import fs from "node:fs"
import path from "node:path"

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, "src", "content", "showroom")
const ASSET_ROOT = path.join(ROOT, "public", "showroom")

function fail(msg) {
  console.error(`✖ ${msg}`)
  process.exit(1)
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

const [slug, ...titleParts] = process.argv.slice(2)

if (!slug) {
  fail('slug이 필요합니다. 사용법: node scripts/new-project.mjs <slug> ["제목"]')
}
if (!SLUG_RE.test(slug)) {
  fail(
    `slug 형식이 올바르지 않습니다: "${slug}" — 소문자·숫자·하이픈만 (예: my-cool-project)`,
  )
}

const title = titleParts.join(" ").trim() || slug
const date = today()

const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`)
if (fs.existsSync(mdxPath)) {
  fail(`이미 존재하는 프로젝트입니다: src/content/showroom/${slug}.mdx`)
}

const template = `---
title: "${title}"
category: "Vibe Coding"
summary: "TODO: 한 줄 요약 (검색·OG·카드에 노출)."
problem: "TODO: 어떤 문제를 풀었나."
solution: "TODO: 어떻게 풀었나."
result: "TODO: 결과·효과."
learned: "TODO: 배운 점."
stack:
  - TODO
year: "${date.slice(0, 4)}"
dateCreated: "${date}"
keywords:
  - TODO
featured: false
# demo: "https://example.com"
# github: "https://github.com/USER/REPO"
# image: "/showroom/${slug}/cover.png"
# imageAlt: "TODO: 대표 이미지 설명"
# relatedPosts:
#   - some-blog-slug
faq:
  - question: "TODO: 자주 묻는 질문"
    answer: "TODO: 답변"
---

<!-- 선택: 자유 빌드로그 본문. 비워두면 정형 섹션(문제/해결/결과)만 렌더됩니다. -->
`

fs.mkdirSync(CONTENT_DIR, { recursive: true })
fs.writeFileSync(mdxPath, template, "utf8")

const assetDir = path.join(ASSET_ROOT, slug)
fs.mkdirSync(assetDir, { recursive: true })
const gitkeep = path.join(assetDir, ".gitkeep")
if (!fs.existsSync(gitkeep)) fs.writeFileSync(gitkeep, "", "utf8")

console.log(`✓ 쇼룸 프로젝트 스캐폴드 완료: ${slug}`)
console.log("")
console.log("  생성된 파일:")
console.log(`    - src/content/showroom/${slug}.mdx`)
console.log(`    - public/showroom/${slug}/.gitkeep`)
console.log("")
console.log("  다음 단계:")
console.log(`    1. src/content/showroom/${slug}.mdx 의 TODO를 채우세요.`)
console.log(`    2. category는 SHOWROOM_CATEGORIES 중 하나여야 합니다`)
console.log(
  "       (Vibe Coding / Notion OS / Automation / AI Workflow / Widget / Build Log / Creative).",
)
console.log(`    3. 대표 이미지는 public/showroom/${slug}/ 에 넣고 image 필드를 켜세요.`)
console.log("    4. npm run build 로 검증 후 커밋하세요.")
