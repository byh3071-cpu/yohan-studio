import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 러닝 로그"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "LEARNING LOG",
      badge: "요한 스튜디오",
      title: "러닝 로그",
      sub: "특강·강연에서 배운 것의 현장 기록",
    }),
    OG_SIZE,
  )
}
