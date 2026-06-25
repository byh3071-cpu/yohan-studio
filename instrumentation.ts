import * as Sentry from "@sentry/nextjs"

// Next.js 16: instrumentation.ts is enabled by default (no experimental flag).
// register() runs once per runtime (nodejs / edge) at server startup.
// 모든 init 은 DSN 이 falsy 면 no-op 으로 동작 — sentry.*.config.ts 참고.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config")
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config")
  }
}

// App Router 서버 컴포넌트/라우트 핸들러의 에러를 캡처 (@sentry/nextjs >= 8.28).
// DSN 미설정 시 내부적으로 no-op.
export const onRequestError = Sentry.captureRequestError
