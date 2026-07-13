import { Fragment, type CSSProperties, type ReactNode } from "react"
import type { RichTextItemResponse } from "@notionhq/client"

import type { BlockWithChildren } from "@/types/learningLog"
import { NotionRichText } from "./NotionRichText"

// 이미지 자리표시 스타일 — v1은 노션 원본으로 유도(연동 v2 예정).
const imagePlaceholder: CSSProperties = {
  margin: "2rem 0",
  padding: "1.1rem 1.25rem",
  border: "var(--border-w) solid var(--line)",
  background: "var(--surface)",
  fontFamily: "var(--font-mono)",
  fontSize: "0.8rem",
  color: "var(--muted)",
  textAlign: "center",
}

function listItemRichText(block: BlockWithChildren): RichTextItemResponse[] {
  if (block.type === "bulleted_list_item") return block.bulleted_list_item.rich_text
  if (block.type === "numbered_list_item") return block.numbered_list_item.rich_text
  return []
}

function ListItem({ block }: { block: BlockWithChildren }) {
  return (
    <li>
      <NotionRichText rich={listItemRichText(block)} />
      {block._children.length > 0 && <NotionBlocks blocks={block._children} />}
    </li>
  )
}

// 단일 블록 → JSX. 미지원 타입은 null(조용히 스킵). 리스트 아이템은 상위에서 그룹핑.
function renderBlock(block: BlockWithChildren): ReactNode {
  switch (block.type) {
    case "paragraph": {
      const rich = block.paragraph.rich_text
      if (rich.length === 0) return null // 빈 문단 스킵
      return <p><NotionRichText rich={rich} /></p>
    }
    // 노션 섹션 제목은 실데이터상 heading_2가 최상위 → 페이지 h1(글 제목) 아래 h2로 렌더.
    case "heading_1":
      return <h2><NotionRichText rich={block.heading_1.rich_text} /></h2>
    case "heading_2":
      return <h2><NotionRichText rich={block.heading_2.rich_text} /></h2>
    case "heading_3":
      return <h3><NotionRichText rich={block.heading_3.rich_text} /></h3>
    case "quote":
      return (
        <blockquote>
          <NotionRichText rich={block.quote.rich_text} />
          {block._children.length > 0 && <NotionBlocks blocks={block._children} />}
        </blockquote>
      )
    case "code": {
      // 코드는 서식 없이 원문 그대로. pre>code 구조여야 globals.css 폴백 스타일이 먹는다.
      const text = block.code.rich_text.map((t) => t.plain_text).join("")
      return (
        <pre>
          <code>{text}</code>
        </pre>
      )
    }
    case "image":
      return (
        <figure style={imagePlaceholder}>
          🖼 이미지는 노션 원본에서 볼 수 있습니다 (사이트 연동 v2 예정)
        </figure>
      )
    default:
      // callout · toggle · table · divider · 기타: v1 미지원 → 스킵
      return null
  }
}

// 블록 배열 → JSX. 연속 리스트 아이템을 ul/ol로 그룹핑(Notion API엔 리스트 컨테이너가 없음).
export function NotionBlocks({ blocks }: { blocks: BlockWithChildren[] }) {
  const out: ReactNode[] = []
  let i = 0
  while (i < blocks.length) {
    const type = blocks[i].type
    if (type === "bulleted_list_item" || type === "numbered_list_item") {
      const group: BlockWithChildren[] = []
      while (i < blocks.length && blocks[i].type === type) {
        group.push(blocks[i])
        i++
      }
      const items = group.map((b) => <ListItem key={b.id} block={b} />)
      out.push(
        type === "bulleted_list_item" ? (
          <ul key={group[0].id}>{items}</ul>
        ) : (
          <ol key={group[0].id}>{items}</ol>
        ),
      )
      continue
    }
    const el = renderBlock(blocks[i])
    if (el) out.push(<Fragment key={blocks[i].id}>{el}</Fragment>)
    i++
  }
  return <>{out}</>
}
