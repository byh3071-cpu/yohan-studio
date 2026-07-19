// 블로그 커버 생성기 — 커버 시리즈 톤(다크 차콜 + 오렌지 소프트 브루탈리즘) 고정.
// 사용: node scripts/gen-cover.mjs <slug> "<영문 컨셉 1~3문장>"
// 출력: public/images/blog/<slug>/cover.png (frontmatter thumbnail로 연결)
// 모델은 OPENAI_IMAGE_MODEL로 재정의 가능 (기본 gpt-image-2 — 2026-07 API 실조회로 확인).
import fs from "node:fs"
import path from "node:path"

const [slug, concept] = process.argv.slice(2)
if (!slug || !concept) {
  console.error('사용법: node scripts/gen-cover.mjs <slug> "<영문 컨셉>"')
  process.exit(1)
}
const key = process.env.OPENAI_API_KEY
if (!key) {
  console.error("OPENAI_API_KEY 필요 (셸 환경변수)")
  process.exit(1)
}

// 시리즈 톤 — yohan-brain 커버 규약. 톤 문구를 바꾸면 발행 커버 전체의 일관성이 깨지므로 고정.
const SERIES_TONE =
  "Editorial illustration, soft brutalism style, deep charcoal background with vivid orange accent, " +
  "flat vector shapes, subtle grainy texture, strong geometric composition, thick borders, hard shadows, " +
  "minimal palette (charcoal, cream, one vivid orange), no text anywhere."

const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2"
const res = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
  body: JSON.stringify({
    model,
    prompt: `${SERIES_TONE} Concept: ${concept}`,
    size: "1536x1024",
    quality: "high",
    n: 1,
  }),
})
if (!res.ok) {
  console.error("API 오류", res.status, (await res.text()).slice(0, 300))
  process.exit(1)
}
const data = await res.json()
const b64 = data.data?.[0]?.b64_json
if (!b64) {
  console.error("이미지 없음", JSON.stringify(data).slice(0, 200))
  process.exit(1)
}
const dir = path.join(process.cwd(), "public", "images", "blog", slug)
fs.mkdirSync(dir, { recursive: true })
const out = path.join(dir, "cover.png")
fs.writeFileSync(out, Buffer.from(b64, "base64"))
console.log(`저장: ${out} (${fs.statSync(out).size.toLocaleString()} bytes, model=${model})`)
