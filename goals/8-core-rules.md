---
vhk_format: 1
type: goal
id: 8
title: T8 .agents/CORE-RULES.md 코어 규칙 상속 (YS1)
status: DONE
priority: P1
branch: feat/core-rules-inheritance
completed: 2026-06-16
---

# Goal 8: YS1 — core-ruleset 마커블록 상속

## 작업

- [x] `.agents/CORE-RULES.md` 생성 — core-ruleset.yaml v0.1.0 렌더
- [x] 마커블록 (`<!-- CORE-RULES:START/END -->`) 적용 — vhk goal71 동일 패턴
- [x] 마커 밖 yohan-studio 특화 섹션 stub 추가

## 완료 기준

- [x] `.agents/CORE-RULES.md` 존재 + 마커 START/END 포함
- [x] 특화 섹션에 보호 파일·브랜치 정책·빌드 게이트·DB prefix 명시
- [x] `npm run build` + `npm run lint` 통과 (파일 추가 only, 코드 변경 없음)

## 참고

- 원본 SoT: `yohan-brain/memory/core/core-ruleset.yaml`
- 마커 패턴 정본: `vhk/src/lib/core-rules.ts` (goal71 구현)
- 연관 결정: `yohan-brain/memory/decisions/2026-06-16-1500-fable5-absorption-code-sprint.md`
