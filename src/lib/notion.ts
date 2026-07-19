import "server-only"

import { Client, isFullBlock, isFullPage } from "@notionhq/client"
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client"

import type {
  BlockWithChildren,
  LearningLogPage,
  LearningLogSummary,
} from "@/types/learningLog"

// "러닝 로그" 부모 페이지 ID. 하위 특강 후기 3편의 부모.
// 공개 상수 — 비밀이 아니며, 상세 페이지 부모검증의 기준값이다.
export const LEARNING_LOG_PARENT_ID = "39b9740a-b072-816b-9533-cf24eb12275c"

// 재귀 fetch 깊이 상한. 요청 폭발·순환 방지.
const MAX_DEPTH = 3

let cached: Client | null = null

// NOTION_API_KEY 없으면 null 반환(throw 아님). 키 미설정 환경(로컬·게이트 전)에서도
// 목록은 빈 상태로, 상세는 notFound로 graceful 하게 렌더되어 빌드가 깨지지 않게 한다.
export function getNotion(): Client | null {
  if (cached) return cached
  const key = process.env.NOTION_API_KEY
  if (!key) return null
  cached = new Client({ auth: key })
  return cached
}

const HEX32_RE = /^[0-9a-f]{32}$/i
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function stripHyphens(id: string): string {
  return id.replace(/-/g, "").toLowerCase()
}

// 하이픈 없는 32hex → UUID 형식(8-4-4-4-12). Notion API는 두 형식 모두 받지만
// 비교·정규화를 위해 한 형식으로 통일한다.
export function toHyphenId(raw: string): string {
  const bare = stripHyphens(raw)
  return `${bare.slice(0, 8)}-${bare.slice(8, 12)}-${bare.slice(12, 16)}-${bare.slice(16, 20)}-${bare.slice(20)}`
}

// URL 세그먼트가 노션 페이지 ID 형식인지 검증. 상세 라우트의 조기 notFound 게이트.
export function isValidNotionId(raw: string): boolean {
  return HEX32_RE.test(raw) || UUID_RE.test(raw)
}

// 블록의 모든 자식을 페이지네이션 끝까지 수집(full 블록만).
// SDK의 iteratePaginatedAPI 헬퍼는 block_id 필수 파라미터와 타입이 충돌하므로 수동 루프.
async function listAllChildren(
  notion: Client,
  blockId: string,
): Promise<BlockObjectResponse[]> {
  const out: BlockObjectResponse[] = []
  let cursor: string | undefined
  for (;;) {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    })
    for (const block of res.results) {
      if (isFullBlock(block)) out.push(block)
    }
    if (!res.has_more || !res.next_cursor) break
    cursor = res.next_cursor
  }
  return out
}

// 부모 "러닝 로그" 페이지의 하위 child_page들을 목록으로. 키 없거나 실패 시 빈 배열.
export async function getLearningLogIndex(): Promise<LearningLogSummary[]> {
  const notion = getNotion()
  if (!notion) return []
  try {
    const children = await listAllChildren(notion, LEARNING_LOG_PARENT_ID)
    return children
      .filter((block) => block.type === "child_page")
      .map((block) => ({
        id: stripHyphens(block.id),
        title: block.type === "child_page" ? block.child_page.title : "",
        lastEdited: block.last_edited_time,
        created: block.created_time,
      }))
  } catch (err) {
    console.error(
      "[learning-log] getLearningLogIndex failed:",
      err instanceof Error ? err.message : err,
    )
    return []
  }
}

// 블록 자식을 재귀로 채워 트리로 반환. Notion은 자식을 별도 요청으로 주므로 여기서 합친다.
async function fetchBlockTree(
  notion: Client,
  blockId: string,
  depth = 0,
): Promise<BlockWithChildren[]> {
  const children = await listAllChildren(notion, blockId)
  const out: BlockWithChildren[] = []
  for (const block of children) {
    const node: BlockWithChildren = { ...block, _children: [] }
    if (block.has_children && depth < MAX_DEPTH) {
      node._children = await fetchBlockTree(notion, block.id, depth + 1)
    }
    out.push(node)
  }
  return out
}

// 페이지 properties에서 title 타입 프로퍼티의 텍스트를 추출.
function extractTitle(page: PageObjectResponse): string {
  for (const prop of Object.values(page.properties)) {
    if (prop.type === "title") {
      return prop.title.map((t) => t.plain_text).join("")
    }
  }
  return "러닝 로그"
}

// 상세 페이지 데이터. id 형식·키·부모검증을 통과해야 반환, 아니면 null(→ notFound).
export async function getLearningLogPage(
  rawId: string,
): Promise<LearningLogPage | null> {
  if (!isValidNotionId(rawId)) return null
  const notion = getNotion()
  if (!notion) return null
  try {
    const hyphenId = toHyphenId(rawId)
    const page = await notion.pages.retrieve({ page_id: hyphenId })
    if (!isFullPage(page)) return null
    // 부모검증: 통합에 공유된 다른 페이지가 URL 조작으로 노출되는 것을 차단.
    if (page.parent.type !== "page_id") return null
    if (stripHyphens(page.parent.page_id) !== stripHyphens(LEARNING_LOG_PARENT_ID)) {
      return null
    }
    const blocks = await fetchBlockTree(notion, hyphenId)
    return {
      title: extractTitle(page),
      lastEdited: page.last_edited_time,
      blocks,
    }
  } catch (err) {
    console.error(
      "[learning-log] getLearningLogPage failed:",
      err instanceof Error ? err.message : err,
    )
    return null
  }
}
