import type { BlogPostMeta } from "@/lib/blog"
import { getSiteUrl } from "@/lib/siteUrl"

type Props = {
  meta: BlogPostMeta
  dateModified?: string
}

function resolveArticleImage(
  thumbnail: string | undefined,
  base: string,
): string | undefined {
  if (!thumbnail) return undefined
  if (thumbnail.startsWith("http://") || thumbnail.startsWith("https://")) {
    return thumbnail
  }
  return `${base}${thumbnail.startsWith("/") ? thumbnail : `/${thumbnail}`}`
}

export function ArticleJsonLd({ meta, dateModified }: Props) {
  const base = getSiteUrl()
  const url = `${base}/blog/${meta.slug}`
  const image = resolveArticleImage(meta.thumbnail, base)

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url,
    datePublished: meta.date,
    dateModified: dateModified ?? meta.date,
    author: { "@id": `${base}/#person` },
    publisher: { "@id": `${base}/#org` },
    inLanguage: "ko-KR",
    isPartOf: { "@id": `${base}/#website` },
  }

  if (image) {
    jsonLd.image = image
  }

  if (meta.tags.length > 0) {
    jsonLd.keywords = meta.tags.join(", ")
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
