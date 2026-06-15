import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/components/seo/ogCard"

// OG card for /open-source.
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "요한 스튜디오 오픈소스 — npm 패키지 · 도구"

export default function Image() {
  return renderOgCard({
    badge: "OPEN SOURCE",
    title: "오픈소스",
    subtitle: "직접 만들어 공개한 npm 패키지 · 도구",
    path: "/open-source",
  })
}
