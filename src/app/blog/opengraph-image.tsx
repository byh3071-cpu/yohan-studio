import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 블로그"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · BLOG",
      badge: "글",
      title: "블로그.",
      sub: "바이브코딩·AI 에이전트·1인 기업 운영의 실전 기록.",
    }),
    OG_SIZE,
  )
}
