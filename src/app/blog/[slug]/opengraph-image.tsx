import { ImageResponse } from "next/og"
import { getPostMeta } from "@/lib/blog"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const meta = getPostMeta(slug)

  const title = meta?.title ?? "요한 스튜디오"
  const category = meta?.category ?? ""
  const date = meta?.date ?? ""
  const titleFontSize =
    title.length > 42 ? 38 : title.length > 32 ? 44 : title.length > 24 ? 52 : 64

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#F4F1EA",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          border: "3px solid #0A0A0A",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6B6357",
            }}
          >
            YOHAN STUDIO
          </span>
          {category && (
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#FF5C28",
                background: "#0A0A0A",
                padding: "6px 14px",
              }}
            >
              {category}
            </span>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: titleFontSize,
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            color: "#0A0A0A",
            maxWidth: "960px",
          }}
        >
          {title}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1.5px solid #0A0A0A",
            paddingTop: "20px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "#6B6357",
            }}
          >
            {date}
          </span>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#FF5C28",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: 900,
                color: "#0A0A0A",
              }}
            >
              Y
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
