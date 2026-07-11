// 스토어 판매 상태 플래그.
// 실상품·가격·전달물(download_url) 확정 전까지 false 유지 — 결제 진입을 막고
// 가격 대신 "공개 예정"을 노출한다. 재개 조건: docs/adr 및 CLAUDE.md '다음 작업' 참고.
export const STORE_SALES_ENABLED = false

export const STORE_PAUSED_LABEL = "준비 중"
export const STORE_PAUSED_NOTICE = "상품 정비 중 — 곧 공개됩니다"
export const STORE_PRICE_TBD = "가격 공개 예정"
