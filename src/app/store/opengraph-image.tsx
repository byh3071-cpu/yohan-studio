import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 스토어"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · STORE",
      badge: "템플릿·도구",
      title: "스토어.",
      sub: "바이브코딩 결과물을 바로 쓸 수 있는 형태로.",
    }),
    OG_SIZE,
  )
}
