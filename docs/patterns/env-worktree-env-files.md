---
pattern: git worktree에서 .env.local 누락으로 dev 서버 401/env 미인식
category: env
discovered: 2026-05-28
source_project: yohan-studio
source_devlog: docs/log/2026-05-28.md
tags: [git, worktree, env, gitignore, next.js, dev-server]
---

# 패턴 — git worktree에서 .env.local 누락

## 증상

`git worktree`로 새 작업 폴더를 만들고 dev 서버를 띄우면:

- API 호출에서 `401 Invalid authentication credentials`
- `{"error":"GOOGLE_GENERATIVE_AI_API_KEY not configured"}` 같은 환경 변수 미설정 오류
- 기존 작업 폴더(master)에서는 정상 동작하는데 worktree에서만 실패

## 원인

`git worktree`는 **추적되는 파일만 브랜치 기준으로 동기화**한다. `.env.local`, `.env`, `.env.*.local` 등은 통상 `.gitignore`에 들어가 git이 추적하지 않으므로 **worktree마다 별개의 파일**로 취급된다.

- `.git` 메타데이터만 worktree 간 공유
- 추적 파일: 브랜치 상태에 따라 동기화
- 추적 안 되는 파일 (`.env.local`, `node_modules`, `.next` 등): 각 worktree에서 **따로 관리**

신규 worktree에 `.env.local`이 없으면 Next.js (또는 다른 프레임워크) dev 서버는 환경 변수를 못 읽어 인증 실패한다.

## 해결

원본 worktree의 `.env.local`을 신규 worktree로 복사:

```powershell
# Windows PowerShell
Copy-Item C:\path\to\main-worktree\.env.local C:\path\to\new-worktree\.env.local
```

```bash
# bash/zsh
cp /path/to/main-worktree/.env.local /path/to/new-worktree/.env.local
```

복사 후 dev 서버 **재시작 필수** (env var은 프로세스 시작 시점에만 로드).

### 대안 — 심볼릭 링크 (Windows는 관리자 권한 필요)

```powershell
New-Item -ItemType SymbolicLink -Path .\new-worktree\.env.local -Target ..\main-worktree\.env.local
```

```bash
ln -s ../main-worktree/.env.local ./new-worktree/.env.local
```

심볼릭 링크는 한 곳만 수정해도 모든 worktree에 반영되지만, 권한·플랫폼 차이로 손이 많이 갈 수 있다. 단순 복사가 가장 안전하다.

## 적용 조건

- `git worktree`로 신규 작업 폴더를 만들 때
- 추적 안 되는 환경 설정 파일을 쓰는 프로젝트 (`.env*`, `*.local.json`, `secrets/*` 등)
- dev 서버 / API 라우트가 환경 변수에 의존하는 경우

## 관련 패턴

- `node_modules`도 worktree마다 따로 설치 필요 (디스크 중복, 또는 pnpm + workspace 또는 심볼릭 링크 고려)
- 포트 충돌: 여러 worktree에서 동시에 dev 서버 띄울 때 `PORT` env 분리 필요

## 검증 체크리스트

신규 worktree에서 dev 서버 시작 전:

```powershell
Test-Path .\worktree-path\.env.local   # True여야 함
```

False면 복사 후 진행.
