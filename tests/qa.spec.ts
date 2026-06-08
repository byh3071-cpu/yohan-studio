import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const ROUTES = ["/", "/blog", "/showroom", "/diagnosis", "/services", "/store"] as const

const IGNORE_CONSOLE = [
  /favicon/i,
  /Failed to load resource.*404/i,
  /net::ERR_/i,
]

function collectConsoleErrors(page: import("@playwright/test").Page) {
  const errors: string[] = []
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text())
  })
  page.on("pageerror", (err) => errors.push(err.message))
  return errors
}

function filterConsoleErrors(errors: string[]) {
  return errors.filter((e) => !IGNORE_CONSOLE.some((re) => re.test(e)))
}

for (const path of ROUTES) {
  test(`${path} — 200, h1, console clean, a11y smoke`, async ({ page }) => {
    const errors = collectConsoleErrors(page)

    const res = await page.goto(path, { waitUntil: "networkidle" })
    expect(res?.status(), `HTTP status for ${path}`).toBe(200)

    await expect(page.locator("h1").first(), `h1 on ${path}`).toBeVisible()

    const criticalConsole = filterConsoleErrors(errors)
    expect(
      criticalConsole,
      `console errors on ${path}: ${criticalConsole.join(" | ")}`,
    ).toEqual([])

    const axe = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze()
    const serious = axe.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    )
    expect(
      serious,
      `a11y serious/critical on ${path}: ${serious.map((v) => v.id).join(", ")}`,
    ).toEqual([])
  })
}
