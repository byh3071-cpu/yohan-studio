import {
  showroomProjects,
  type ShowroomProject,
} from "@/data/showroomProjects"
import { getSiteUrl } from "@/lib/siteUrl"

export function getAllShowroomSlugs(): string[] {
  return showroomProjects.map((p) => p.slug)
}

export function getShowroomProject(slug: string): ShowroomProject | undefined {
  return showroomProjects.find((p) => p.slug === slug)
}

export function resolveShowroomImageUrl(
  image: string | undefined,
  baseUrl: string = getSiteUrl(),
): string | undefined {
  if (!image) return undefined
  if (image.startsWith("http://") || image.startsWith("https://")) return image
  return `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`
}

export function getShowroomCanonicalPath(slug: string): string {
  return `/showroom/${slug}`
}
