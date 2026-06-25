import { NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"

import { getSearchDocuments } from "@/lib/searchData"

export const runtime = "nodejs"
// 콘텐츠 변경 빈도가 낮음. ISR 5분으로 CDN 캐싱.
export const revalidate = 300

export function GET() {
  try {
    const docs = getSearchDocuments()
    return NextResponse.json(
      { docs },
      {
        headers: {
          "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
        },
      },
    )
  } catch (err) {
    // 기존 동작 보존: 던져서 Next 의 500 처리에 위임. Sentry 에는 명시적으로 캡처.
    console.error("[/api/search-docs] error:", err)
    Sentry.captureException(err)
    throw err
  }
}
