import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import type { ReactElement } from "react"

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog")

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  thumbnail?: string
  published: boolean
}

export type BlogPostMeta = BlogFrontmatter & { slug: string }

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

function toPublished(value: unknown): boolean {
  if (typeof value === "boolean") return value
  if (value === "true") return true
  if (value === "false") return false
  return false
}

export function parseBlogFrontmatter(
  slug: string,
  data: Record<string, unknown>,
): BlogPostMeta | null {
  const title = typeof data.title === "string" ? data.title : ""
  const description = typeof data.description === "string" ? data.description : ""
  const date = typeof data.date === "string" ? data.date : ""
  const category = typeof data.category === "string" ? data.category : ""
  if (!title || !description || !date || !category) return null

  const thumbRaw = typeof data.thumbnail === "string" ? data.thumbnail.trim() : ""
  const thumbnail = thumbRaw.length > 0 ? thumbRaw : undefined

  return {
    slug,
    title,
    description,
    date,
    tags: toStringArray(data.tags),
    category,
    thumbnail,
    published: toPublished(data.published),
  }
}

function readFileRaw(slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, "utf8")
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getPostMeta(slug: string): BlogPostMeta | null {
  const raw = readFileRaw(slug)
  if (!raw) return null
  const { data } = matter(raw)
  return parseBlogFrontmatter(slug, data as Record<string, unknown>)
}

export function getPublishedPosts(): BlogPostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((m): m is BlogPostMeta => m !== null && m.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function compileBlogPost(slug: string): Promise<{
  meta: BlogPostMeta
  content: ReactElement
} | null> {
  const raw = readFileRaw(slug)
  if (!raw) return null

  const { content, frontmatter } = await compileMDX({
    source: raw,
    options: { parseFrontmatter: true },
  })

  const meta = parseBlogFrontmatter(slug, frontmatter as Record<string, unknown>)
  if (!meta) return null

  return { meta, content }
}
