#!/usr/bin/env node
// 네이버 발행 파이프라인 도구 (요한 표준 워크플로 v2 — 2026-07-20 확정)
//   pnpm naver -- <slug>                  # 일괄: 변환 → fragment 클립보드 → 글쓰기 열기 (사람 수동용)
//   pnpm naver -- <slug> --step preview   # 변환 + .html 미리보기 열기 (승인 게이트용)
//   pnpm naver -- <slug> --step inject    # 게이트(진솔 슬롯·이미지 200) → 클립보드 → 글쓰기 열기
//   --force: inject 게이트 실패를 경고로 강등
// 이미지: .md 마커 `[이미지 삽입: 설명 | https://…]` → 붙여넣기로 SE 이미지 컴포넌트 자동 삽입.
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import process from "node:process"

// 옵션/positional 분리 파서 (`--step preview`의 --step이 slug로 오인되던 결함 수정)
const rawArgs = process.argv.slice(2).filter((a) => a !== "--")
let slug = null
let step = null
let force = false
for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i]
  if (a === "--step") { step = rawArgs[++i] ?? null; continue }
  if (a.startsWith("--step=")) { step = a.slice(7); continue }
  if (a === "--force") { force = true; continue }
  if (a.startsWith("--")) { console.error(`✖ 알 수 없는 옵션: ${a}`); process.exit(1) }
  if (!slug) slug = a
}
if (!slug || (step && !["preview", "inject"].includes(step))) {
  console.error("사용법: pnpm naver -- <slug> [--step preview|inject] [--force]")
  process.exit(1)
}

const root = process.cwd()
const naverDir = path.join(root, "docs", "content", "naver")
const mdPath = path.join(naverDir, `${slug}.md`)
const htmlPath = path.join(naverDir, `${slug}.html`)
const fragmentPath = path.join(naverDir, `${slug}.fragment.html`)

if (!fs.existsSync(mdPath)) {
  console.error(`✖ 원고 없음: docs/content/naver/${slug}.md`)
  console.error(`  먼저: pnpm blog:naver -- ${slug}  →  naver-structure.md 규칙대로 편집`)
  process.exit(1)
}

function convert() {
  execFileSync(process.execPath, [path.join(root, "skills", "yohan-dual-blog", "scripts", "naver-to-html.mjs"), slug], {
    stdio: "inherit",
  })
}

function openInBrowser(target) {
  execFileSync("cmd.exe", ["/c", "start", "", target], { stdio: "ignore" })
}

function gate(name, ok, detail) {
  if (ok) return
  if (force) {
    console.warn(`⚠ [게이트 경고·force 통과] ${name}: ${detail}`)
    return
  }
  console.error(`✖ [게이트 실패] ${name}: ${detail}`)
  console.error("  (의도적 우회는 --force)")
  process.exit(1)
}

async function checkImages(fragmentHtml) {
  const srcs = [...fragmentHtml.matchAll(/<img src="([^"]+)"/g)].map((m) => m[1])
  for (const src of srcs) {
    try {
      const res = await fetch(src, { method: "HEAD" })
      gate("이미지 HEAD 200", res.ok, `${src} → ${res.status}`)
      if (res.ok) console.log(`  ✓ 이미지 200: ${src}`)
    } catch (e) {
      gate("이미지 HEAD 200", false, `${src} → ${e.message}`)
    }
  }
  return srcs.length
}

async function inject() {
  const fragmentHtml = fs.readFileSync(fragmentPath, "utf8")
  gate("진솔 슬롯 잔존", !fragmentHtml.includes("여기 네 말"), "플레이스홀더가 남아 있다 — 채팅으로 답 받아 원고에 반영 먼저")
  const n = await checkImages(fragmentHtml)
  console.log(`게이트 통과 (이미지 ${n}개)`)
  execFileSync("powershell.exe", [
    "-NoProfile", "-ExecutionPolicy", "Bypass",
    "-File", path.join(root, "scripts", "Set-ClipboardHtmlUtf8.ps1"),
    "-Path", fragmentPath,
  ], { stdio: "inherit" })
  openInBrowser("https://blog.naver.com/yohan3071?Redirect=Write")
  console.log("")
  console.log("✓ 주입 준비 완료 — 남은 사람 몫:")
  console.log("  1. (자동 주입이면 Claude가 진행) 수동이면 본문 클릭 → Ctrl+V")
  console.log("  2. 발행 패널에서 태그·카테고리 확인 → 최종 발행 클릭")
  console.log("  3. 발행 URL을 Claude에 전달 → 풀 검증 + 허브 기록")
}

if (step === "preview") {
  convert()
  openInBrowser(htmlPath)
  console.log("✓ 미리보기 열림 — 승인하면 --step inject 로 진행")
} else if (step === "inject") {
  // md가 SoT — stale fragment로 주입하는 사고 방지 위해 항상 재변환 (2026-07-20 실증)
  convert()
  await inject()
} else {
  convert()
  await inject()
}
