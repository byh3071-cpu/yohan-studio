import { defineConfig } from "@playwright/test"

const PORT = Number(process.env.QA_PORT ?? 3050)
const BASE_URL = process.env.QA_BASE_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  outputDir: "test-results",
  use: {
    baseURL: BASE_URL,
    headless: true,
    trace: "on",
    screenshot: "off",
    video: "off",
    ignoreHTTPSErrors: true,
  },
  webServer: process.env.QA_NO_WEBSERVER
    ? undefined
    : {
        command: `npm run dev`,
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 120_000,
        stdout: "ignore",
        stderr: "pipe",
      },
})
