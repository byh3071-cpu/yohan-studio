import { chromium } from "@playwright/test"
import { mkdirSync } from "node:fs"

const BASE = process.env.BASE_URL ?? "http://localhost:3050"
const OUT = "scripts/.verify"
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

page.on("response", (r) => {
  if (r.url().includes("/api/chat")) {
    console.log(`api/chat ${r.status()} ${r.url()}`)
  }
})

try {
  await page.goto(BASE, { waitUntil: "networkidle" })

  const launcher = page
    .locator('button[aria-label="챗봇 열기"], button[aria-label*="chat" i]')
    .first()
  if (!(await launcher.count())) {
    throw new Error("chatbot launcher not found")
  }
  await launcher.click()
  await page.waitForTimeout(800)

  const input = page
    .locator('input[placeholder*="메시지"], textarea, input[type="text"]')
    .last()
  await input.fill("안녕")
  await page.keyboard.press("Enter")

  await page.waitForTimeout(8000)
  await page.screenshot({ path: `${OUT}/07-chatbot-response.png`, fullPage: false })
  const bodyText = await page.locator("body").innerText()
  const lastSnippet = bodyText
    .split("\n")
    .filter((l) => l.length > 0)
    .slice(-12)
    .join(" | ")
  console.log("tail:", lastSnippet)
} catch (e) {
  console.log("ERROR:", e.message)
} finally {
  await browser.close()
}
