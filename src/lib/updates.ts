import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import type { ReactElement } from "react"
import { CodeBlock } from "@/components/blog/mdx/CodeBlock"
import { PRODUCTS, UPDATE_TYPES } from "@/lib/updatesShared"
import type { ProductId, UpdateType, UpdateEntryMeta } from "@/lib/updatesShared"

const mdxComponents = {
  pre: CodeBlock,
  CodeBlock,
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "updates")

export type {
  ProductId,
  UpdateType,
  UpdateFrontmatter,
  UpdateEntryMeta,
} from "@/lib/updatesShared"
export { PRODUCTS, UPDATE_TYPES } from "@/lib/updatesShared"

function toPublished(value: unknown): boolean {
  if (typeof value === "boolean") return value
  if (value === "true") return true
  if (value === "false") return false
  return false
}

function toProduct(value: unknown): ProductId | null {
  if (typeof value !== "string") return null
  return value in PRODUCTS ? (value as ProductId) : null
}

function toTypes(value: unknown): UpdateType[] {
  if (!Array.isArray(value)) return []
  return value.filter((t): t is UpdateType =>
    UPDATE_TYPES.includes(t as UpdateType),
  )
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function parseUpdateFrontmatter(
  slug: string,
  data: Record<string, unknown>,
): UpdateEntryMeta | null {
  const product = toProduct(data.product)
  const version = typeof data.version === "string" ? data.version : ""
  const date = typeof data.date === "string" && DATE_RE.test(data.date) ? data.date : ""
  const title = typeof data.title === "string" ? data.title : ""
  const types = toTypes(data.types)
  if (!product || !version || !date || !title || types.length === 0) return null

  const blogSlugRaw = typeof data.blogSlug === "string" ? data.blogSlug.trim() : ""

  return {
    slug,
    product,
    version,
    date,
    title,
    types,
    blogSlug: blogSlugRaw.length > 0 ? blogSlugRaw : undefined,
    published: toPublished(data.published),
  }
}

function readFileRaw(slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, "utf8")
}

export function getAllUpdateSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getUpdateMeta(slug: string): UpdateEntryMeta | null {
  const raw = readFileRaw(slug)
  if (!raw) return null
  const { data } = matter(raw)
  return parseUpdateFrontmatter(slug, data as Record<string, unknown>)
}

// "0.10.0" 같은 두 자리 마이너가 문자열 비교로 "0.2.0"보다 앞서지 않도록 숫자 파트 비교.
function compareVersionsDesc(a: string, b: string): number {
  const pa = a.split(".").map((n) => Number.parseInt(n, 10) || 0)
  const pb = b.split(".").map((n) => Number.parseInt(n, 10) || 0)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i++) {
    const diff = (pb[i] ?? 0) - (pa[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

export function getPublishedUpdates(): UpdateEntryMeta[] {
  return getAllUpdateSlugs()
    .map((slug) => getUpdateMeta(slug))
    .filter((m): m is UpdateEntryMeta => m !== null && m.published)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1
      if (a.product !== b.product) return a.product < b.product ? -1 : 1
      return compareVersionsDesc(a.version, b.version)
    })
}

export type CompiledUpdate = {
  meta: UpdateEntryMeta
  content: ReactElement
}

// 목록 페이지 하나에 전체 항목 본문을 인라인 렌더하므로 published 전부를 한 번에 컴파일한다.
// 항목 하나의 본문 구문 오류가 페이지 전체 빌드를 막지 않도록 실패 항목은 경고 후 제외.
export async function getCompiledUpdates(): Promise<CompiledUpdate[]> {
  return Promise.all(
    getPublishedUpdates().map(async (meta) => {
      const raw = readFileRaw(meta.slug)
      if (!raw) return null
      try {
        const { content } = await compileMDX({
          source: raw,
          components: mdxComponents,
          options: { parseFrontmatter: true },
        })
        return { meta, content }
      } catch (err) {
        console.warn(`[updates] MDX 컴파일 실패로 제외: ${meta.slug}`, err)
        return null
      }
    }),
  ).then((entries) => entries.filter((e): e is CompiledUpdate => e !== null))
}
