import type { CSSProperties } from "react"
import { services } from "@/data/services"
import { ServiceCard } from "./ServiceCard"

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
  alignItems: "stretch",
}

const note: CSSProperties = {
  marginTop: "32px",
  padding: "20px 24px",
  border: "1px dashed var(--muted-2)",
  background: "var(--surface)",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  lineHeight: 1.65,
  color: "var(--muted)",
}

export function PricingSection({ contactUrl }: { contactUrl: string }) {
  return (
    <>
      <div style={grid}>
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} contactUrl={contactUrl} />
        ))}
      </div>
      <p style={note}>
        ※ 가격은 범위로 표시되며 최종 견적은 1:1 협의로 확정한다. 결제·전자세금계산서는 별도 발행.
      </p>
    </>
  )
}
