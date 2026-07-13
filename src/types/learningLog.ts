import type { BlockObjectResponse } from "@notionhq/client"

// 목록 카드용 요약. id는 하이픈 없는 32hex (URL 세그먼트로 사용).
export type LearningLogSummary = {
  id: string
  title: string
  lastEdited: string
}

// 노션 블록 + 재귀로 채운 자식들. Notion API는 자식을 별도 요청으로 주므로
// fetchBlockTree가 트리로 합쳐 렌더러가 재귀 렌더할 수 있게 한다.
export type BlockWithChildren = BlockObjectResponse & {
  _children: BlockWithChildren[]
}

export type LearningLogPage = {
  title: string
  lastEdited: string
  blocks: BlockWithChildren[]
}
