import type { CSSProperties } from "react"
import { opensourceItems } from "@/data/opensourceItems"
import { OpenSourceCard } from "./OpenSourceCard"

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
  gap: "24px",
}

export function OpenSourceGrid() {
  return (
    <div style={grid}>
      {opensourceItems.map((item) => (
        <OpenSourceCard key={item.slug} item={item} />
      ))}
    </div>
  )
}
