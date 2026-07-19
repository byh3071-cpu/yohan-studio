---
id: PAT-006
패턴명: fs 의존 lib의 상수를 클라이언트가 import하면 빌드 실패 — shared 모듈 분리
카테고리: build
증상: Next.js 빌드에서 "Module not found: Can't resolve 'fs'". import trace가 "use client" 컴포넌트 → fs 의존 lib로 이어짐.
원인: 타입 import(import type)는 컴파일 시 지워지지만, 런타임 값(상수·함수)을 "use client" 컴포넌트가 import하면 lib 전체가 클라이언트 번들에 포함 → fs/path 등 node 모듈 해석 실패.
해결: 클라이언트도 쓰는 상수·타입을 별도 파일(예 - updatesShared.ts)로 분리. 서버 lib은 그 파일을 import + re-export해 서버 소비자 API는 유지. 클라이언트 컴포넌트는 shared 파일만 import.
적용조건: Next.js(App Router)에서 fs·db 등 서버 전용 의존을 가진 lib의 상수/enum을 클라이언트 컴포넌트가 써야 할 때.
출처프로젝트: yohan-studio
태그: [nextjs, use-client, bundle, fs]
발견일: 2026-07-19
출처DevLog: docs/log/2026-07-19.md
---

# PAT-006 — 클라이언트 안전 모듈 분리

## 사고 경위

/updates 필터 칩이 `PRODUCTS` 상수(런타임 값)를 `src/lib/updates.ts`(gray-matter·compileMDX·fs 의존)에서
import → Turbopack 빌드 실패. blog.ts가 같은 구조에서 안 터졌던 이유는 TagFilter가 **타입만** import했기 때문.

## 규칙

- "use client" 파일에서 서버 lib의 **값**을 import하는 순간이 위험 지점. 타입은 안전.
- 해법은 3층: ① 상수·타입 → `*Shared.ts` 분리 ② 서버 lib이 re-export(기존 소비자 무수정) ③ 클라이언트는 shared만 import.
- `import "server-only"`를 서버 lib에 선언하면 이 실수를 컴파일 타임에 조기 검출할 수 있다 (notion.ts가 선례).
