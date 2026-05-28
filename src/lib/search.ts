import Fuse, { type IFuseOptions } from "fuse.js"

export type SearchDocumentKind = "blog" | "showroom" | "service"

export type SearchDocument = {
  id: string
  kind: SearchDocumentKind
  title: string
  description: string
  url: string
  tags: string[]
  badge: string
}

const FUSE_OPTIONS: IFuseOptions<SearchDocument> = {
  includeScore: true,
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.55 },
    { name: "description", weight: 0.25 },
    { name: "tags", weight: 0.2 },
  ],
}

export function createSearchIndex(docs: SearchDocument[]): Fuse<SearchDocument> {
  return new Fuse(docs, FUSE_OPTIONS)
}
