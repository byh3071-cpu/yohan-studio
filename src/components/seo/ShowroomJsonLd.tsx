import type { ShowroomProject } from "@/data/showroomProjects"
import { getSiteUrl } from "@/lib/siteUrl"
import { resolveShowroomImageUrl } from "@/lib/showroom"

type Props = {
  project: ShowroomProject
}

export function ShowroomJsonLd({ project }: Props) {
  const base = getSiteUrl()
  const url = `${base}/showroom/${project.slug}`
  const image = resolveShowroomImageUrl(project.image, base)

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url,
    author: { "@id": `${base}/#person` },
    dateCreated: project.dateCreated,
    keywords: project.keywords,
    isPartOf: { "@id": `${base}/#website` },
    inLanguage: "ko-KR",
  }

  if (image) {
    jsonLd.image = image
  }

  if (project.github) {
    jsonLd.codeRepository = project.github
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
