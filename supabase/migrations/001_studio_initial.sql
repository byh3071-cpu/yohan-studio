-- =====================================================================
-- Yohan Studio — Phase 3 초기 스키마 (Focus Feed Supabase 공유)
-- 모든 테이블 studio_ prefix. RLS 정책 포함.
-- 실행: Supabase Dashboard → SQL Editor → Run, 또는 `supabase db push`
-- =====================================================================

-- =====================================================================
-- 1. studio_products — 판매 상품 (템플릿/도구)
-- =====================================================================
create table if not exists public.studio_products (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name            text not null,
  description     text,
  price_cents     integer not null check (price_cents >= 0),
  currency        text not null default 'KRW',
  product_type    text not null check (product_type in ('template', 'tool', 'course', 'ebook')),
  image_url       text,
  download_url    text,
  stripe_price_id text unique,
  active          boolean not null default true,
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists studio_products_active_idx on public.studio_products (active) where active = true;
create index if not exists studio_products_type_idx   on public.studio_products (product_type);

-- =====================================================================
-- 2. studio_purchases — 구매 기록
-- =====================================================================
create table if not exists public.studio_purchases (
  id                    uuid primary key default gen_random_uuid(),
  product_id            uuid not null references public.studio_products(id) on delete restrict,
  buyer_email           text not null,
  buyer_name            text,
  amount_cents          integer not null check (amount_cents >= 0),
  currency              text not null default 'KRW',
  stripe_session_id     text unique,
  stripe_payment_intent text unique,
  status                text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  metadata              jsonb not null default '{}'::jsonb,
  created_at            timestamptz not null default now(),
  paid_at               timestamptz
);

create index if not exists studio_purchases_email_idx   on public.studio_purchases (buyer_email);
create index if not exists studio_purchases_product_idx on public.studio_purchases (product_id);
create index if not exists studio_purchases_status_idx  on public.studio_purchases (status);

-- =====================================================================
-- 3. studio_blog_views — 블로그 조회수 (slug 단위 카운터)
-- =====================================================================
create table if not exists public.studio_blog_views (
  slug            text primary key,
  view_count      bigint not null default 0,
  last_viewed_at  timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

-- 원자 증가 RPC: 클라이언트에서 supabase.rpc('studio_increment_blog_view', { p_slug })
create or replace function public.studio_increment_blog_view(p_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  insert into public.studio_blog_views (slug, view_count, last_viewed_at)
  values (p_slug, 1, now())
  on conflict (slug) do update
    set view_count = studio_blog_views.view_count + 1,
        last_viewed_at = now()
  returning view_count into new_count;
  return new_count;
end;
$$;

-- =====================================================================
-- 4. studio_subscribers — 뉴스레터 구독자
-- =====================================================================
create table if not exists public.studio_subscribers (
  id              uuid primary key default gen_random_uuid(),
  email           text unique not null,
  name            text,
  source          text,
  status          text not null default 'active' check (status in ('active', 'unsubscribed', 'bounced')),
  subscribed_at   timestamptz not null default now(),
  unsubscribed_at timestamptz,
  metadata        jsonb not null default '{}'::jsonb
);

create index if not exists studio_subscribers_status_idx on public.studio_subscribers (status);

-- =====================================================================
-- 5. studio_contacts — 문의 기록
-- =====================================================================
create table if not exists public.studio_contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  source      text,
  status      text not null default 'new' check (status in ('new', 'replied', 'archived', 'spam')),
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  replied_at  timestamptz
);

create index if not exists studio_contacts_status_idx on public.studio_contacts (status);
create index if not exists studio_contacts_email_idx  on public.studio_contacts (email);

-- =====================================================================
-- updated_at 자동 갱신 트리거 (studio_products)
-- =====================================================================
create or replace function public.studio_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists studio_products_set_updated_at on public.studio_products;
create trigger studio_products_set_updated_at
  before update on public.studio_products
  for each row execute function public.studio_set_updated_at();

-- =====================================================================
-- RLS 활성화
-- =====================================================================
alter table public.studio_products    enable row level security;
alter table public.studio_purchases   enable row level security;
alter table public.studio_blog_views  enable row level security;
alter table public.studio_subscribers enable row level security;
alter table public.studio_contacts    enable row level security;

-- =====================================================================
-- RLS 정책
-- service_role 은 RLS 우회. anon/authenticated 만 명시 제어.
-- =====================================================================

-- studio_products: 활성 상품 공개 조회 / 쓰기 금지
drop policy if exists "studio_products_public_read" on public.studio_products;
create policy "studio_products_public_read"
  on public.studio_products for select
  to anon, authenticated
  using (active = true);

-- studio_purchases: 클라이언트 직접 접근 금지 (API Route + service_role 만)
-- 정책 미생성 = 모든 anon/authenticated 거부 (RLS 기본 동작)

-- studio_blog_views: 공개 조회 허용. 쓰기는 RPC(security definer) 경유
drop policy if exists "studio_blog_views_public_read" on public.studio_blog_views;
create policy "studio_blog_views_public_read"
  on public.studio_blog_views for select
  to anon, authenticated
  using (true);

grant execute on function public.studio_increment_blog_view(text) to anon, authenticated;

-- studio_subscribers: 누구나 구독(insert) 가능. 조회/수정/삭제 금지
drop policy if exists "studio_subscribers_public_insert" on public.studio_subscribers;
create policy "studio_subscribers_public_insert"
  on public.studio_subscribers for insert
  to anon, authenticated
  with check (
    status = 'active'
    and email is not null
    and length(email) <= 320
  );

-- studio_contacts: 누구나 문의(insert) 가능. 조회/수정/삭제 금지
drop policy if exists "studio_contacts_public_insert" on public.studio_contacts;
create policy "studio_contacts_public_insert"
  on public.studio_contacts for insert
  to anon, authenticated
  with check (
    status = 'new'
    and email is not null
    and length(email) <= 320
    and length(message) between 1 and 5000
  );

-- =====================================================================
-- 완료. Table Editor에서 studio_ 테이블 5개 확인.
-- =====================================================================
