import { Fragment, type ReactNode } from "react"
import type { RichTextItemResponse } from "@notionhq/client"

// 노션 rich_text 배열 → JSX. annotations를 중첩 래핑하고 링크를 새 탭으로.
// color는 v1에서 무시(디자인 시스템 색만 사용).
export function NotionRichText({ rich }: { rich: RichTextItemResponse[] }) {
  return (
    <>
      {rich.map((item, i) => {
        const { annotations, plain_text, href } = item
        let node: ReactNode = plain_text
        if (annotations.code) node = <code>{node}</code>
        if (annotations.bold) node = <strong>{node}</strong>
        if (annotations.italic) node = <em>{node}</em>
        if (annotations.strikethrough) node = <s>{node}</s>
        if (annotations.underline) node = <u>{node}</u>
        if (href) {
          node = (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {node}
            </a>
          )
        }
        return <Fragment key={i}>{node}</Fragment>
      })}
    </>
  )
}
