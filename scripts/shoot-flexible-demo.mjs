// 익명 데모(flexible-seat-randomizer.vercel.app) 실제 화면 촬영
// 사용: node shoot-demo.mjs <outDir>
import { chromium } from "@playwright/test"

const outDir = process.argv[2] ?? "."
const base = "https://flexible-seat-randomizer.vercel.app"

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2,
})

await page.goto(base, { waitUntil: "networkidle" })

// 1) 메인(출석 입력) 화면
await page.screenshot({ path: `${outDir}/demo-main.png` })

// 2) 자리 섞기 실행 → 결과 화면
await page.getByRole("button", { name: "자리 섞기" }).click()
await page.getByText("배치 결과").scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await page.screenshot({ path: `${outDir}/demo-result.png` })

// 2-1) 커버 전용 컷 — 배치 결과 섹션을 16:9 프레임 세로 중앙에 배치
await page.evaluate(() => {
  const section = document.querySelector("#result-title").closest("section")
  const rect = section.getBoundingClientRect()
  const top = rect.top + window.scrollY
  const offset = Math.max(0, (window.innerHeight - rect.height) / 2)
  window.scrollTo(0, top - offset)
})
await page.waitForTimeout(300)
await page.screenshot({ path: `${outDir}/demo-cover.png` })

// 3) 모바일 뷰(375px) 결과 화면 — 반응형 증거용
const mobile = await browser.newPage({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 2,
})
await mobile.goto(base, { waitUntil: "networkidle" })
await mobile.getByRole("button", { name: "자리 섞기" }).click()
await mobile.getByText("배치 결과").scrollIntoViewIfNeeded()
await mobile.waitForTimeout(400)
await mobile.screenshot({ path: `${outDir}/demo-mobile.png` })

await browser.close()
console.log("done:", outDir)
