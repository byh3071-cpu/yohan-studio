import { ImageResponse } from "next/og"
import { brandOgCard, OG_SIZE } from "@/components/seo/ogCard"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "요한 스튜디오 오픈소스"

export default function Image() {
  return new ImageResponse(
    brandOgCard({
      eyebrow: "YOHAN STUDIO · OPEN SOURCE",
      badge: "공개한 것들",
      title: "오픈소스.",
      sub: "노션 위젯 10종 · VHK CLI · 노션 미니 템플릿 — 모두 무료.",
    }),
    OG_SIZE,
  )
}
