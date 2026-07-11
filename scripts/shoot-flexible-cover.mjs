// 커버 컷: 원본 익명판에서 전원 출석 풀 배치 후 좌석 맵 중심 16:9 촬영
import { chromium } from "@playwright/test"

const outDir = process.argv[2] ?? "qa-artifacts/flexible"
const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2,
})
await page.goto("https://flexible-seat-randomizer.vercel.app", { waitUntil: "networkidle" })
await page.waitForTimeout(800)
await page.locator('.tab-btn[data-tab="seat"]').click()
await page.waitForTimeout(500)
await page.locator("#btnMix").click()
await page.waitForTimeout(600)
await page.evaluate(() => {
  const map = document.querySelector(".seat-wrapper")
  const rect = map.getBoundingClientRect()
  const top = rect.top + window.scrollY
  window.scrollTo(0, Math.max(0, top - (window.innerHeight - rect.height) / 2))
})
await page.waitForTimeout(400)
await page.screenshot({ path: `${outDir}/cover.png` })
await browser.close()
console.log("cover done")
