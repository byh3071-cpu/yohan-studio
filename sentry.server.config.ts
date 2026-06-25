import * as Sentry from "@sentry/nextjs"

// DSN 이 없으면 enabled:false 로 완전 비활성(no-op). 빌드/런타임 안전.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  // 보수적 샘플링. 트래픽 늘면 상향.
  tracesSampleRate: 0.1,
  // 로컬/CI 노이즈 억제.
  debug: false,
})
