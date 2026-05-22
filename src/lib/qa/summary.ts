import type {
  QaIssue,
  QaIssueAggregate,
  QaLinkAggregate,
  QaReport,
  QaRouteHotspot,
  QaRouteReport,
  QaRouteSummary,
  QaSummaryReport,
  QaViewport,
} from "./types"

const HEADLINE_MAX = 120

function severityWeight(code: string, issues: QaIssue[]): "warning" | "fail" {
  const first = issues.find((i) => i.code === code)
  return first?.severity === "fail" ? "fail" : "warning"
}

function buildHeadline(route: QaRouteReport): string {
  if (route.status === "pass") {
    const note = route.h1[0] ? `h1="${route.h1[0]}"` : "h1 없음"
    return `정상 — title="${route.title || "(없음)"}", ${note}`.slice(0, HEADLINE_MAX)
  }
  const fails = route.issues.filter((i) => i.severity === "fail")
  const warns = route.issues.filter((i) => i.severity === "warning")
  if (fails.length > 0) {
    const head = fails[0].message
    const extra = fails.length > 1 ? ` (+${fails.length - 1}건 fail)` : ""
    return `FAIL — ${head}${extra}`.slice(0, HEADLINE_MAX)
  }
  if (warns.length > 0) {
    const head = warns[0].message
    const extra = warns.length > 1 ? ` (+${warns.length - 1}건 warning)` : ""
    return `WARN — ${head}${extra}`.slice(0, HEADLINE_MAX)
  }
  return "이슈 없음"
}

function toRouteSummary(route: QaRouteReport): QaRouteSummary {
  return {
    name: route.name,
    path: route.path,
    viewport: route.viewport,
    status: route.status,
    url: route.url,
    title: route.title,
    headline: buildHeadline(route),
    issueCount: route.issues.length,
    issueCodes: route.issues.map((i) => i.code),
    screenshotPath: route.screenshotPath,
  }
}

function aggregateIssues(routes: QaRouteReport[]): QaIssueAggregate[] {
  const map = new Map<string, QaIssueAggregate>()
  for (const route of routes) {
    for (const issue of route.issues) {
      const existing = map.get(issue.code)
      if (existing) {
        existing.count += 1
        existing.routes.push({ name: route.name, path: route.path, viewport: route.viewport })
        if (issue.severity === "fail") existing.severity = "fail"
      } else {
        map.set(issue.code, {
          code: issue.code,
          severity: severityWeight(issue.code, route.issues),
          count: 1,
          routes: [{ name: route.name, path: route.path, viewport: route.viewport }],
          sampleMessage: issue.message,
        })
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    if (a.severity !== b.severity) return a.severity === "fail" ? -1 : 1
    if (a.count !== b.count) return b.count - a.count
    return a.code.localeCompare(b.code)
  })
}

function buildHotspots(routes: QaRouteReport[]): QaRouteHotspot[] {
  return routes
    .map((route) => {
      const failCount = route.issues.filter((i) => i.severity === "fail").length
      const warningCount = route.issues.filter((i) => i.severity === "warning").length
      return {
        name: route.name,
        path: route.path,
        viewport: route.viewport,
        status: route.status,
        issueCount: route.issues.length,
        failCount,
        warningCount,
      }
    })
    .filter((h) => h.issueCount > 0)
    .sort((a, b) => {
      if (a.failCount !== b.failCount) return b.failCount - a.failCount
      if (a.warningCount !== b.warningCount) return b.warningCount - a.warningCount
      return a.path.localeCompare(b.path)
    })
    .slice(0, 10)
}

type LinkPicker = (route: QaRouteReport) => Array<{ href: string; text: string }>

function aggregateLinks(routes: QaRouteReport[], pick: LinkPicker): QaLinkAggregate[] {
  const map = new Map<string, QaLinkAggregate>()
  for (const route of routes) {
    for (const link of pick(route)) {
      const key = link.href
      const existing = map.get(key)
      const location = { name: route.name, path: route.path, viewport: route.viewport }
      if (existing) {
        existing.foundOn.push(location)
        if (!existing.text && link.text) existing.text = link.text
      } else {
        map.set(key, { href: link.href, text: link.text, foundOn: [location] })
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    if (a.foundOn.length !== b.foundOn.length) return b.foundOn.length - a.foundOn.length
    return a.href.localeCompare(b.href)
  })
}

function pickRoutesWithoutH1(
  routes: QaRouteReport[],
): Array<{ name: string; path: string; viewport: QaViewport }> {
  return routes
    .filter((r) => r.h1.length === 0)
    .map((r) => ({ name: r.name, path: r.path, viewport: r.viewport }))
}

function pickRoutesWithoutTitle(
  routes: QaRouteReport[],
): Array<{ name: string; path: string; viewport: QaViewport }> {
  return routes
    .filter((r) => !r.title || r.title.trim().length === 0)
    .map((r) => ({ name: r.name, path: r.path, viewport: r.viewport }))
}

export function buildSummary(raw: QaReport): QaSummaryReport {
  const routes = [...raw.routes].sort((a, b) => {
    if (a.path === b.path) return a.viewport.localeCompare(b.viewport)
    return a.path.localeCompare(b.path)
  })

  return {
    createdAt: new Date().toISOString(),
    sourceCreatedAt: raw.createdAt,
    baseUrl: raw.baseUrl,
    totals: raw.summary,
    routes: routes.map(toRouteSummary),
    issueAggregates: aggregateIssues(routes),
    hotspots: buildHotspots(routes),
    storeLinks: aggregateLinks(routes, (r) => r.storeLinks),
    externalLinks: aggregateLinks(routes, (r) => r.externalLinks),
    missingH1: pickRoutesWithoutH1(routes),
    pagesWithoutTitle: pickRoutesWithoutTitle(routes),
  }
}
