import { ImageResponse } from "next/og"
import { getSiteUrl } from "@/lib/siteUrl"

// Per-page OG card for /diagnosis — overrides the site-wide default so social
// previews surface the self-assessment hook (7 areas × 21 questions).
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "A'Im Scan — 1인 기업 자가진단 · 7영역 21문항"

const DISPLAY_URL = `${getSiteUrl().replace(/^https?:\/\//, "")}/diagnosis`

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
            A&apos;IM SCAN v0.1
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
              lineHeight: 1.02,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            1인 기업 자가진단
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
            7영역 × 3문항 = 21문항 · 무료 · 3분
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
