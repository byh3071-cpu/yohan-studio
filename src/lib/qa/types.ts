export type QaViewport = "desktop" | "mobile"

export type QaStatus = "pass" | "warning" | "fail"

export type QaIssueSeverity = "warning" | "fail"

export type QaRoute = {
  path: string
  name: string
  goal: string
}

export type QaIssue = {
  severity: QaIssueSeverity
  code: string
  message: string
  detail?: string
}

export type QaConsoleMessage = {
  type: string
  text: string
  location?: string
}

export type QaFailedRequest = {
  url: string
  method: string
  failure: string
  status?: number
}

export type QaLink = {
  href: string
  text: string
}

export type QaAccessibilityViolationSampleNode = {
  target: string[]
  html: string
  failureSummary: string
}

export type QaAccessibilityViolation = {
  id: string
  impact: string | null
  help: string
  helpUrl: string
  nodes: number
  sampleNodes?: QaAccessibilityViolationSampleNode[]
}

export type QaRouteReport = {
  name: string
  path: string
  goal: string
  viewport: QaViewport
  url: string
  title: string
  h1: string[]
  textSnapshot: string
  buttons: string[]
  internalLinks: QaLink[]
  externalLinks: QaLink[]
  storeLinks: QaLink[]
  consoleMessages: QaConsoleMessage[]
  pageErrors: string[]
  failedRequests: QaFailedRequest[]
  accessibilityViolations: QaAccessibilityViolation[]
  screenshotPath: string
  status: QaStatus
  issues: QaIssue[]
}

export type QaReportSummary = {
  totalRoutes: number
  passed: number
  warnings: number
  failed: number
}

export type QaReport = {
  createdAt: string
  baseUrl: string
  summary: QaReportSummary
  routes: QaRouteReport[]
}

export type QaRouteSummary = {
  name: string
  path: string
  viewport: QaViewport
  status: QaStatus
  url: string
  title: string
  headline: string
  issueCount: number
  issueCodes: string[]
  screenshotPath: string
}

export type QaIssueAggregate = {
  code: string
  severity: QaIssueSeverity
  count: number
  routes: Array<{ name: string; path: string; viewport: QaViewport }>
  sampleMessage: string
}

export type QaLinkAggregate = {
  href: string
  text: string
  foundOn: Array<{ name: string; path: string; viewport: QaViewport }>
}

export type QaRouteHotspot = {
  name: string
  path: string
  viewport: QaViewport
  status: QaStatus
  issueCount: number
  failCount: number
  warningCount: number
}

export type QaSummaryReport = {
  createdAt: string
  baseUrl: string
  sourceCreatedAt: string
  totals: QaReportSummary
  routes: QaRouteSummary[]
  issueAggregates: QaIssueAggregate[]
  hotspots: QaRouteHotspot[]
  storeLinks: QaLinkAggregate[]
  externalLinks: QaLinkAggregate[]
  missingH1: Array<{ name: string; path: string; viewport: QaViewport }>
  pagesWithoutTitle: Array<{ name: string; path: string; viewport: QaViewport }>
}
