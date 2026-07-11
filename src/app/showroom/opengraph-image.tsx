import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 쇼룸"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · SHOWROOM",
      badge: "만든 것들",
      title: "쇼룸.",
      sub: "AI 시대 1인 기업가의 실험·운영체계·바이브코딩 결과물.",
    }),
    OG_SIZE,
  )
}
