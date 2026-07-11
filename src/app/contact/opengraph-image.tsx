import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 문의하기"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · CONTACT",
      badge: "48시간 회신",
      title: "연락하기.",
      sub: "협업 · 견적 · 강연 · 피드백 · 잡담, 무엇이든.",
    }),
    OG_SIZE,
  )
}
