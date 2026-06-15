import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/components/seo/ogCard"

// OG card for /design (design history page).
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "요한 스튜디오 디자인 히스토리 — v1 → v2 진화"

export default function Image() {
  return renderOgCard({
    badge: "DESIGN",
    title: "디자인 히스토리",
    subtitle: "v1 → v2 진화 · AI 도구 분업 · 로드맵",
    path: "/design",
    titleSize: 84,
  })
}
