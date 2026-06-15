import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/components/seo/ogCard"

// Per-page OG card for /diagnosis — overrides the site-wide default so social
// previews surface the self-assessment hook (7 areas × 21 questions).
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "A'Im Scan — 1인 기업 자가진단 · 7영역 21문항"

export default function Image() {
  return renderOgCard({
    badge: "A'IM SCAN v0.1",
    title: "1인 기업 자가진단",
    subtitle: "7영역 × 3문항 = 21문항 · 무료 · 3분",
    path: "/diagnosis",
    titleSize: 84,
  })
}
