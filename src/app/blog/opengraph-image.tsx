import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/components/seo/ogCard"

// OG card for the /blog index. Individual posts keep their own dynamic card.
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "요한 스튜디오 블로그 — 개발 · 프로덕트 · 1인 기업"

export default function Image() {
  return renderOgCard({
    badge: "BLOG",
    title: "블로그",
    subtitle: "개발 · 프로덕트 · 1인 기업 이야기",
    path: "/blog",
  })
}
