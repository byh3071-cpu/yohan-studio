import "server-only"

import { blogSearchDocs } from "@/lib/blog"
import { opensourceSearchDocs } from "@/data/opensourceItems"
import { servicesSearchDocs } from "@/data/services"
import { showroomSearchDocs } from "@/data/showroomProjects"

import type { SearchDocument } from "@/lib/search"

// Registry: 도메인별 매퍼만 합성한다. 새 도메인 추가 시 매퍼를
// 해당 데이터 모듈에 두고 여기엔 import 한 줄만 늘린다.
export function getSearchDocuments(): SearchDocument[] {
  return [
    ...blogSearchDocs(),
    ...showroomSearchDocs(),
    ...servicesSearchDocs(),
    ...opensourceSearchDocs(),
  ]
}
