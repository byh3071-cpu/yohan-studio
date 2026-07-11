import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "A'Im Scan — 1인 기업 자가진단"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · A'IM SCAN",
      badge: "21문항 진단",
      title: "1인 기업 자가진단.",
      sub: "7개 영역·21문항으로 운영 체계의 빈 곳을 찾는다.",
    }),
    OG_SIZE,
  )
}
