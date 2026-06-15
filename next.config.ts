import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
      // Canonical host enforcement: the studio runs on yohanstudio.co, but the
      // legacy *.vercel.app alias is still reachable and would split SEO signals
      // (duplicate content across two domains). 301 every path on the old alias
      // to the canonical domain. Preview deploys use distinct hostnames, so only
      // the production alias is matched.
      {
        source: "/:path*",
        has: [{ type: "host", value: "yohan-studio.vercel.app" }],
        destination: "https://yohanstudio.co/:path*",
        permanent: true,
      },
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

export default withMdxTurbopackRules(withMDX(nextConfig))
