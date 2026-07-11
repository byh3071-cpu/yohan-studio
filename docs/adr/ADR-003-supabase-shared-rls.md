---
status: Proposed
date: 2026-07-12
deciders: 백요한, Claude Code
session: 2026-07-12 yohanstudio.co 라이브 검증 후속
---

# ADR-003 — 공유 Supabase 프로젝트의 타 프로젝트 테이블 RLS 활성화

## 맥락

Yohan Studio는 Focus Feed Supabase 프로젝트(`olacbbfblhwssbcmradm`)를 공유 사용한다.
2026-07-11 라이브 검증에서 Supabase 보안 어드바이저가 **critical**을 보고:
`investor_flow`, `valuation`, `playlists`, `summaries`, `trend_cache`, `daily_price` 6개 테이블이 RLS 미적용 상태로 PostgREST에 노출.

- anon key는 yohanstudio.co(및 Focus Feed) 클라이언트 번들에 공개되어 있음 → **누구나 이 6개 테이블을 읽기/쓰기/삭제 가능**한 상태였다.
- 사용처 전수 조사 결과 (코드 grep 근거):
  - `daily_price`·`investor_flow`·`valuation`: auto-trader n8n 워크플로우. WF1(수집)은 `SUPABASE_SERVICE_ROLE_KEY` 헤더 확인. **WF2(시그널 알림)는 `SUPABASE_KEY`라는 별도 env 사용 — anon인지 service role인지 코드만으로 미확정.**
  - `playlists`·`summaries`·`trend_cache`: Focus Feed(`products/youtube-summary`)의 **서버 전용 service role 클라이언트**만 접근 (`src/lib/supabase-server.ts`). 브라우저 anon 클라이언트는 이 테이블들을 만지지 않음.

## 결정

6개 테이블 전부 RLS 활성화. 주식 3테이블만 **읽기 공개 정책** 동반:

```sql
ALTER TABLE public.daily_price   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_flow ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valuation     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.summaries    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trend_cache   ENABLE ROW LEVEL SECURITY;

-- 공개 시장 데이터: 읽기 공개(쓰기 차단이 목적). n8n WF2의 키 종류와 무관하게 조회 유지
CREATE POLICY daily_price_public_read   ON public.daily_price   FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY investor_flow_public_read ON public.investor_flow FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY valuation_public_read     ON public.valuation     FOR SELECT TO anon, authenticated USING (true);

-- 부수 정리(WARN): search_path 미고정 함수 3건
ALTER FUNCTION public.studio_set_updated_at() SET search_path = '';
ALTER FUNCTION public.aroo_set_updated_at()   SET search_path = '';
ALTER FUNCTION public.update_updated_at()     SET search_path = '';
```

**실행 방법**: supabase MCP가 read-only 모드라 DDL 불가 → **Supabase 대시보드 SQL Editor에서 백요한이 직접 실행** (또는 MCP read-only 해제 후 재시도).

## 대안

1. **정책 0개로 ENABLE만** — WF2의 `SUPABASE_KEY`가 anon일 경우 시그널 알림이 깨짐. 기각.
2. **RLS 없이 유지 + 키 로테이션** — anon key는 클라이언트 배포상 공개가 전제라 근본 해결 아님. 기각.
3. **주식 테이블을 별도 프로젝트로 분리** — 장기적으론 맞지만 지금 규모에선 과잉. 보류.

## 결과

- anon 경유 **쓰기/삭제 전면 차단** (핵심 목표). 주식 데이터 읽기는 공개 유지(민감정보 아님).
- service role 경로(n8n WF1, Focus Feed 서버)는 RLS 우회라 무영향.
- **후속 조건**: Focus Feed가 추후 브라우저(anon)에서 `playlists`/`summaries`/`trend_cache`를 직접 읽도록 바뀌면 해당 테이블에 SELECT 정책 추가 필요.
- 검증: 실행 후 `get_advisors(security)`에서 `rls_disabled_in_public` ERROR 0건 확인, 다음 영업일 `daily_price` 적재 확인, Focus Feed 라이브 스모크.
