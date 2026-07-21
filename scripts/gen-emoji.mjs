// 요한 브랜드 이모지 chip PNG 생성 — 네이버·외부 채널용 (흰 배경 브랜드 각인).
// 웹(solid 오렌지)은 src/components/blog/mdx/EmojiIcon.tsx 가 emojiSet.ts path로 직접 렌더 → 스크립트 불요.
//
// 방식: Iconify API(api.iconify.design)에서 SVG 취득 → 오렌지 원 + 검정 디테일 chip PNG.
// 라이선스: Material Symbols · MDI 둘 다 Apache-2.0. SoT: src/data/emojiSet.ts EMOJI_LICENSE.
//
// 사용: node scripts/gen-emoji.mjs            # 8개 chip PNG 재생성 (public/images/emoji/)
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

// SoT = src/data/emojiSet.ts 의 BRAND_EMOJI iconify 매핑과 동일 (아이콘 교체 시 양쪽 갱신).
const SET = {
  result: "material-symbols:bar-chart-4-bars",
  // 기호 3종은 MDI 굵은 획 — 원 안에 파낸 형태는 소형에서 뭉개진다(2026-07-21 실측)
  question: "mdi:help",
  idea: "material-symbols:lightbulb",
  success: "mdi:check-bold",
  fail: "mdi:close-thick",
  tool: "material-symbols:settings",
  launch: "material-symbols:rocket",
  security: "material-symbols:lock",
}

const ACCENT = "#FF5C28"
const DETAIL = "#0A0A0A" // chip 디테일 (네이버 흰 배경용). 웹 다크에서 chip 쓸 일이 생기면 흰 변형 추가.
const outDir = path.join(process.cwd(), "public", "images", "emoji")

async function fetchInner(iconify) {
  const [prefix, name] = iconify.split(":")
  const res = await fetch(`https://api.iconify.design/${prefix}/${name}.svg`)
  if (!res.ok) throw new Error(`Iconify ${iconify} → ${res.status}`)
  const svg = await res.text()
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>[\s\S]*$/, "")
  // Material path는 fill="currentColor" — 명시 색으로 치환 (미치환 시 검정 폴백 사고)
  return inner.replace(/fill="currentColor"/g, `fill="${DETAIL}"`)
}

fs.mkdirSync(outDir, { recursive: true })
for (const [concept, iconify] of Object.entries(SET)) {
  const inner = await fetchInner(iconify)
  // 오렌지 원 배경 + 디테일 70% 스케일 중앙
  const chip = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="${ACCENT}"/><g transform="translate(3.6 3.6) scale(0.7)">${inner}</g></svg>`
  const out = path.join(outDir, `${concept}-chip.png`)
  await sharp(Buffer.from(chip)).resize(128, 128).png().toFile(out)
  console.log(`  ✓ ${path.relative(process.cwd(), out)}`)
}
console.log("chip PNG 8개 생성 완료.")
