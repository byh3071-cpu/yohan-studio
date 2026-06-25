import * as Sentry from "@sentry/nextjs"

// Next.js 16 클라이언트 계측 진입점 (구 sentry.client.config.ts 대체).
// DSN 이 falsy 면 enabled:false 로 no-op — 번들에는 포함되나 네트워크 전송/수집 없음.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  // 보수적 샘플링.
  tracesSampleRate: 0.1,
  debug: false,
})

// App Router 클라이언트 라우트 전환 계측.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
