# Website v2 — Editorial × Soft Brutalism (Phase 1)

**v2** is the new design direction — moving away from generic AI-SaaS aesthetics toward editorial brutalism with personality.

## Phase 1 Scope (current)
- **Color:** Off-white `#F4F1EA` × Ink `#0A0A0A` × Single accent `#FF5C28`
- **Type:** Pretendard only (serif headlines deferred to Phase 2)
- **Layout:** Asymmetric Hero (1.7fr text + 1fr metadata box) + simple auto-fill grid
- **Surface:** `border-radius: 0`, 1.5px ink border, hard shadow `4px 4px 0 #0A0A0A`
- **Motion:** None
- **Theme:** Light off-white only — CSS vars structured so `[data-theme="dark"]` can flip in Phase 2

## Files
- `index.html` — entry; loads tokens.css and JSX components
- `tokens.css` — design tokens (light + dark placeholder)
- `V2Header.jsx` — sticky header with hard bottom border + accent CTA
- `V2Hero.jsx` — asymmetric two-column: editorial title + metadata box
- `V2Portfolio.jsx` — brutalist card grid (8 projects, hard shadow, mono labels)
- `V2Footer.jsx` — inverted ink footer with mono column labels

## Phase 2 (deferred)
- Korean serif headlines (Paperlogy / Gowun Batang / KoPub Batang)
- Bento grid for Featured (blog 3 + store 3)
- Functional micro-motion (scroll progress, hover meta-reveal)
- Dark mode activation via `[data-theme="dark"]`
- About timeline · Contact form · Featured section
