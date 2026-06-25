import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import { withSentryConfig } from "@sentry/nextjs"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/showroom",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/showroom/:path*",
        permanent: true,
      },
      {
        source: "/showroom/notion-custom-dashboard",
        destination: "/showroom/notion-uiux",
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({})

/** @next/mdx only adds turbopack.rules when process.env.TURBOPACK is set at config load — ensure MDX works in `next dev` (Turbopack default). */
function withMdxTurbopackRules(config: NextConfig): NextConfig {
  const mdxRsOptions = config.experimental?.mdxRs
  const loader = mdxRsOptions
    ? {
        loader: require.resolve("@next/mdx/mdx-rs-loader"),
        options: {
          providerImportSource: "next-mdx-import-source-file",
          ...(mdxRsOptions === true ? {} : mdxRsOptions),
        },
      }
    : {
        loader: require.resolve("@next/mdx/mdx-js-loader"),
        options: {
          providerImportSource: "next-mdx-import-source-file",
        },
      }

  const mdxRule = {
    loaders: [loader],
    as: "*.tsx",
    condition: { path: /\.mdx$/ },
  }

  const wildcardGlob = "{*,next-mdx-rule}"
  const existing = config.turbopack?.rules?.[wildcardGlob]
  const wildcardRule = [
    ...(existing ? (Array.isArray(existing) ? existing : [existing]) : []),
    mdxRule,
  ]

  return {
    ...config,
    turbopack: {
      ...config.turbopack,
      rules: {
        ...config.turbopack?.rules,
        [wildcardGlob]: wildcardRule,
      },
      resolveAlias: {
        ...config.turbopack?.resolveAlias,
        "next-mdx-import-source-file":
          config.turbopack?.resolveAlias?.["next-mdx-import-source-file"] ??
          "@vercel/turbopack-next/mdx-import-source",
      },
    },
  }
}

const finalConfig = withMdxTurbopackRules(withMDX(nextConfig))

// 소스맵 업로드는 org/project/authToken 3종이 모두 있을 때만 활성.
// 하나라도 없으면 silent 스킵 — DSN 없는 로컬/CI 빌드가 깨지지 않도록.
const SENTRY_ORG = process.env.SENTRY_ORG
const SENTRY_PROJECT = process.env.SENTRY_PROJECT
const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN
const canUploadSourcemaps = Boolean(SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN)

// withSentryConfig 는 MDX/Turbopack 설정을 보존한 채 빌드 플러그인만 추가한다.
// Turbopack(Next 16 기본)에서는 빌드 완료 후 소스맵을 업로드한다.
export default withSentryConfig(finalConfig, {
  org: SENTRY_ORG,
  project: SENTRY_PROJECT,
  authToken: SENTRY_AUTH_TOKEN,
  // 빌드 로그 노이즈 억제 (CI 외 환경에서 조용히).
  silent: !process.env.CI,
  // authToken 없으면 업로드 자체를 비활성 → 빌드 실패/경고 방지.
  // (Turbopack 은 빌드 완료 후 업로드. webpack 전용 옵션은 사용하지 않음.)
  sourcemaps: {
    disable: !canUploadSourcemaps,
  },
})

