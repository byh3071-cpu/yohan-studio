import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 — AI 시대의 1인 기업 운영체계"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO",
      badge: "AI 1인 기업 OS",
      title: "AI 시대의 1인 기업 운영체계.",
      sub: "진단으로 빈 곳을 찾고, 템플릿으로 메우고, 같이 짓는다.",
    }),
    OG_SIZE,
  )
}
