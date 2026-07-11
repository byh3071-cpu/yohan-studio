// 공용 OG 카드 (1200×630, Editorial × Soft Brutalism).
// opengraph-image.tsx 라우트들이 new ImageResponse(brandOgCard({...}))로 사용한다.
// 스타일 원본: src/app/showroom/[slug]/opengraph-image.tsx

export const OG_SIZE = { width: 1200, height: 630 }

export function brandOgCard({
  eyebrow,
  badge,
  title,
  sub,
}: {
  eyebrow: string
  badge: string
  title: string
  sub?: string
}) {
  const titleFontSize =
    title.length > 36 ? 40 : title.length > 28 ? 48 : title.length > 20 ? 56 : 64

  return (
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
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6B6357",
          }}
        >
          {eyebrow}
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          borderTop: "1.5px solid #0A0A0A",
          paddingTop: "20px",
        }}
      >
        {sub ? (
          <span
            style={{
              fontSize: "22px",
              fontWeight: 500,
              lineHeight: 1.4,
              color: "#2B2723",
              maxWidth: "900px",
            }}
          >
            {sub.length > 120 ? `${sub.slice(0, 117)}…` : sub}
          </span>
        ) : null}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
            <span style={{ fontSize: "20px", fontWeight: 900, color: "#0A0A0A" }}>Y</span>
          </div>
        </div>
      </div>
    </div>
  )
}
