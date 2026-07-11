import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 서비스"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · SERVICES",
      badge: "함께 만든다",
      title: "서비스.",
      sub: "리포트 → 템플릿 → 빌드, 세 가지 깊이로 운영체계를 짓는다.",
    }),
    OG_SIZE,
  )
}
