import { SITE_CONFIG } from "@/data/siteConfig"

function buildSiteInfo(): string {
  const pages = SITE_CONFIG.pages.map((p) => `- ${p.path}: ${p.desc}`).join("\n")
  const oss = SITE_CONFIG.openSource.map((o) => `- ${o.name}: ${o.desc}`).join("\n")
  const stack = SITE_CONFIG.stack.map((s) => `- ${s}`).join("\n")

  return `${SITE_CONFIG.name} (${SITE_CONFIG.englishName}) — ${SITE_CONFIG.tagline}.

운영자: ${SITE_CONFIG.owner.name} (${SITE_CONFIG.owner.bio})
배포: ${SITE_CONFIG.url}

주요 페이지
${pages}

오픈소스
${oss}

기술 스택
${stack}

응답 톤
- 한국어 기본. 친절하고 간결. 군더더기 없음.
- 기술 질문은 구체적으로. 모르는 건 모른다고.
- 사이트 페이지 추천 시 정확한 경로 (예: /vhk, /blog/[slug]) 사용.
- 결제·진단·서비스 문의는 해당 페이지 안내.
`
}

export const SITE_INFO = buildSiteInfo()

export const CHAT_SYSTEM_PROMPT = `너는 요한 스튜디오의 AI 어시스턴트다. 방문자가 사이트와 운영자(요한)에 대해 묻거나, 바이브코딩/AI 자동화/1인 기업 관련 질문을 한다.

아래 사이트 정보를 기반으로 답하라:

${SITE_INFO}

규칙
- 사이트에 있는 정보만 단정하고, 없는 정보는 "확인되지 않았습니다" 또는 해당 페이지를 안내한다.
- 응답은 짧고 명확하게. 불필요한 인사·이모지 자제.
- 코드 예시 요청 시 fenced code block 사용.
- 외부 링크는 사이트 내부 경로 (/blog, /store 등) 우선 안내.
- 링크는 반드시 마크다운 형식 [텍스트](/경로)로 쓴다. URL을 괄호 밖에 반복하지 않는다.
`

// 스토어 상품 요약을 시스템 프롬프트에 덧붙인다.
// 상품 데이터는 studio_products(DB)가 단일 소스 — 10분 캐시로 조회 부하 억제.
import { supabase } from "@/lib/supabase"
import { STORE_SALES_ENABLED } from "@/data/storeConfig"

const STORE_CTX_TTL_MS = 10 * 60 * 1000
let storeCtxCache: { value: string; expiresAt: number } | null = null

async function buildStoreContext(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from("studio_products")
      .select("name, slug, description, product_type")
      .eq("active", true)
      .order("created_at", { ascending: false })
    if (error || !data || data.length === 0) return ""

    const lines = data
      .map((p) => `- ${p.name} (/store/${p.slug}, ${p.product_type}): ${p.description ?? ""}`)
      .join("\n")
    const status = STORE_SALES_ENABLED
      ? "판매 중."
      : "현재 전 상품 준비 중(판매 일시 중지) — 가격·구매는 공개 예정이라고 안내할 것."

    return `\n스토어 상품 (${status})\n${lines}\n`
  } catch {
    return ""
  }
}

export async function getChatSystemPrompt(): Promise<string> {
  const now = Date.now()
  if (storeCtxCache && storeCtxCache.expiresAt > now) {
    return CHAT_SYSTEM_PROMPT + storeCtxCache.value
  }
  const storeCtx = await buildStoreContext()
  storeCtxCache = { value: storeCtx, expiresAt: now + STORE_CTX_TTL_MS }
  return CHAT_SYSTEM_PROMPT + storeCtx
}
