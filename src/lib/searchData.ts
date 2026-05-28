import "server-only"

import { getPublishedPosts } from "@/lib/blog"
import { services } from "@/data/services"
import { showroomProjects } from "@/data/showroomProjects"

import type { SearchDocument } from "@/lib/search"

export function getSearchDocuments(): SearchDocument[] {
  const blogDocs: SearchDocument[] = getPublishedPosts().map((post) => ({
    id: `blog:${post.slug}`,
    kind: "blog",
    title: post.title,
    description: post.description,
    url: `/blog/${post.slug}`,
    tags: [...(post.tags ?? []), post.category].filter(Boolean),
    badge: "블로그",
  }))

  const showroomDocs: SearchDocument[] = showroomProjects.map((project) => ({
    id: `showroom:${project.slug}`,
    kind: "showroom",
    title: project.title,
    description: project.summary,
    url: `/showroom/${project.slug}`,
    tags: [project.category, ...project.stack, ...project.keywords],
    badge: "쇼룸",
  }))

  const serviceDocs: SearchDocument[] = services.map((service) => ({
    id: `service:${service.slug}`,
    kind: "service",
    title: service.name,
    description: service.tagline,
    url: `/services#${service.slug}`,
    tags: [service.audience, service.priceRange],
    badge: "서비스",
  }))

  return [...blogDocs, ...showroomDocs, ...serviceDocs]
}
