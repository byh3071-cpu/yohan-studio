import fs from "node:fs/promises"
import path from "node:path"
import { buildSummary } from "../src/lib/qa/summary"
import type { QaReport } from "../src/lib/qa/types"

const ARTIFACTS_DIR = path.join(process.cwd(), "qa-artifacts")
const RAW_PATH = path.join(ARTIFACTS_DIR, "report.raw.json")
const SUMMARY_PATH = path.join(ARTIFACTS_DIR, "report.summary.json")

async function main(): Promise<void> {
  let raw: QaReport
  try {
    const content = await fs.readFile(RAW_PATH, "utf8")
    raw = JSON.parse(content) as QaReport
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    console.error(`[qa:summarize] raw report 읽기 실패: ${RAW_PATH}`)
    console.error(`  -> ${reason}`)
    console.error(`  먼저 \`npm run qa:test\`를 실행해서 report.raw.json을 생성하세요.`)
    process.exit(1)
  }

  const summary = buildSummary(raw)
  await fs.mkdir(ARTIFACTS_DIR, { recursive: true })
  await fs.writeFile(SUMMARY_PATH, JSON.stringify(summary, null, 2) + "\n", "utf8")

  const rel = path.relative(process.cwd(), SUMMARY_PATH)
  const { passed, warnings, failed, totalRoutes } = summary.totals
  console.log(`[qa:summarize] ${rel} 생성 완료`)
  console.log(`  routes: ${totalRoutes} (pass ${passed} / warn ${warnings} / fail ${failed})`)
  console.log(`  issue codes: ${summary.issueAggregates.length}`)
  if (summary.issueAggregates.length > 0) {
    const top = summary.issueAggregates.slice(0, 5)
    for (const agg of top) {
      console.log(`    - [${agg.severity}] ${agg.code}: ${agg.count}건`)
    }
  }
  console.log(`  /store links: ${summary.storeLinks.length} unique href`)
  console.log(`  external links: ${summary.externalLinks.length} unique href`)
  if (summary.missingH1.length > 0) {
    const list = summary.missingH1.map((r) => `${r.path}@${r.viewport}`).join(", ")
    console.log(`  missing h1: ${list}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
