import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/components/seo/ogCard"

// Per-page OG card for /services — overrides the site-wide default so social
// previews show the offer ladder instead of the generic brand card.
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "요한 스튜디오 서비스 — 리포트 · 템플릿 · 빌드"

export default function Image() {
  return renderOgCard({
    badge: "SERVICES",
    title: "서비스",
    subtitle: "진단 리포트 · OS 템플릿 · 함께 짓는 빌드",
    path: "/services",
    titleSize: 96,
  })
}
