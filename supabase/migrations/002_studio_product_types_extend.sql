-- =====================================================================
-- 002 — studio_products.product_type 허용값 확장
-- 추가: 'prompt' (프롬프트 팩), 'automation' (자동화 워크플로우)
-- =====================================================================

alter table public.studio_products
  drop constraint if exists studio_products_product_type_check;

alter table public.studio_products
  add constraint studio_products_product_type_check
  check (product_type in (
    'template',
    'tool',
    'course',
    'ebook',
    'prompt',
    'automation'
  ));
