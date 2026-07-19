#!/usr/bin/env node
// 네이버 발행 원커맨드: pnpm naver -- <slug>
// 하는 일: ① .md → .html + .fragment.html 변환 ② fragment를 CF_HTML(UTF-8)로 클립보드 적재
//          ③ 네이버 글쓰기 열기 → 사람은 [본문 클릭 → Ctrl+V → 진솔 슬롯 채우기 → 발행]만.
// 이미지: .md 마커에 라이브 URL(`[이미지 삽입: 설명 | https://…]`)이 있으면 붙여넣기로 자동 삽입됨.
// 전제: docs/content/naver/<slug>.md 존재 (없으면 pnpm blog:naver -- <slug> 로 초안 생성 후
//        skills/yohan-dual-blog/references/naver-structure.md 규칙대로 편집).
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const slug = process.argv.slice(2).find((a) => a !== "--")
if (!slug) {
  console.error("사용법: pnpm naver -- <slug>")
  process.exit(1)
}
const root = process.cwd()
const mdPath = path.join(root, "docs", "content", "naver", `${slug}.md`)
if (!fs.existsSync(mdPath)) {
  console.error(`✖ 원고 없음: docs/content/naver/${slug}.md`)
  console.error(`  먼저: pnpm blog:naver -- ${slug}  →  naver-structure.md 규칙대로 편집`)
  process.exit(1)
}

// ① 변환
execFileSync(process.execPath, [path.join(root, "skills", "yohan-dual-blog", "scripts", "naver-to-html.mjs"), slug], {
  stdio: "inherit",
})

// 진솔 슬롯 존재 게이트 (naver-structure 고정 규율 — 없으면 경고만, 차단은 안 함)
const md = fs.readFileSync(mdPath, "utf8")
if (!md.includes("[여기 네 말:")) {
  console.warn("⚠ 진솔 슬롯([여기 네 말: …])이 없다 — naver-structure.md 규율 확인")
}

// ② 클립보드 (fragment만! 전체 .html은 미리보기 전용)
const fragment = path.join(root, "docs", "content", "naver", `${slug}.fragment.html`)
execFileSync("powershell.exe", [
  "-NoProfile", "-ExecutionPolicy", "Bypass",
  "-File", path.join(root, "scripts", "Set-ClipboardHtmlUtf8.ps1"),
  "-Path", fragment,
], { stdio: "inherit" })

// ③ 네이버 글쓰기 열기
execFileSync("cmd.exe", ["/c", "start", "", "https://blog.naver.com/yohan3071?Redirect=Write"], { stdio: "ignore" })

console.log("")
console.log("✓ 준비 완료 — 남은 건 사람 몫 4가지:")
console.log("  1. 에디터 본문 클릭 → Ctrl+V (서식·구분선·이미지까지 자동)")
console.log("  2. ✍ 형광펜 [여기 네 말] 슬롯을 네 말로 교체")
console.log("  3. 제목 입력 → 발행 → 태그 등록 (변환 로그의 태그 목록 참고)")
console.log("  4. 발행 URL을 Claude에 전달 → 콘텐츠 허브 기록")
