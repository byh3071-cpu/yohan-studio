import { ImageResponse } from "next/og"
import { getSiteUrl } from "@/lib/siteUrl"

// Shared renderer for the editorial OG cards (brutalist border, brand eyebrow,
// big headline with an orange period, dark URL badge). Every static route's
// opengraph-image.tsx delegates here so the layout never drifts across pages.
// /vhk keeps its own card because its footer shows an install command, not a URL.

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

type OgCardOptions = {
  /** Short uppercase label shown in the top-right black chip. */
  badge: string
  /** Headline text. An orange period is appended automatically. */
  title: string
  /** Sub-headline line below the title. */
  subtitle: string
  /** Path appended to the canonical origin for the footer URL badge (e.g. "/blog"). */
  path?: string
  /** Override headline size for long titles. Defaults to 92px. */
  titleSize?: number
}

export function renderOgCard({ badge, title, subtitle, path = "", titleSize = 92 }: OgCardOptions) {
  const displayUrl = `${getSiteUrl().replace(/^https?:\/\//, "")}${path}`

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
        {/* Top row: brand + badge */}
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
            {badge}
          </span>
        </div>

        {/* Center: headline + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: `${titleSize}px`,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
              lineHeight: 1.02,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {title}
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
            {subtitle}
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
          <span>{displayUrl}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
