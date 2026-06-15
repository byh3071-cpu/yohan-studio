import type { MetadataRoute } from "next"
import { showroomProjects } from "@/data/showroomProjects"
import { getPublishedPosts } from "@/lib/blog"
import { getSiteUrl } from "@/lib/siteUrl"

const BASE_URL = getSiteUrl()

// Stable last-modified for static content pages. Bumping `new Date()` on every
// build makes lastmod untrustworthy (every page looks edited each deploy), so
// these carry a real "content last changed" date instead. Index pages that grow
// with new posts/projects keep build-time freshness below.
const STATIC_LAST_MOD = new Date("2026-06-15")

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts()
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const showroomEntries: MetadataRoute.Sitemap = showroomProjects.map((p) => ({
    url: `${BASE_URL}/showroom/${p.slug}`,
    lastModified: new Date(p.dateCreated),
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/design`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/showroom`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/diagnosis`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vhk`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/open-source`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...showroomEntries,
    ...postEntries,
  ]
}
