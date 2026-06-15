import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/components/seo/ogCard"

// Site-wide default OG image. Inherited by every route that does not define its
// own opengraph-image (home, /blog, /showroom, /services, /diagnosis, /design,
// /open-source, /contact, /store ...). Next.js also reuses this for twitter:image.
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "요한 스튜디오 — 바이브코더 · AI 기반 1인 기업"

export default function Image() {
  return renderOgCard({
    badge: "AI 1인 기업 OS",
    title: "요한 스튜디오",
    subtitle: "바이브코더 · AI 기반 1인 기업",
  })
}
