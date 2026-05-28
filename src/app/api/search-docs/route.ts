import { NextResponse } from "next/server"

import { getSearchDocuments } from "@/lib/searchData"

export const runtime = "nodejs"
// 콘텐츠 변경 빈도가 낮음. ISR 5분으로 CDN 캐싱.
export const revalidate = 300

export function GET() {
  const docs = getSearchDocuments()
  return NextResponse.json(
    { docs },
    {
      headers: {
        "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    },
  )
}
