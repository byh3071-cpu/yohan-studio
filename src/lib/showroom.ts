import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import type { ReactElement } from "react"
import {
  SHOWROOM_CATEGORIES,
  SHOWROOM_KINDS,
  SHOWROOM_STATUSES,
  SHOWROOM_TIERS,
  type ShowroomCategory,
  type ShowroomDecision,
  type ShowroomEvidence,
  type ShowroomFaqItem,
  type ShowroomKind,
  type ShowroomMetric,
  type ShowroomProject,
  type ShowroomStatus,
  type ShowroomTier,
} from "@/data/showroomProjects"
import type { SearchDocument } from "@/lib/search"
import { getSiteUrl } from "@/lib/siteUrl"

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "showroom")

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

function toOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function toOptionalEnum<T extends readonly string[]>(
  value: unknown,
  options: T,
): T[number] | undefined {
  return typeof value === "string" && options.includes(value)
    ? (value as T[number])
    : undefined
}

function toMetrics(value: unknown): ShowroomMetric[] | undefined {
  if (!Array.isArray(value)) return undefined
  const items = value
    .map((entry): ShowroomMetric | null => {
      if (!isRecord(entry)) return null
      const label = toOptionalString(entry.label)
      const after = toOptionalString(entry.after)
      const basis = toOptionalString(entry.basis)
      if (!label || !after || !basis) return null
      return {
        label,
        before: toOptionalString(entry.before),
        after,
        basis,
        verified: entry.verified === true || entry.verified === "true",
      }
    })
    .filter((item): item is ShowroomMetric => item !== null)
  return items.length > 0 ? items : undefined
}

function toDecisions(value: unknown): ShowroomDecision[] | undefined {
  if (!Array.isArray(value)) return undefined
  const items = value
    .map((entry): ShowroomDecision | null => {
      if (!isRecord(entry)) return null
      const choice = toOptionalString(entry.choice)
      const reason = toOptionalString(entry.reason)
      const tradeoff = toOptionalString(entry.tradeoff)
      if (!choice || !reason || !tradeoff) return null
      return {
        choice,
        reason,
        alternatives: toStringArray(entry.alternatives),
        tradeoff,
      }
    })
    .filter((item): item is ShowroomDecision => item !== null)
  return items.length > 0 ? items : undefined
}

function toEvidence(value: unknown): ShowroomEvidence[] | undefined {
  if (!Array.isArray(value)) return undefined
  const allowedTypes = ["image", "demo", "source", "document"] as const
  const items = value
    .map((entry): ShowroomEvidence | null => {
      if (!isRecord(entry)) return null
      const type = toOptionalEnum(entry.type, allowedTypes)
      const label = toOptionalString(entry.label)
      if (!type || !label) return null
      return {
        type,
        label,
        href: toOptionalString(entry.href),
        note: toOptionalString(entry.note),
      }
    })
    .filter((item): item is ShowroomEvidence => item !== null)
  return items.length > 0 ? items : undefined
}

function toFaq(value: unknown): ShowroomFaqItem[] | undefined {
  if (!Array.isArray(value)) return undefined
  const items = value
    .map((entry): ShowroomFaqItem | null => {
      if (!entry || typeof entry !== "object") return null
      const record = entry as Record<string, unknown>
      const question = toOptionalString(record.question)
      const answer = toOptionalString(record.answer)
      if (!question || !answer) return null
      return { question, answer }
    })
    .filter((item): item is ShowroomFaqItem => item !== null)
  return items.length > 0 ? items : undefined
}

function isShowroomCategory(value: unknown): value is ShowroomCategory {
  return (
    typeof value === "string" &&
    (SHOWROOM_CATEGORIES as readonly string[]).includes(value)
  )
}

export function parseShowroomFrontmatter(
  slug: string,
  data: Record<string, unknown>,
): ShowroomProject | null {
  const title = toOptionalString(data.title)
  const summary = toOptionalString(data.summary)
  const year = toOptionalString(data.year)
  const dateCreated = toOptionalString(data.dateCreated)
  const stack = toStringArray(data.stack)
  const keywords = toStringArray(data.keywords)

  if (!isShowroomCategory(data.category)) return null
  if (
    !title ||
    !summary ||
    !year ||
    !dateCreated ||
    stack.length === 0 ||
    keywords.length === 0
  ) {
    return null
  }

  const valueProps = toStringArray(data.valueProps)
  const relatedPosts = toStringArray(data.relatedPosts)
  const kind = toOptionalEnum(data.kind, SHOWROOM_KINDS) as
    | ShowroomKind
    | undefined
  const status = toOptionalEnum(data.status, SHOWROOM_STATUSES) as
    | ShowroomStatus
    | undefined
  const tier = toOptionalEnum(data.tier, SHOWROOM_TIERS) as
    | ShowroomTier
    | undefined
  const metrics = toMetrics(data.metrics)
  const decisions = toDecisions(data.decisions)
  const verification = toStringArray(data.verification)
  const privacyNote = toOptionalString(data.privacyNote)

  if (kind === "case-study" && tier === "flagship") {
    const missing = [
      ["status", status],
      ["role", toOptionalString(data.role)],
      ["duration", toOptionalString(data.duration)],
      ["context", toOptionalString(data.context)],
      ["metrics", metrics?.length],
      ["decisions", decisions?.length],
      ["verification", verification.length],
      ["privacyNote", privacyNote],
    ]
      .filter(([, value]) => !value)
      .map(([field]) => field)

    if (missing.length > 0) {
      throw new Error(
        `[showroom:${slug}] flagship case study is missing: ${missing.join(", ")}`,
      )
    }
  }

  const project: ShowroomProject = {
    slug,
    title,
    category: data.category,
    summary,
    stack,
    year,
    dateCreated,
    keywords,
    problem: toOptionalString(data.problem),
    solution: toOptionalString(data.solution),
    result: toOptionalString(data.result),
    learned: toOptionalString(data.learned),
    valueProps: valueProps.length > 0 ? valueProps : undefined,
    audience: toOptionalString(data.audience),
    featured: data.featured === true || data.featured === "true",
    github: toOptionalString(data.github),
    demo: toOptionalString(data.demo),
    image: toOptionalString(data.image),
    imageAlt: toOptionalString(data.imageAlt),
    video: toOptionalString(data.video),
    faq: toFaq(data.faq),
    relatedPosts: relatedPosts.length > 0 ? relatedPosts : undefined,
    kind,
    status,
    tier,
    role: toOptionalString(data.role),
    duration: toOptionalString(data.duration),
    context: toOptionalString(data.context),
    privacyNote,
    constraints: toStringArray(data.constraints),
    verification: verification.length > 0 ? verification : undefined,
    limitations: toStringArray(data.limitations),
    nextSteps: toStringArray(data.nextSteps),
    metrics,
    decisions,
    evidence: toEvidence(data.evidence),
  }

  return project
}

function readFileRaw(slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, "utf8")
}

export function getAllShowroomSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getShowroomProject(slug: string): ShowroomProject | undefined {
  const raw = readFileRaw(slug)
  if (!raw) return undefined
  const { data } = matter(raw)
  return (
    parseShowroomFrontmatter(slug, data as Record<string, unknown>) ?? undefined
  )
}

export function getAllShowroomProjects(): ShowroomProject[] {
  return getAllShowroomSlugs()
    .map((slug) => getShowroomProject(slug))
    .filter((p): p is ShowroomProject => p !== undefined)
    .sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : -1))
}

export async function compileShowroomProject(slug: string): Promise<{
  meta: ShowroomProject
  content: ReactElement
  hasBody: boolean
} | null> {
  const raw = readFileRaw(slug)
  if (!raw) return null

  // 프론트매터를 제외한 본문이 실제로 있는지 먼저 확인한다.
  // 본문이 비면 상세 페이지가 정형 섹션만 렌더하도록 hasBody=false.
  const hasBody = matter(raw).content.trim().length > 0

  const { content, frontmatter } = await compileMDX({
    source: raw,
    options: { parseFrontmatter: true },
  })

  const meta = parseShowroomFrontmatter(
    slug,
    frontmatter as Record<string, unknown>,
  )
  if (!meta) return null

  return { meta, content, hasBody }
}

export function showroomSearchDocs(): SearchDocument[] {
  return getAllShowroomProjects().map((project) => ({
    id: `showroom:${project.slug}`,
    kind: "showroom",
    title: project.title,
    description: project.summary,
    url: `/showroom/${project.slug}`,
    tags: [project.category, ...project.stack, ...project.keywords],
    badge: "쇼룸",
  }))
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
