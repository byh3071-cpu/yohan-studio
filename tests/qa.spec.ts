import { test, type Page, type ConsoleMessage, type Request } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
import fs from "node:fs/promises"
import path from "node:path"
import { QA_ROUTES } from "../src/lib/qa/routes"
import type {
  QaAccessibilityViolation,
  QaConsoleMessage,
  QaFailedRequest,
  QaIssue,
  QaLink,
  QaReport,
  QaRoute,
  QaRouteReport,
  QaStatus,
  QaViewport,
} from "../src/lib/qa/types"

const ARTIFACTS_DIR = path.join(process.cwd(), "qa-artifacts")
const SCREENSHOTS_DIR = path.join(ARTIFACTS_DIR, "screenshots")
const REPORT_PATH = path.join(ARTIFACTS_DIR, "report.raw.json")

const PORT = Number(process.env.QA_PORT ?? 3050)
const BASE_URL = (process.env.QA_BASE_URL ?? `http://localhost:${PORT}`).replace(/\/$/, "")

const VIEWPORTS: Record<QaViewport, { width: number; height: number }> = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
}

const TEXT_SNAPSHOT_LIMIT = 1200

const collectedReports: QaRouteReport[] = []

function slugifyRoute(routePath: string): string {
  if (routePath === "/") return "home"
  return routePath.replace(/^\//, "").replace(/\//g, "-")
}

function isInternalHref(href: string, origin: string): boolean {
  if (!href) return false
  if (href.startsWith("#")) return false
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false
  if (href.startsWith("/")) return true
  try {
    const u = new URL(href, origin)
    return u.origin === origin
  } catch {
    return false
  }
}

const IGNORED_FAILED_REQUEST_HOSTS = new Set([
  "www.google-analytics.com",
  "google-analytics.com",
  "analytics.google.com",
  "region1.google-analytics.com",
  "region1.analytics.google.com",
  "www.googletagmanager.com",
  "googletagmanager.com",
  "stats.g.doubleclick.net",
])

const IGNORED_FAILED_REQUEST_PATTERNS: RegExp[] = [
  /\/favicon\.ico(\?|$)/,
  /\/_next\/(webpack-hmr|hot-update|on-demand-entries)/,
  /\/__turbopack_hmr__/,
]

function shouldIgnoreFailedRequest(url: string): boolean {
  try {
    const u = new URL(url)
    if (IGNORED_FAILED_REQUEST_HOSTS.has(u.hostname)) return true
  } catch {
    // non-URL strings fall through to pattern check
  }
  return IGNORED_FAILED_REQUEST_PATTERNS.some((re) => re.test(url))
}

function isStoreHref(href: string): boolean {
  if (!href) return false
  try {
    const u = new URL(href, "http://x")
    if (u.pathname === "/store" || u.pathname.startsWith("/store/")) return true
    if (u.hash === "#store" || u.hash.startsWith("#store/")) return true
    return false
  } catch {
    return false
  }
}

function severityFromImpact(impact: string | null | undefined): "warning" | "fail" {
  if (impact === "critical") return "fail"
  return "warning"
}

function statusFromIssues(issues: QaIssue[]): QaStatus {
  if (issues.some((i) => i.severity === "fail")) return "fail"
  if (issues.some((i) => i.severity === "warning")) return "warning"
  return "pass"
}

async function ensureDirs(): Promise<void> {
  await fs.mkdir(ARTIFACTS_DIR, { recursive: true })
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true })
}

async function runRoute(
  page: Page,
  route: QaRoute,
  viewport: QaViewport,
): Promise<QaRouteReport> {
  const issues: QaIssue[] = []
  const consoleMessages: QaConsoleMessage[] = []
  const pageErrors: string[] = []
  const failedRequests: QaFailedRequest[] = []

  const onConsole = (msg: ConsoleMessage) => {
    const type = msg.type()
    if (type !== "error" && type !== "warning") return
    const loc = msg.location()
    consoleMessages.push({
      type,
      text: msg.text(),
      location: loc?.url ? `${loc.url}:${loc.lineNumber}:${loc.columnNumber}` : undefined,
    })
  }
  const onPageError = (err: Error) => {
    pageErrors.push(err.stack ?? err.message)
  }
  const onRequestFailed = (req: Request) => {
    failedRequests.push({
      url: req.url(),
      method: req.method(),
      failure: req.failure()?.errorText ?? "unknown",
    })
  }

  page.on("console", onConsole)
  page.on("pageerror", onPageError)
  page.on("requestfailed", onRequestFailed)

  const targetUrl = `${BASE_URL}${route.path}`
  let finalUrl = targetUrl
  let title = ""
  let httpStatus: number | undefined

  try {
    const response = await page.goto(targetUrl, {
      waitUntil: "networkidle",
      timeout: 30_000,
    })
    httpStatus = response?.status()
    finalUrl = page.url()
    title = await page.title()

    if (httpStatus && httpStatus >= 400) {
      issues.push({
        severity: "fail",
        code: "http_error",
        message: `HTTP ${httpStatus} on ${route.path}`,
      })
    }
  } catch (err) {
    issues.push({
      severity: "fail",
      code: "navigation_error",
      message: `페이지 접속 실패: ${route.path}`,
      detail: err instanceof Error ? err.message : String(err),
    })
  }

  for (const failed of failedRequests) {
    if (shouldIgnoreFailedRequest(failed.url)) continue
    issues.push({
      severity: "fail",
      code: "failed_request",
      message: `리소스 로딩 실패: ${failed.method} ${failed.url}`,
      detail: failed.failure,
    })
  }

  if (pageErrors.length > 0) {
    issues.push({
      severity: "fail",
      code: "page_error",
      message: `브라우저 page error ${pageErrors.length}건`,
      detail: pageErrors[0]?.slice(0, 500),
    })
  }

  const consoleErrors = consoleMessages.filter((m) => m.type === "error")
  if (consoleErrors.length > 0) {
    issues.push({
      severity: "warning",
      code: "console_error",
      message: `console.error ${consoleErrors.length}건`,
      detail: consoleErrors[0]?.text?.slice(0, 500),
    })
  }

  let h1: string[] = []
  let textSnapshot = ""
  let buttons: string[] = []
  let internalLinks: QaLink[] = []
  let externalLinks: QaLink[] = []
  let storeLinks: QaLink[] = []
  let axeViolations: QaAccessibilityViolation[] = []
  const origin = new URL(BASE_URL).origin

  try {
    h1 = await page.locator("h1").allTextContents()
    h1 = h1.map((t) => t.trim()).filter(Boolean)

    if (h1.length === 0) {
      issues.push({
        severity: "warning",
        code: "missing_h1",
        message: "h1 태그가 발견되지 않음",
      })
    }

    const bodyText = await page.locator("body").innerText().catch(() => "")
    textSnapshot = bodyText.replace(/\s+/g, " ").trim().slice(0, TEXT_SNAPSHOT_LIMIT)

    buttons = (await page.locator("button").allTextContents())
      .map((t) => t.trim())
      .filter(Boolean)

    const anchors = await page.locator("a[href]").evaluateAll((els) =>
      els.map((el) => {
        const a = el as HTMLAnchorElement
        return { href: a.getAttribute("href") ?? "", text: (a.textContent ?? "").trim() }
      }),
    )

    for (const a of anchors) {
      if (!a.href) continue
      const isStore = isStoreHref(a.href)
      const isInternal = isInternalHref(a.href, origin)
      const link: QaLink = { href: a.href, text: a.text.slice(0, 120) }
      if (isStore) storeLinks.push(link)
      if (isInternal) internalLinks.push(link)
      else if (/^https?:\/\//i.test(a.href)) externalLinks.push(link)
    }

    internalLinks = dedupeLinks(internalLinks)
    externalLinks = dedupeLinks(externalLinks)
    storeLinks = dedupeLinks(storeLinks)
  } catch (err) {
    issues.push({
      severity: "warning",
      code: "extract_error",
      message: "DOM 추출 중 예외 발생",
      detail: err instanceof Error ? err.message : String(err),
    })
  }

  if (storeLinks.length > 0) {
    issues.push({
      severity: "warning",
      code: "store_link_present",
      message: `/store 링크가 ${storeLinks.length}건 발견됨 (해당 라우트는 미구현)`,
      detail: storeLinks.map((l) => l.href).slice(0, 5).join(", "),
    })
  }

  if (route.path === "/blog") {
    await runBlogChecks(page, issues)
  }

  try {
    const builder = new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
    ])
    const result = await builder.analyze()
    axeViolations = result.violations.map((v) => ({
      id: v.id,
      impact: v.impact ?? null,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.length,
    }))
    for (const v of axeViolations) {
      issues.push({
        severity: severityFromImpact(v.impact),
        code: `a11y:${v.id}`,
        message: `${v.help} (impact: ${v.impact ?? "n/a"}, nodes: ${v.nodes})`,
        detail: v.helpUrl,
      })
    }
  } catch (err) {
    issues.push({
      severity: "warning",
      code: "axe_error",
      message: "axe-core 실행 중 예외",
      detail: err instanceof Error ? err.message : String(err),
    })
  }

  const screenshotFile = `${slugifyRoute(route.path)}-${viewport}.png`
  const screenshotPath = path.join(SCREENSHOTS_DIR, screenshotFile)
  try {
    await page.screenshot({ path: screenshotPath, fullPage: true })
  } catch (err) {
    issues.push({
      severity: "warning",
      code: "screenshot_error",
      message: "스크린샷 캡처 실패",
      detail: err instanceof Error ? err.message : String(err),
    })
  }

  page.off("console", onConsole)
  page.off("pageerror", onPageError)
  page.off("requestfailed", onRequestFailed)

  return {
    name: route.name,
    path: route.path,
    goal: route.goal,
    viewport,
    url: finalUrl,
    title,
    h1,
    textSnapshot,
    buttons,
    internalLinks,
    externalLinks,
    storeLinks,
    consoleMessages,
    pageErrors,
    failedRequests,
    accessibilityViolations: axeViolations,
    screenshotPath: path.relative(process.cwd(), screenshotPath),
    status: statusFromIssues(issues),
    issues,
  }
}

function dedupeLinks(links: QaLink[]): QaLink[] {
  const seen = new Set<string>()
  const out: QaLink[] = []
  for (const l of links) {
    if (seen.has(l.href)) continue
    seen.add(l.href)
    out.push(l)
  }
  return out
}

async function runBlogChecks(page: Page, issues: QaIssue[]): Promise<void> {
  const searchInput = page.locator('input[type="search"], input[placeholder*="검색" i]')
  const hasSearch = (await searchInput.count()) > 0
  if (!hasSearch) {
    issues.push({
      severity: "warning",
      code: "blog_no_search_input",
      message: "/blog 검색 input을 찾지 못함",
    })
  }

  const postLinks = page.locator('a[href^="/blog/"]')
  const postCount = await postLinks.count()
  if (postCount === 0) {
    issues.push({
      severity: "fail",
      code: "blog_no_posts",
      message: "/blog 글 카드/링크가 1개도 렌더되지 않음",
    })
  }
}

for (const route of QA_ROUTES) {
  for (const viewport of Object.keys(VIEWPORTS) as QaViewport[]) {
    test(`${route.name} @ ${viewport}`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: VIEWPORTS[viewport],
        deviceScaleFactor: 1,
        userAgent:
          viewport === "mobile"
            ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            : undefined,
      })
      const page = await context.newPage()
      let report: QaRouteReport
      try {
        await ensureDirs()
        report = await runRoute(page, route, viewport)
      } finally {
        await context.close()
      }
      collectedReports.push(report)
    })
  }
}

test.afterAll(async () => {
  await ensureDirs()

  const summary = collectedReports.reduce(
    (acc, r) => {
      if (r.status === "pass") acc.passed += 1
      else if (r.status === "warning") acc.warnings += 1
      else acc.failed += 1
      return acc
    },
    { totalRoutes: collectedReports.length, passed: 0, warnings: 0, failed: 0 },
  )

  const report: QaReport = {
    createdAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary,
    routes: collectedReports.sort((a, b) => {
      if (a.path === b.path) return a.viewport.localeCompare(b.viewport)
      return a.path.localeCompare(b.path)
    }),
  }

  await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2) + "\n", "utf8")
})
