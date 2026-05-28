import { chromium } from "@playwright/test"
import { mkdirSync } from "node:fs"

const BASE = process.env.BASE_URL ?? "http://localhost:3050"
const OUT = "scripts/.verify"
mkdirSync(OUT, { recursive: true })

const findings = []
const note = (s) => {
  console.log(s)
  findings.push(s)
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

try {
  await page.goto(BASE, { waitUntil: "networkidle" })
  await page.screenshot({ path: `${OUT}/01-home-light.png`, fullPage: false })

  const primaryLinks = await page
    .locator('nav[aria-label="주요 메뉴"] a')
    .allTextContents()
  note(`primary nav (${primaryLinks.length}): ${JSON.stringify(primaryLinks)}`)

  const hamburger = await page.locator(".nav-hamburger").count()
  const searchBtn = await page
    .locator('button[aria-label="사이트 검색 열기"], button:has-text("Ctrl K"), button:has-text("⌘ K")')
    .count()
  const themeBtn = await page
    .locator('button[aria-label*="다크모드"], button[aria-label*="라이트모드"], [aria-label*="theme" i]')
    .count()
  note(`hamburger=${hamburger} searchBtn=${searchBtn} themeBtn=${themeBtn}`)

  await page.keyboard.press("Control+k")
  await page.waitForTimeout(500)
  const dialogVisible = await page
    .locator('[role="dialog"], [data-search-open="true"], input[type="search"]')
    .count()
  note(`Ctrl+K opened search overlay (selector hits): ${dialogVisible}`)
  await page.screenshot({ path: `${OUT}/02-search-open.png`, fullPage: false })
  await page.keyboard.press("Escape")
  await page.waitForTimeout(300)

  await page.locator(".nav-hamburger").first().click()
  await page.waitForTimeout(500)
  const auxLinks = await page
    .locator(".site-header-menu-group:not(.site-header-menu-group--primary) a")
    .allTextContents()
  note(`aux menu links: ${JSON.stringify(auxLinks)}`)
  await page.screenshot({ path: `${OUT}/03-hamburger-open.png`, fullPage: false })
  await page.keyboard.press("Escape")

  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })
  const mobile = await mobileCtx.newPage()
  await mobile.goto(BASE, { waitUntil: "networkidle" })
  await mobile.locator(".nav-hamburger").first().click()
  await mobile.waitForTimeout(300)
  const mobileMenuBefore = await mobile.locator("#site-header-menu.is-open").count()
  await mobile.locator('#site-header-menu button[aria-label="사이트 검색 열기"]').first().click()
  await mobile.waitForTimeout(500)
  const mobileSearchOpen = await mobile
    .locator('[role="dialog"], [data-search-open="true"], input[type="search"]')
    .count()
  const mobileMenuAfter = await mobile.locator("#site-header-menu.is-open").count()
  note(`mobile search trigger: menuBefore=${mobileMenuBefore} searchOpen=${mobileSearchOpen} menuAfter=${mobileMenuAfter}`)
  await mobile.screenshot({ path: `${OUT}/03b-mobile-search-open.png`, fullPage: false })
  await mobile.close()
  await mobileCtx.close()

  const resp = await page.goto(`${BASE}/open-source`, { waitUntil: "networkidle" })
  note(`/open-source status: ${resp?.status()}`)
  const h1 = await page.locator("h1").first().textContent().catch(() => "")
  note(`/open-source h1: ${h1?.trim()}`)
  await page.screenshot({ path: `${OUT}/04-open-source.png`, fullPage: false })

  await page.goto(BASE, { waitUntil: "networkidle" })
  const widgetCandidates = await page
    .locator('button[aria-label="챗봇 열기"], button[aria-label="챗봇 닫기"], [class*="chat" i]')
    .count()
  note(`chatbot widget candidates (DOM): ${widgetCandidates}`)

  const launcher = page
    .locator('button[aria-label="챗봇 열기"], button[aria-label*="chat" i]')
    .first()
  if (await launcher.count()) {
    await launcher.click()
    await page.waitForTimeout(800)
    await page.screenshot({ path: `${OUT}/05-chatbot-open.png`, fullPage: false })
    note("chatbot launcher clicked + screenshot saved")
  } else {
    await page.screenshot({ path: `${OUT}/05-chatbot-missing.png`, fullPage: false })
    note("chatbot launcher NOT found via aria-label")
  }

  await page.goto(BASE, { waitUntil: "networkidle" })
  const htmlBefore = await page.locator("html").getAttribute("data-theme")
  const themeToggle = page
    .locator('button[aria-label*="다크모드"], button[aria-label*="라이트모드"], [aria-label*="theme" i]')
    .first()
  if (await themeToggle.count()) {
    await themeToggle.click()
    await page.waitForTimeout(400)
    const htmlAfter = await page.locator("html").getAttribute("data-theme")
    note(`theme toggle: data-theme before=${htmlBefore} after=${htmlAfter}`)
    await page.screenshot({ path: `${OUT}/06-home-dark.png`, fullPage: false })
  } else {
    note("theme toggle NOT found")
  }
} catch (e) {
  note(`ERROR: ${e.message}`)
} finally {
  await browser.close()
  console.log("\n--- summary ---")
  for (const f of findings) console.log(" -", f)
}
