import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/components/seo/ogCard"

// OG card for the /showroom index. Individual projects keep their own dynamic card.
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "요한 스튜디오 쇼룸 — 바이브코딩 결과물"

export default function Image() {
  return renderOgCard({
    badge: "SHOWROOM",
    title: "쇼룸",
    subtitle: "Notion OS · 자동화 · AI 워크플로우 · 빌드로그",
    path: "/showroom",
  })
}
