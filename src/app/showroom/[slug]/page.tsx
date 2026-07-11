import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { RelatedBlogPosts } from "@/components/seo/RelatedContent"
import { ShowroomJsonLd } from "@/components/seo/ShowroomJsonLd"
import { ShowroomProjectDetail } from "@/components/showroom/ShowroomProjectDetail"
import {
  compileShowroomProject,
  getAllShowroomSlugs,
  getShowroomCanonicalPath,
  getShowroomProject,
  resolveShowroomImageUrl,
} from "@/lib/showroom"
import { getSiteUrl } from "@/lib/siteUrl"

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllShowroomSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getShowroomProject(slug)
  if (!project) return { title: "프로젝트를 찾을 수 없음" }

  const base = getSiteUrl()
  const imageUrl = resolveShowroomImageUrl(project.image, base)
  const ogImages = imageUrl
    ? [{ url: imageUrl, alt: project.imageAlt ?? project.title }]
    : undefined

  return {
    title: `${project.title} — Showroom`,
    description: project.summary,
    alternates: { canonical: getShowroomCanonicalPath(slug) },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `${base}${getShowroomCanonicalPath(slug)}`,
      // images 키를 undefined로 넣으면 파일 기반 opengraph-image가 무시된다 (#35와 동일 패턴)
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      ...(ogImages ? { images: ogImages.map((i) => i.url) } : {}),
    },
  }
}

export default async function ShowroomProjectPage({ params }: PageProps) {
  const { slug } = await params
  const compiled = await compileShowroomProject(slug)
  if (!compiled) notFound()

  const { meta: project, content, hasBody } = compiled

  return (
    <>
      <ShowroomJsonLd project={project} />
      <BreadcrumbJsonLd
        items={[
          { name: "홈", path: "/" },
          { name: "쇼룸", path: "/showroom" },
          { name: project.title, path: getShowroomCanonicalPath(slug) },
        ]}
      />
      <ShowroomProjectDetail
        project={project}
        content={hasBody ? content : undefined}
      />
      {project.relatedPosts && project.relatedPosts.length > 0 && (
        <div
          style={{
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            padding: "0 24px 96px",
          }}
        >
          <RelatedBlogPosts slugs={project.relatedPosts} />
        </div>
      )}
    </>
  )
}
