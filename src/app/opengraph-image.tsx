import { ImageResponse } from "next/og"

// Site-wide default OG image. Inherited by every route that does not define
// its own opengraph-image (home, /blog, /showroom, /services, /diagnosis,
// /design, /open-source, /contact, /store ...). Next.js also reuses this for
// twitter:image. Dynamic detail pages and /vhk override it with their own.
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "요한 스튜디오 — 바이브코더 · AI 기반 1인 기업"

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
            AI 1인 기업 OS
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "92px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
              lineHeight: 1,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            요한 스튜디오
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
            바이브코더 · AI 기반 1인 기업
          </div>
        </div>

        {/* Bottom: url badge */}
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
          <span>yohan-studio.vercel.app</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
