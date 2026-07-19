---
id: PAT-005
패턴명: Git Bash MSYS 경로 변환이 CLI 인자를 오염
카테고리: env
증상: gh pr create --title "/updates ..." 처럼 선행 슬래시로 시작하는 인자가 "C:/Program Files/Git/updates ..."로 둔갑. PR 제목·커밋 메시지·API 페이로드 오염.
원인: Git Bash(MSYS2)가 슬래시로 시작하는 인자를 POSIX 경로로 판단해 Windows 경로로 자동 변환. 문자열 의도 여부를 구분하지 못함.
해결: 해당 명령 앞에 MSYS_NO_PATHCONV=1 접두 (예 - MSYS_NO_PATHCONV=1 gh pr edit 65 --title "..."). 또는 인자가 슬래시로 시작하지 않게 문구 조정.
적용조건: Windows Git Bash에서 슬래시 시작 문자열을 CLI 인자로 넘기는 모든 경우 (gh·curl·docker 등).
출처프로젝트: yohan-studio
태그: [git-bash, msys, windows, gh-cli]
발견일: 2026-07-19
출처DevLog: docs/log/2026-07-19.md
---

# PAT-005 — Git Bash MSYS 경로 변환이 CLI 인자를 오염

## 사고 경위

yohan-studio PR #65 생성 시 `--title "/updates 제품 릴리즈 노트 섹션 …"`의 선행 `/updates`가
`C:/Program Files/Git/updates`로 변환된 채 GitHub에 전달 → PR 제목과 스쿼시 머지 커밋 메시지가 오염됐다.
PR 제목은 `gh pr edit`로 정정했으나 머지 커밋은 브랜치 보호(force-push 불가)로 그대로 남음.

## 규칙

- Git Bash에서 `/`로 시작하는 문자열 인자 → **반드시 `MSYS_NO_PATHCONV=1` 접두** 또는 문구 재구성.
- PowerShell 도구로 실행하면 이 변환 자체가 없다 (대안 경로).
