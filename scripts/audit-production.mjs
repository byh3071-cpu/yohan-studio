import { chromium } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const targetArg = process.argv.slice(2).find((argument) => !argument.startsWith("--"))
const target = new URL(targetArg ?? "https://yohanstudio.co")
const mobile = process.argv.includes("--mobile")
const routeArg = process.argv.find((argument) => argument.startsWith("--route="))
const routes = routeArg
  ? [routeArg.slice("--route=".length)]
  : ["/", "/services", "/showroom", "/blog", "/diagnosis", "/store"]

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
  serviceWorkers: "block",
})

const results = []

for (const route of routes) {
  const page = await context.newPage()
  const consoleErrors = []
  const failedRequests = []
  const responses = []

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text())
  })
  page.on("pageerror", (error) => consoleErrors.push(error.message))
  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      reason: request.failure()?.errorText ?? "unknown",
    })
  })
  page.on("response", (response) => {
    responses.push({
      url: response.url(),
      status: response.status(),
      type: response.request().resourceType(),
    })
  })

  await page.addInitScript(() => {
    window.__auditMetrics = { lcpMs: null, cls: 0, shifts: [] }

    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const latest = entries.at(-1)
      if (latest) window.__auditMetrics.lcpMs = latest.startTime
    }).observe({ type: "largest-contentful-paint", buffered: true })

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__auditMetrics.cls += entry.value
          window.__auditMetrics.shifts.push({
            value: entry.value,
            sources: (entry.sources ?? []).map((source) => ({
              html: source.node?.outerHTML?.slice(0, 300) ?? null,
              previousRect: source.previousRect,
              currentRect: source.currentRect,
            })),
          })
        }
      }
    }).observe({ type: "layout-shift", buffered: true })
  })

  const startedAt = Date.now()
  const response = await page.goto(new URL(route, target).href, {
    waitUntil: "networkidle",
    timeout: 45_000,
  })
  const loadElapsedMs = Date.now() - startedAt
  const headers = response?.headers() ?? {}

  const browserMetrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0]
    const resources = performance.getEntriesByType("resource")
    const paints = performance.getEntriesByType("paint")
    const observed = window.__auditMetrics
    const nav = navigation
      ? {
          ttfbMs: Math.round(navigation.responseStart),
          domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
          loadEventMs: Math.round(navigation.loadEventEnd),
          transferSize: navigation.transferSize,
          encodedBodySize: navigation.encodedBodySize,
        }
      : null

    return {
      navigation: nav,
      firstContentfulPaintMs: Math.round(
        paints.find((entry) => entry.name === "first-contentful-paint")?.startTime ?? 0,
      ),
      largestContentfulPaintMs: observed.lcpMs === null ? null : Math.round(observed.lcpMs),
      cumulativeLayoutShift: Number(observed.cls.toFixed(4)),
      layoutShifts: observed.shifts,
      resourceCount: resources.length,
      resourceTransferBytes: resources.reduce(
        (total, entry) => total + (entry.transferSize ?? 0),
        0,
      ),
    }
  })

  const layout = await page.evaluate(() => {
    const overflowingElements = [...document.querySelectorAll("body *")]
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        return rect.right > document.documentElement.clientWidth + 1 || rect.left < -1
      })
      .slice(0, 10)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        className: typeof element.className === "string" ? element.className : null,
      }))

    return {
      viewportWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      overflowingElements,
    }
  })

  const images = await page.locator("img").evaluateAll((nodes) =>
    nodes.map((image) => ({
      src: image.currentSrc || image.src,
      alt: image.alt,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      renderedWidth: Math.round(image.getBoundingClientRect().width),
      renderedHeight: Math.round(image.getBoundingClientRect().height),
      loading: image.loading,
    })),
  )

  const accessibility = await new AxeBuilder({ page }).analyze()
  const seriousAccessibility = accessibility.violations
    .filter(({ impact }) => impact === "critical" || impact === "serious")
    .map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
      samples: nodes.slice(0, 5).map(({ target, html, failureSummary }) => ({
        target,
        html,
        failureSummary,
      })),
    }))

  const pageOrigin = new URL(page.url()).origin
  const internalLinks = await page.locator("a[href]").evaluateAll(
    (links, origin) =>
      [...new Set(
        links
          .map((link) => link.href)
          .filter((href) => new URL(href).origin === origin)
          .map((href) => new URL(href).pathname),
      )],
    pageOrigin,
  )

  results.push({
    route,
    status: response?.status() ?? null,
    finalUrl: page.url(),
    loadElapsedMs,
    title: await page.title(),
    h1: await page.locator("h1").first().textContent().catch(() => null),
    headers: {
      cacheControl: headers["cache-control"] ?? null,
      contentSecurityPolicy: headers["content-security-policy"] ?? null,
      strictTransportSecurity: headers["strict-transport-security"] ?? null,
      xContentTypeOptions: headers["x-content-type-options"] ?? null,
      xFrameOptions: headers["x-frame-options"] ?? null,
      referrerPolicy: headers["referrer-policy"] ?? null,
      permissionsPolicy: headers["permissions-policy"] ?? null,
    },
    browserMetrics,
    layout,
    consoleErrors,
    failedRequests,
    errorResponses: responses.filter(({ status }) => status >= 400),
    seriousAccessibility,
    images,
    internalLinks,
  })

  await page.close()
}

const uniqueInternalLinks = [...new Set(results.flatMap(({ internalLinks }) => internalLinks))]
const linkChecks = []

for (const pathname of uniqueInternalLinks) {
  const response = await context.request.get(new URL(pathname, target).href, {
    failOnStatusCode: false,
    maxRedirects: 5,
  })
  linkChecks.push({ pathname, status: response.status(), url: response.url() })
}

const audit = {
  target: target.href,
  profile: mobile ? "mobile" : "desktop",
  collectedAt: new Date().toISOString(),
  results,
  linkChecks,
}

if (process.argv.includes("--summary")) {
  console.log(JSON.stringify({
    target: audit.target,
    profile: audit.profile,
    collectedAt: audit.collectedAt,
    routes: results.map((result) => ({
      route: result.route,
      status: result.status,
      ttfbMs: result.browserMetrics.navigation?.ttfbMs ?? null,
      fcpMs: result.browserMetrics.firstContentfulPaintMs,
      lcpMs: result.browserMetrics.largestContentfulPaintMs,
      cls: result.browserMetrics.cumulativeLayoutShift,
      layoutShifts: result.browserMetrics.layoutShifts,
      loadEventMs: result.browserMetrics.navigation?.loadEventMs ?? null,
      transferBytes: result.browserMetrics.resourceTransferBytes,
      accessibilityViolations: result.seriousAccessibility.reduce(
        (total, violation) => total + violation.nodes,
        0,
      ),
      consoleErrors: result.consoleErrors.length,
      failedRequests: result.failedRequests.length,
      errorResponses: result.errorResponses.length,
      viewportWidth: result.layout.viewportWidth,
      documentScrollWidth: result.layout.documentScrollWidth,
      overflowingElements: result.layout.overflowingElements,
    })),
    internalLinks: {
      checked: linkChecks.length,
      failed: linkChecks.filter(({ status }) => status >= 400),
    },
  }, null, 2))
} else {
  console.log(JSON.stringify(audit, null, 2))
}

await context.close()
await browser.close()
