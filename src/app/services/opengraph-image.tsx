import { ImageResponse } from "next/og"
import { getSiteUrl } from "@/lib/siteUrl"

// Per-page OG card for /services — overrides the site-wide default so social
// previews show the offer ladder instead of the generic brand card.
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "요한 스튜디오 서비스 — 리포트 · 템플릿 · 빌드"

const DISPLAY_URL = `${getSiteUrl().replace(/^https?:\/\//, "")}/services`

export default function Image() {
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6B6357",
            }}
          >
            YOHAN STUDIO
          </span>
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
            SERVICES
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
              lineHeight: 1,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            서비스
            <span style={{ color: "#FF5C28" }}>.</span>
          </div>
          <div
            style={{
              fontSize: "40px",
              fontWeight: 800,
              color: "#2B2723",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            진단 리포트 · OS 템플릿 · 함께 짓는 빌드
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: "#0A0A0A",
            color: "#F4F1EA",
            padding: "20px 28px",
            boxShadow: "6px 6px 0 #FF5C28",
            fontSize: "26px",
            fontFamily: "monospace",
            fontWeight: 600,
          }}
        >
          <span style={{ color: "#FF5C28" }}>→</span>
          <span>{DISPLAY_URL}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
