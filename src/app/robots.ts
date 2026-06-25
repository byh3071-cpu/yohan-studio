import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/siteUrl"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      // 네이버
      { userAgent: "Yeti", allow: "/" },
      // AI 검색·인용 봇 (AEO/GEO 노출 핵심 — ChatGPT·Claude·Perplexity 인용)
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      // AI 학습 크롤러 (1인 브랜드 노출 극대화 — 전부 허용)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      // robots.txt 미준수 스크래퍼 — 의사표시 차단
      { userAgent: "Bytespider", disallow: "/" },
      // 그 외 전부 허용
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
