// 익명화한 원본 앱 사본의 UI 확인용 촬영
// 사용: node scripts/shoot-original-app.mjs <html경로> <outDir>
import { chromium } from "@playwright/test"
import path from "node:path"

const [htmlPath, outDir] = process.argv.slice(2)
const url = "file:///" + path.resolve(htmlPath).replace(/\\/g, "/")

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2,
})
await page.goto(url, { waitUntil: "networkidle" })
await page.waitForTimeout(1200)
await page.screenshot({ path: `${outDir}/original-viewport.png` })
await page.screenshot({ path: `${outDir}/original-full.png`, fullPage: true })
await browser.close()
console.log("done")
