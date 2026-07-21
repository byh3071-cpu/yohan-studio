// 요한 브랜드 이모지 solid PNG 생성 — 외부 채널(네이버 등)용.
//
// 웹은 EmojiIcon이 SVG로 직접 렌더하지만, 네이버 SE ONE은 인라인 style을 제거하고
// 이미지를 정사각·baseline으로 강제하므로 SVG를 못 쓴다 → PNG로 구워야 한다.
//
// SoT: src/data/emojiSet.json (웹과 같은 파일을 읽는다 — 매핑 이중 관리 금지)
// 사용: node scripts/gen-emoji.mjs
//
// 새 개념 추가 절차:
//  1) 기성 세트에서 고를 때 — https://api.iconify.design/<set>.json?icons=<name> 으로 body를 받아
//     path d만 뽑아 emojiSet.json에 넣는다. 라이선스는 MIT/Apache/ISC/CC0만.
//  2) 직접 만들 때 — 흑백 PNG를 준비해 potrace로 벡터화한다(일회성이라 상시 의존성엔 두지 않는다):
//       npm i -D potrace sharp
//       sharp로 trim → 정사각 캔버스(여백 6%) → potrace.trace(threshold 128, turdSize 8)
//       → path d 추출 → viewBox 32×32로 스케일 → fillRule:"evenodd"와 함께 emojiSet.json에 기록
//     (AI 아이콘이 이 경로로 만들어졌다 — gpt-image-2 생성 → 위 파이프라인)
//  3) node scripts/gen-emoji.mjs 로 PNG 재생성 → 네이버용 URL이 갱신된다.
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
