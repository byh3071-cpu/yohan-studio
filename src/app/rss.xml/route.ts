import { getPublishedPosts } from "@/lib/blog"
import { getSiteUrl } from "@/lib/siteUrl"

export const revalidate = 3600

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function toUTC(date: string | number): string {
  const d = new Date(date)
  return Number.isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString()
}

export async function GET() {
  const base = getSiteUrl()
  const posts = getPublishedPosts()

  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}`
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${toUTC(p.date)}</pubDate>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>요한 스튜디오 블로그</title>
    <link>${base}/blog</link>
    <description>바이브코딩·AI 에이전트·1인 기업 운영의 실전 기록.</description>
    <language>ko</language>
    <lastBuildDate>${toUTC(posts[0]?.date ?? Date.now())}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  })
}
