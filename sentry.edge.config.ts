import * as Sentry from "@sentry/nextjs"

// Edge 런타임(미들웨어 등)용 init. DSN 없으면 no-op.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  tracesSampleRate: 0.1,
  debug: false,
})
