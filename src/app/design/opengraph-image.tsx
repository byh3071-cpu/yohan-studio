import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 디자인 히스토리"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · DESIGN",
      badge: "V1 → V2",
      title: "디자인 히스토리.",
      sub: "Slate에서 Editorial × Soft Brutalism까지의 진화 기록.",
    }),
    OG_SIZE,
  )
}
