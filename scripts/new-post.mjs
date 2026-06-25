#!/usr/bin/env node
// scripts/new-post.mjs
// 새 블로그 글(MDX) 스캐폴드.
//   node scripts/new-post.mjs <slug> ["제목"]
// - src/content/blog/<slug>.mdx 에 BlogFrontmatter 템플릿(published:false) 생성
// - public/blog/<slug>/.gitkeep 생성
// - 중복 slug 거부
import fs from "node:fs"
import path from "node:path"

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, "src", "content", "blog")
const ASSET_ROOT = path.join(ROOT, "public", "blog")

function fail(msg) {
  console.error(`✖ ${msg}`)
  process.exit(1)
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

const [slug, ...titleParts] = process.argv.slice(2)

if (!slug) {
  fail('slug이 필요합니다. 사용법: node scripts/new-post.mjs <slug> ["제목"]')
}
if (!SLUG_RE.test(slug)) {
  fail(
    `slug 형식이 올바르지 않습니다: "${slug}" — 소문자·숫자·하이픈만 (예: my-first-post)`,
  )
}

const title = titleParts.join(" ").trim() || slug
const date = today()

const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`)
if (fs.existsSync(mdxPath)) {
  fail(`이미 존재하는 글입니다: src/content/blog/${slug}.mdx`)
}

const template = `---
title: "${title}"
description: "TODO: 한 줄 설명 (검색·OG·목록에 노출)."
date: "${date}"
tags:
  - TODO
category: "DevLog"
# thumbnail: "/blog/${slug}/cover.png"
# relatedProjects:
#   - some-showroom-slug
published: false
---

## TODO: 첫 섹션

여기에 본문을 작성하세요. \`published: true\` 로 바꾸면 목록·URL·sitemap에 노출됩니다.
`

fs.mkdirSync(CONTENT_DIR, { recursive: true })
fs.writeFileSync(mdxPath, template, "utf8")

const assetDir = path.join(ASSET_ROOT, slug)
fs.mkdirSync(assetDir, { recursive: true })
const gitkeep = path.join(assetDir, ".gitkeep")
if (!fs.existsSync(gitkeep)) fs.writeFileSync(gitkeep, "", "utf8")

console.log(`✓ 블로그 글 스캐폴드 완료: ${slug}`)
console.log("")
console.log("  생성된 파일:")
console.log(`    - src/content/blog/${slug}.mdx`)
console.log(`    - public/blog/${slug}/.gitkeep`)
console.log("")
console.log("  다음 단계:")
console.log(`    1. src/content/blog/${slug}.mdx 의 TODO를 채우세요.`)
console.log("    2. 발행 준비가 되면 published: true 로 바꾸세요.")
console.log("    3. npm run build 로 검증 후 커밋하세요.")
