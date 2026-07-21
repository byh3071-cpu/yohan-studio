// 요한 브랜드 이모지 solid PNG 생성 — 외부 채널(네이버 등)용.
//
// 웹은 EmojiIcon이 SVG로 직접 렌더하지만, 네이버 SE ONE은 인라인 style을 제거하고
// 이미지를 정사각·baseline으로 강제하므로 SVG를 못 쓴다 → PNG로 구워야 한다.
//
// SoT: src/data/emojiSet.json (웹과 같은 파일을 읽는다 — 매핑 이중 관리 금지)
// 사용: node scripts/gen-emoji.mjs
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const data = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "emojiSet.json"), "utf8"))
const outDir = path.join(root, "public", "images", "emoji")
fs.mkdirSync(outDir, { recursive: true })

const SIZE = 128 // 실사용 16~20px의 6~8배 — 축소 시 선명

let n = 0
for (const [concept, icon] of Object.entries(data.emoji)) {
  const rule = icon.fillRule ? ` fill-rule="${icon.fillRule}"` : ""
  const paths = icon.paths.map((d) => `<path d="${d}"${rule}/>`).join("")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" fill="${data.accent}">${paths}</svg>`
  const out = path.join(outDir, `${concept}-solid.png`)
  await sharp(Buffer.from(svg)).resize(SIZE, SIZE).png().toFile(out)
  n++
}
console.log(`solid PNG ${n}개 생성 완료 → public/images/emoji/`)
