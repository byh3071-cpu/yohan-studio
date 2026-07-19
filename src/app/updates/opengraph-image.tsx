import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 업데이트"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · UPDATES",
      badge: "릴리즈 노트",
      title: "업데이트.",
      sub: "SnapContext·VHK — 모든 버전의 변경 사항 기록.",
    }),
    OG_SIZE,
  )
}
