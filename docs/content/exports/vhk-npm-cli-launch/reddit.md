<!-- 원본: src/content/blog/vhk-npm-cli-launch.mdx · 변환: 2026-07-04 · 스펙: brain content-platform-specs/reddit.md v2026-07-04 -->
<!-- 샘플 1회 (시드 검증용). 대상: r/SideProject (발행 전 서브레딧 규칙·허용일 확인 절차 필수) -->

# Reddit post — r/SideProject (English)

## Title

I'm a barista with zero CS background — I built a CLI that refuses to let AI lie to me about "done", and shipped it to npm

## Body

**What I built:** VHK, a CLI that enforces work discipline when coding with AI. Three core commands: `vhk goal` (locks you to one goal at a time — 1 PR = 1 goal), `vhk check` (refuses to mark anything "done" if tests fail), `vhk preflight` (pre-release safety checks). Install: `npm i -g @byh3071/vhk`.

**Why:** I work at a café during the day and code with AI at night. The single biggest trap wasn't syntax — it was AI saying "all done!" when it wasn't. Buttons that didn't respond, output files that never existed. I once lost half a day debugging something the AI had claimed was finished. I realized willpower doesn't fix this; structure does. So I made the tool refuse false completion instead of me trying to remember to verify.

**How (stack):** TypeScript, Node 20+, commander, tsup, vitest. Built almost entirely by asking AI "what does this line do?" over and over — I still can't write code from scratch, but I can judge explanations.

**What broke / what I learned:**
- Publishing to npm was its own mountain: scoped package naming, versioning rules, and 2FA (OTP) — I deliberately kept the publish step manual (human-only auth) and only automated the pre-flight checks.
- The false-completion incident taught me the core principle: don't reduce mistakes, make them impossible. That one idea shaped the whole tool.
- Latest release is v2.5.1 with 1,162 passing tests and 47 goal documents accumulated along the way.

**What feedback I'm looking for:** If you code with AI agents — what does your verification loop look like? Do you gate "done" on anything mechanical, or is it vibes? Also curious whether "one goal per PR" feels too strict to experienced devs.

(Link to the full write-up with real terminal screenshots is in the comments if anyone wants it.)

---

## 발행 전 절차 체크 (스펙 내장)
- [ ] r/SideProject 규칙 페이지 확인 (스토리텔링형 요구 — 충족)
- [ ] 홍보 허용일 확인 (Share Your Project Saturday 여부)
- [ ] 링크는 본문이 아닌 첫 댓글에 1개 (위 마지막 줄 방식)

## 예상 질문 + 답변 초안 (댓글 대응)

1. **"Why not just use git hooks / CI?"** — Fair. VHK sits earlier in the loop: it gates the *conversation* with the AI (goal scoping, "done" claims) before anything reaches CI. CI catches broken code; VHK catches broken process.
2. **"1,162 tests for a CLI? Overkill?"** — The test count grew with the tool because the tool eats its own dog food — every false-completion incident became a regression test. It's less about coverage bragging, more about the tool distrusting itself by design.
3. **"Can non-devs really maintain this?"** — Honestly, maintenance is me + AI, with the same gates. The point isn't that I understand every line — it's that the verification structure doesn't depend on my understanding.
