<!-- 원본: src/content/blog/overnight-loop-anatomy.mdx · 변환: 2026-07-05 · 스펙: brain content-platform-specs/reddit.md v2026-07-04 -->
<!-- 타겟: r/ClaudeAI (대안: r/AI_Agents). 발행 전 절차: 서브레딧 최신 규칙 확인 → 링크는 본문 아님(요청 시 댓글) -->

# Reddit — r/ClaudeAI

## Title
Anatomy of my overnight fix loop: AI found 27 defects and fixed 4 while I slept — the 4-stage design that makes it safe

## Body
Follow-up to my last post about leaving agents unattended for 2 days. Several people asked how the overnight loop actually works, so here's the anatomy.

**The one rule everything hangs on: zero merges overnight.** The AI can propose, never apply.

**Stage 1 — Discover.** Multiple audit agents split the repos. Every defect candidate needs a file:line and reproducible evidence — suspicion without proof gets dropped. That night: 27 candidates survived.

**Stage 2 — Fix, within a budget.** There's a nightly cap on fix attempts, taken in severity order. The cap isn't about AI capacity — it's sized to how many PRs I can actually review the next morning. Whatever doesn't get attempted carries over to the next night's queue (nothing silently dropped).

**Stage 3 — Adversarial review.** A separate agent attacks each fix: is it actually fixed, did you break something else, did you touch anything out of scope? Three rejections = the fix is abandoned and reported as "couldn't fix." Only survivors become PRs.

**Stage 4 — Morning report.** Verdict-first: merge/discard recommendation per PR with reasoning, abandoned items with causes, untouched backlog. My entire job is reading it and clicking (or not clicking) merge.

**What broke (the embarrassing part):** one night all 4 fixes passed adversarial review — looked perfect. The morning report revealed there were only 2 real defects. Dedup ran on defect *titles*, so the same bug under two names sailed through twice. Half the night's budget went to fixing things twice.

But here's why I still trust the system: the morning report is also what *caught* the duplication, and discarding the dupes cost a few clicks. That inefficiency became the top improvement for the next run — same-file defects now get batched into one PR.

Takeaway: unattended AI isn't about better models. It's about making failure cheap — nothing irreversible happens at night, so every mistake is a morning click away from being undone.

Happy to share the stage diagram / config details in comments.

## 예상 질문 & 답변 준비

**Q: What enforces "zero merges"?**
A: The loop's git rules explicitly forbid merge/close/force-push, and the workflow only has permissions to push branches and open PRs. Merge requires a human on GitHub.

**Q: Isn't 3-strikes-then-abandon wasteful?**
A: Cheaper than the alternative. An agent that can't satisfy its adversarial reviewer in 3 rounds is usually fighting a design problem, not a bug — those need human judgment anyway. Abandoned items come back with full context in the report.

**Q: How do you stop the auditors from flooding you with nitpicks?**
A: Evidence requirement + severity sort + the nightly cap. Low-severity items pile up in the carry-over queue and get batch-reviewed when there's budget.

## 발행 전 체크
- [ ] r/ClaudeAI 최신 셀프프로모션 규칙 확인
- [ ] 링크는 본문에 넣지 않음 — 댓글 요청 시에만
- [ ] 전편 포스트에 이어지는 팔로업임을 첫 줄에 명시 (커뮤니티 맥락)
- [ ] 발행 시간대: 미국 아침 (KST 밤 10시~새벽 1시)
