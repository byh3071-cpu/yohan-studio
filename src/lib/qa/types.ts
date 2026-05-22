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

export type QaAccessibilityViolation = {
  id: string
  impact: string | null
  help: string
  helpUrl: string
  nodes: number
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
