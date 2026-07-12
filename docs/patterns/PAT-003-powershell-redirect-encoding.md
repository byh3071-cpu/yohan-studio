---
id: PAT-003
패턴명: PowerShell 리다이렉트 UTF-16 인코딩으로 인한 파일 비교 오판
카테고리: env
증상: "git show나 명령 출력을 PowerShell `>` 리다이렉트로 파일에 저장한 뒤 원본과 비교하면, 내용이 같은데도 전체 라인이 '다름'으로 판정된다 (Compare-Object·diff 모두)."
원인: "Windows PowerShell 5.1의 `>`/`Out-File` 기본 인코딩이 UTF-16 LE(BOM)라서, UTF-8 원본과 바이트 단위로 전부 달라진다. 내용 차이가 아니라 인코딩 차이."
해결: "①파일 비교는 리다이렉트 없이 `git diff --no-index a b`로 직접. ②리다이렉트가 꼭 필요하면 `| Out-File -Encoding utf8` 명시. ③줄바꿈(LF/CRLF)까지 무시하려면 bash에서 `diff <(tr -d '\\r' < a) <(tr -d '\\r' < b)`."
적용조건: "Windows PowerShell 5.1 환경에서 명령 출력을 파일로 저장해 다른 파일과 비교하는 모든 작업 (pwsh 7은 기본 UTF-8이라 해당 없음)."
출처프로젝트: yohan-studio
태그: [powershell, encoding, git, windows, file-compare]
발견일: 2026-07-13
출처DevLog: "[2026-07-13] [세션로그] 쇼룸 플렉시블 보강·정렬 정비 + 머지 게이트 정리"
---

# PAT-003 — PowerShell 리다이렉트 UTF-16 인코딩으로 인한 파일 비교 오판

## 상황 재현
다른 세션의 untracked 파일과 원격 커밋본이 같은지 확인하려고:

```powershell
git show origin/master:docs/foo.txt > "$env:TEMP\remote.txt"   # ← UTF-16으로 저장됨
Compare-Object (Get-Content "docs/foo.txt") (Get-Content "$env:TEMP\remote.txt")
# → 155개 라인 차이 (실제 내용은 100% 동일)
```

이 오판 때문에 "로컬 사본이 더 진행된 버전일 수 있다"는 잘못된 결론을 내리고 백업 파일을 만들었다. 실제로는 인코딩 허상.

## 올바른 비교

```powershell
# 커밋본 vs 워킹트리 파일 — 리다이렉트 자체를 쓰지 않는다
git diff --no-index path\to\local.txt path\to\other.txt
```

```bash
# 줄바꿈 차이까지 무시하고 내용만 비교 (bash)
diff <(tr -d '\r' < a.txt) <(tr -d '\r' < b.txt) && echo "내용 동일"
```

## 교훈
- "다르다"는 비교 결과가 나오면 **몇 줄이 다른지가 아니라 전 라인이 다른지**부터 본다. 전 라인 차이 = 인코딩/줄바꿈 의심 신호.
- 비교 도구를 통과시키기 전에 비교 대상을 만든 파이프라인(리다이렉트·인코딩)이 중립적인지 먼저 의심한다.
