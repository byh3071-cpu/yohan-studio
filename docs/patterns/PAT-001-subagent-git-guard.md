---
id: PAT-001
패턴명: 서브에이전트 Git 가드 — branch 검증 + reviewer read-only
카테고리: git
발견일: 2026-05-20
출처프로젝트: Yohan Studio
출처DevLog: https://app.notion.com/3669740ab0728156a281dfaee4919919
태그: [git, subagent, workflow, worktree]
---

## 증상

subagent-driven 실행 중 reviewer 서브에이전트가 `git stash apply` / branch 조작을 수행해 메인 working tree가 깨지는 사고. 또는 implementer 서브에이전트가 잘못된(엉뚱한) 브랜치에 커밋을 붙임.

## 원인

- 서브에이전트에 **git 쓰기 권한**을 준 채, 현재 브랜치 컨텍스트를 검증하지 않고 dispatch.
- 병렬 에이전트가 **하나의 working tree를 공유**하면 한 에이전트의 stash/branch 조작이 다른 에이전트 작업을 덮어쓴다(공유 HEAD = 사고).
- reviewer는 "읽기만 한다"는 암묵 가정 — 실제로는 stash/checkout 같은 쓰기 동작이 가능.

## 해결

1. **implementer dispatch 전** 프롬프트에 `git branch --show-current` 검증 + 기대 브랜치와 다르면 **BLOCKED 가드**(작업 중단).
2. **reviewer 서브에이전트는 read-only Bash만** 허용 — `stash`/`branch`/`checkout`/`commit` 등 git 쓰기 동작을 프롬프트에서 명시적으로 금지.
3. 병렬 쓰기 충돌 위험이 있으면 **git worktree로 격리**(working tree 분리). 커밋 시 `git add -A` 금지, **경로 지정 add**만(병렬 에이전트 WIP 혼입 방지).

## 적용 조건

- subagent-driven development / 병렬 멀티에이전트 실행
- 서브에이전트에 git 접근(특히 쓰기)을 부여하는 모든 워크플로
- 한 레포를 여러 세션/에이전트가 동시에 건드릴 때
