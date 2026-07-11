// 쇼룸 플렉시블 상세 페이지 렌더 확인용 캡처 (로컬 prod 서버)
import { chromium } from "@playwright/test"

const outDir = process.argv[2] ?? "qa-artifacts/flexible"
const url = "http://localhost:3050/showroom/flexible-seat-randomizer"

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2,
})
await page.goto(url, { waitUntil: "networkidle" })
await page.waitForTimeout(800)
await page.screenshot({ path: `${outDir}/page-hero.png` })

await page.evaluate(() => {
  const headers = [...document.querySelectorAll("h2")]
  headers.find((h) => h.textContent.includes("측정된 결과"))?.scrollIntoView({ block: "start" })
  window.scrollBy(0, -40)
})
await page.waitForTimeout(400)
await page.screenshot({ path: `${outDir}/page-metrics.png` })

const mobile = await browser.newPage({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 2,
})
await mobile.goto(url, { waitUntil: "networkidle" })
await mobile.evaluate(() => {
  const headers = [...document.querySelectorAll("h2")]
  headers.find((h) => h.textContent.includes("측정된 결과"))?.scrollIntoView({ block: "start" })
  window.scrollBy(0, -20)
})
await mobile.waitForTimeout(400)
await mobile.screenshot({ path: `${outDir}/page-metrics-mobile.png` })

await browser.close()
console.log("page shots done")
