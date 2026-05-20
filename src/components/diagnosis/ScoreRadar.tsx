import type { CSSProperties } from "react"
import { AREAS, AREA_LABELS_KO, type Area } from "@/data/aimScanQuestions"

const SIZE = 320
const PAD = 56
const CX = SIZE / 2
const CY = SIZE / 2
const R = SIZE / 2 - PAD

function axisPoint(i: number, n: number, radius: number): [number, number] {
  const angle = (Math.PI * 2 * i) / n - Math.PI / 2
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)]
}

const wrap: CSSProperties = {
  width: "100%",
  maxWidth: `${SIZE}px`,
  margin: "0 auto",
}

const svgStyle: CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
}

const labelText: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fill: "var(--ink)",
}

export function ScoreRadar({ byAreaPercent }: { byAreaPercent: Record<Area, number> }) {
  const n = AREAS.length

  const gridLevels = [0.25, 0.5, 0.75, 1]

  const valuePoly = AREAS.map((a, i) => {
    const pct = Math.max(0, Math.min(100, byAreaPercent[a])) / 100
    return axisPoint(i, n, R * pct).join(",")
  }).join(" ")

  return (
    <div style={wrap}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={svgStyle}
        role="img"
        aria-label="영역별 점수 레이더 차트"
      >
        {gridLevels.map((lv, idx) => (
          <polygon
            key={lv}
            points={AREAS.map((_, i) => axisPoint(i, n, R * lv).join(",")).join(" ")}
            fill="none"
            stroke="var(--line-soft)"
            strokeWidth={idx === gridLevels.length - 1 ? 1.5 : 1}
            strokeDasharray={idx === gridLevels.length - 1 ? "0" : "3 3"}
          />
        ))}
        {AREAS.map((_, i) => {
          const [x, y] = axisPoint(i, n, R)
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="var(--line-soft)"
              strokeWidth={1}
            />
          )
        })}
        <polygon
          points={valuePoly}
          fill="var(--accent)"
          fillOpacity={0.25}
          stroke="var(--accent)"
          strokeWidth={2}
        />
        {AREAS.map((a, i) => {
          const [px, py] = axisPoint(i, n, R * (byAreaPercent[a] / 100))
          const [lx, ly] = axisPoint(i, n, R + 18)
          const anchor = lx < CX - 4 ? "end" : lx > CX + 4 ? "start" : "middle"
          return (
            <g key={a}>
              <circle cx={px} cy={py} r={3} fill="var(--accent)" />
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                style={labelText}
              >
                {a}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export { AREA_LABELS_KO }
