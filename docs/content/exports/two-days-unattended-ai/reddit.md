<!-- 원본: src/content/blog/two-days-unattended-ai.mdx · 변환: 2026-07-05 · 스펙: brain content-platform-specs/reddit.md v2026-07-04 -->
<!-- 타겟: r/ClaudeAI (대안: r/AI_Agents). 발행 전 절차: 해당 서브레딧 최신 규칙 확인 → 셀프프로모 규칙 체크 → 링크는 본문 아님(요청 시 댓글) -->

# Reddit — r/ClaudeAI

## Title
I left AI agents unattended for 2 days (I'm a barista, can't code). 34 PRs came back — here's what actually made it safe

## Body
Last week I tried unattended AI agents and it went badly — an overnight fix loop lost its config, silently fell back to defaults, and created 6 PRs in the wrong repos. Nobody noticed for 8.5 hours.

This week I tried again, but with three rules baked in. Left the agents running for 2 days, was away from my desk about half the time.

**The three rules:**

1. **Die loudly on incomplete config.** No silent fallbacks, ever. The same config bug actually happened again this week — but this time the loop died in 0.2 seconds with a clear error instead of 8 hours of wrong work.
2. **AI never merges.** Every change stops at a PR. The merge button is mine.
3. **Separate the fixer from the checker.** Every fix gets attacked by a different agent whose only job is to prove it wrong. No pass, no PR.

**Results:** 34 PRs created, 29 merged after review, 3 closed as duplicates. One agent even refused a task because it was outside its role ("this is implementer work, I'm the shipper") — which is exactly what I wanted the rules to do.

**What broke (3 things):**

- API stalled 3 times mid-run. Agents had finished investigating, so feeding the judgment back resumed them.
- One installer hung silently for hours looking "in progress" while actually dead. Humans still needed for this.
- The overnight loop found the same defect twice and fixed it twice — 4 PRs were really 2 defects. That inefficiency became the next improvement, which is already merged.

**The best output wasn't code.** An agent discovered that a folder path containing my non-ASCII (Korean) Windows username silently kills vitest's forked workers — no assertion failure, the process just dies ("Worker exited unexpectedly"). That trap was lurking in every project on this machine and I had no idea.

Biggest takeaway: unattended AI is a trust-structure problem, not a model-quality problem. Incidents didn't go to zero — they went from 8-hour incidents to minute-long ones.

Happy to share the gate diagram / more details in comments if anyone's interested.

## 예상 질문 & 답변 준비

**Q: What tools/stack?**
A: Claude Code with subagents (fixer/reviewer separation), a workflow script for the overnight loop, GitHub PRs as the only output channel. The "die loudly" rule is literally a validation block at the top of the loop script.

**Q: How is the adversarial check different from just running tests?**
A: Tests catch what you thought to test. The reviewer agent gets one instruction: prove this fix wrong. It caught 2 major issues this week that passed all tests — including a batching bug reproduced with an actual script.

**Q: Isn't 29/34 merged basically rubber-stamping?**
A: The 29 went through two layers (adversarial agent + my review). The interesting number is the 3 closed as duplicates and 2 rejected majors — the gate did reject things.

## 발행 전 체크
- [ ] r/ClaudeAI 최신 셀프프로모션 규칙 확인
- [ ] 링크는 본문에 넣지 않음 — 댓글 요청 시에만
- [ ] 발행 시간대: 미국 아침 (KST 밤 10시~새벽 1시)
