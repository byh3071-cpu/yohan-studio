// 익명 데모 실사용 흐름 녹화 전용 Playwright 설정 (qa:test와 분리)
// 실행: node node_modules/@playwright/test/cli.js test --config=scripts/record-flexible.config.mjs
const config = {
  testDir: "./record-flexible",
  timeout: 120_000,
  outputDir: "../qa-artifacts/flexible/video-run",
  reporter: "line",
  workers: 1,
  use: {
    baseURL: "https://flexible-seat-randomizer.vercel.app",
    viewport: { width: 1600, height: 900 },
    video: { mode: "on", size: { width: 1600, height: 900 } },
  },
}

export default config
