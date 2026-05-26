import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "VHK — Your AI Coding Context, Everywhere."

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
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.12em",
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
            CLI · DEVELOPER TOOL
          </span>
        </div>

        {/* Center: title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
              lineHeight: 1,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            VHK
            <span style={{ color: "#FF5C28" }}>.</span>
          </div>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 800,
              color: "#0A0A0A",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Your AI Coding Context,</span>
            <span style={{ fontStyle: "italic" }}>Everywhere.</span>
          </div>
        </div>

        {/* Bottom: install command */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: "#0A0A0A",
            color: "#F4F1EA",
            padding: "20px 28px",
            border: "2px solid #0A0A0A",
            boxShadow: "6px 6px 0 #FF5C28",
            fontSize: "26px",
            fontFamily: "monospace",
            fontWeight: 600,
          }}
        >
          <span style={{ color: "#FF5C28" }}>$</span>
          <span>npm i -g @byh3071/vhk</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
