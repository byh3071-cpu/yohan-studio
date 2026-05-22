import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"
import { loadSummaryReport } from "@/lib/qa/loadReport"
import { QaEmpty } from "@/components/qa/QaEmpty"
import { QaHeader } from "@/components/qa/QaHeader"
import { QaHotspots } from "@/components/qa/QaHotspots"
import { QaIssueAggregateTable } from "@/components/qa/QaIssueAggregateTable"
import { QaLinkPanel } from "@/components/qa/QaLinkPanel"
import { QaRouteGrid } from "@/components/qa/QaRouteGrid"

export const metadata: Metadata = {
  title: "QA Report (admin)",
  description: "Internal Playwright QA report viewer.",
  robots: { index: false, follow: false, nocache: true },
}

export const dynamic = "force-dynamic"

export default async function QaAdminPage() {
  const summary = await loadSummaryReport()

  const section: CSSProperties = {
    background: "var(--bg)",
    padding: "48px 24px 96px",
    borderBottom: "var(--border-w) solid var(--line)",
    minHeight: "100vh",
  }
  const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }
  const back: CSSProperties = {
    display: "inline-block",
    marginBottom: "24px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "var(--accent)",
  }

  return (
    <section style={section}>
      <div style={inner}>
        <Link href="/" style={back}>
          ← HOME
        </Link>
        {summary ? (
          <>
            <QaHeader
              totals={summary.totals}
              baseUrl={summary.baseUrl}
              createdAt={summary.createdAt}
              sourceCreatedAt={summary.sourceCreatedAt}
            />
            <QaIssueAggregateTable aggregates={summary.issueAggregates} />
            <QaHotspots hotspots={summary.hotspots} />
            <QaRouteGrid routes={summary.routes} />
            <QaLinkPanel
              storeLinks={summary.storeLinks}
              externalLinks={summary.externalLinks}
              missingH1={summary.missingH1}
            />
          </>
        ) : (
          <QaEmpty />
        )}
      </div>
    </section>
  )
}
