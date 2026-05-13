import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "디자인 히스토리",
  description: "요한 스튜디오 v1 → v2 진화, AI 도구 분업, 로드맵.",
  alternates: { canonical: "/design" },
}

type EvolutionRow = { label: string; v1: string; v2: string }

const evolution: EvolutionRow[] = [
  { label: "톤", v1: "Slate 다크모드", v2: "Editorial × Soft Brutalism" },
  { label: "배경", v1: "#0F172A (dark)", v2: "#F4F1EA (off-white paper)" },
  { label: "텍스트", v1: "#F1F5F9", v2: "#0A0A0A (ink)" },
  { label: "강조", v1: "#60A5FA + 그라디언트", v2: "#FF5C28 only · 그라디언트 없음" },
  { label: "모서리", v1: "rounded-lg", v2: "rounded-none" },
  { label: "보더", v1: "soft 1px", v2: "1.5px solid ink" },
  { label: "그림자", v1: "blur shadow (rgba)", v2: "4px 4px 0 ink (hard, blur 0)" },
  { label: "타이포 헤드라인", v1: "Pretendard 700", v2: "Pretendard 800 · ls -0.04em" },
  { label: "테마 전환", v1: "다크 고정", v2: "[data-theme] + system + URL ?theme=" },
]

type AiRole = {
  name: string
  scope: string
  detail: string
  tag: string
}

const aiRoles: AiRole[] = [
  {
    name: "Claude Design",
    scope: "시각 시안",
    detail: "Editorial × Soft Brutalism 톤 정의, 컬러 토큰 결정, 카드 레이아웃, 다크 팔레트 분기.",
    tag: "DESIGN",
  },
  {
    name: "Claude Code",
    scope: "구현",
    detail: "Next.js 컴포넌트 변환, MDX 인프라, ToC IntersectionObserver, 토큰 정합화.",
    tag: "BUILD",
  },
  {
    name: "Cursor",
    scope: "초기 MVP",
    detail: "Phase 1 이전의 빠른 프로토타입 — 플렉시블, 노션 커스텀 대시보드. Tab 기반 인라인 코드 생성.",
    tag: "MVP",
  },
  {
    name: "Codex",
    scope: "리뷰 · 역검증",
    detail: "구현 후 코드 리뷰, 버그 탐색, 빌드/타입 점검. 같은 파일 동시 수정 금지로 분업.",
    tag: "REVIEW",
  },
  {
    name: "Notion AI (노뚝이)",
    scope: "기록",
    detail: "세션로그 · ADR · 트러블슈팅 · TIL 자동 정리. Dev Log DB에 적재.",
    tag: "DOCS",
  },
]

type RoadmapItem = {
  phase: string
  title: string
  status: "완료" | "진행 중" | "예정"
  items: string[]
}

const roadmap: RoadmapItem[] = [
  {
    phase: "Phase 1",
    title: "랜딩 + 포트폴리오",
    status: "완료",
    items: [
      "v1 디자인 (Slate 톤) Vercel 배포",
      "Hero · Portfolio · About · Featured · Contact 섹션",
      "Pretendard + JetBrains Mono 폰트 시스템",
    ],
  },
  {
    phase: "Phase 2",
    title: "블로그 + SEO + v2 디자인",
    status: "완료",
    items: [
      "Editorial × Soft Brutalism 마이그레이션",
      "MDX 블로그 (/blog, /blog/[slug]) + ToC + CodeBlock",
      "sitemap · robots · OG · JSON-LD · GA · GSC",
      "다크모드 (system + manual + URL param)",
    ],
  },
  {
    phase: "Phase 3",
    title: "스토어 · 결제 · 뉴스레터",
    status: "예정",
    items: [
      "Supabase Postgres 연결",
      "Stripe 결제 흐름",
      "디지털 상품 다운로드 게이트",
      "뉴스레터 구독",
    ],
  },
  {
    phase: "Phase 4",
    title: "자동화 배포",
    status: "예정",
    items: [
      "n8n 멀티채널 자동 발행",
      "Notion → 블로그 동기화",
      "Dev Log 자동 백필",
    ],
  },
]

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "48px 24px 96px",
  borderBottom: "var(--border-w) solid var(--line)",
}
const inner: CSSProperties = { maxWidth: "880px", margin: "0 auto" }

const back: CSSProperties = {
  display: "inline-block",
  marginBottom: "24px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "var(--accent)",
}

const pageHead: CSSProperties = {
  paddingBottom: "28px",
  marginBottom: "48px",
  borderBottom: "var(--border-w) solid var(--line)",
}
const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "10px",
}
const pageTitle: CSSProperties = {
  fontSize: "clamp(36px, 5.5vw, 64px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
}
const accent: CSSProperties = { color: "var(--accent)" }
const pageSub: CSSProperties = {
  marginTop: "16px",
  fontSize: "16px",
  color: "var(--ink-2)",
  lineHeight: 1.6,
}

const block: CSSProperties = { marginTop: "56px" }
const blockHead: CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "16px",
  paddingBottom: "16px",
  marginBottom: "24px",
  borderBottom: "var(--border-w) solid var(--line)",
}
const blockEyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
}
const blockTitle: CSSProperties = {
  fontSize: "clamp(22px, 3vw, 32px)",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
}

// Evolution table styles
const tableWrap: CSSProperties = {
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  background: "var(--bg)",
}
const tRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "var(--design-table-cols, 120px 1fr 1fr)",
  gap: "var(--design-table-gap, 16px)",
  padding: "14px 18px",
  borderBottom: "1px dashed var(--muted-2)",
  alignItems: "baseline",
}
const tRowLast: CSSProperties = { ...tRow, borderBottom: "none" }
const tHeader: CSSProperties = {
  ...tRow,
  background: "var(--surface)",
  borderBottom: "var(--border-w) solid var(--line)",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--muted)",
}
const tLabel: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--muted)",
}
const tV1: CSSProperties = { fontSize: "14px", color: "var(--ink-2)" }
const tV2: CSSProperties = { fontSize: "14px", fontWeight: 600, color: "var(--ink)" }

// AI roles cards
const aiGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px",
}
const aiCard: CSSProperties = {
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  background: "var(--bg)",
  padding: "18px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}
const aiTagRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "10px",
  borderBottom: "1px solid var(--line)",
}
const aiName: CSSProperties = {
  fontSize: "16px",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
}
const aiTag: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  color: "var(--accent)",
}
const aiScope: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--muted)",
}
const aiDetail: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
}

// Roadmap list
const phaseList: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}
const phaseCard: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "var(--design-phase-cols, 180px 1fr)",
  gap: "var(--design-phase-gap, 24px)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  background: "var(--bg)",
  padding: "20px 22px",
}
const phaseLeft: CSSProperties = { display: "flex", flexDirection: "column", gap: "6px" }
const phaseLabel: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--accent)",
}
const phaseTitle: CSSProperties = {
  fontSize: "17px",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
  lineHeight: 1.25,
}
function phaseStatusStyle(status: RoadmapItem["status"]): CSSProperties {
  const base: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "3px 8px",
    border: "1px solid var(--line)",
    alignSelf: "flex-start",
    marginTop: "4px",
  }
  if (status === "완료") return { ...base, background: "var(--accent)", color: "var(--accent-ink)", borderColor: "var(--accent)" }
  if (status === "진행 중") return { ...base, background: "var(--bg)", color: "var(--accent)", borderColor: "var(--accent)" }
  return { ...base, background: "var(--surface-2)", color: "var(--muted)" }
}
const phaseItems: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: "14px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
}
const phaseItem: CSSProperties = { paddingLeft: "16px", position: "relative" }
const phaseBullet: CSSProperties = {
  position: "absolute",
  left: 0,
  top: "8px",
  width: "6px",
  height: "6px",
  background: "var(--accent)",
}

const responsiveDesignStyles = `
@media (max-width: 640px) {
  .design-evolution-table {
    --design-table-cols: 1fr;
    --design-table-gap: 8px;
  }

  .design-evolution-header {
    display: none !important;
  }

  .design-evolution-row {
    padding: 16px !important;
  }

  .design-evolution-row > span {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .design-evolution-row > span:nth-child(2)::before,
  .design-evolution-row > span:nth-child(3)::before {
    display: block;
    margin-bottom: 4px;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .design-evolution-row > span:nth-child(2)::before {
    content: "v1";
  }

  .design-evolution-row > span:nth-child(3)::before {
    content: "v2";
  }

  .design-phase-card {
    --design-phase-cols: 1fr;
    --design-phase-gap: 16px;
  }
}
`

export default function DesignHistoryPage() {
  return (
    <section style={section}>
      <style>{responsiveDesignStyles}</style>
      <div style={inner}>
        <Link href="/" style={back}>
          ← HOME
        </Link>
        <header style={pageHead}>
          <div style={eyebrow}>{"// DESIGN"}</div>
          <h1 style={pageTitle}>
            디자인 히스토리<span style={accent}>.</span>
          </h1>
          <p style={pageSub}>
            시각 언어의 진화, AI 도구의 분업, 그리고 다음 4단계.
          </p>
        </header>

        <div style={block}>
          <div style={blockHead}>
            <div>
              <div style={blockEyebrow}>{"// 01 — 진화"}</div>
              <h2 style={blockTitle}>v1 → v2</h2>
            </div>
          </div>
          <div className="design-evolution-table" style={tableWrap}>
            <div className="design-evolution-header" style={tHeader}>
              <span>속성</span>
              <span>v1 (Slate)</span>
              <span>v2 (Editorial × Brutalism)</span>
            </div>
            {evolution.map((r, i) => (
              <div
                key={r.label}
                className="design-evolution-row"
                style={i === evolution.length - 1 ? tRowLast : tRow}
              >
                <span style={tLabel}>{r.label}</span>
                <span style={tV1}>{r.v1}</span>
                <span style={tV2}>{r.v2}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={block}>
          <div style={blockHead}>
            <div>
              <div style={blockEyebrow}>{"// 02 — AI 분업"}</div>
              <h2 style={blockTitle}>도구별 역할</h2>
            </div>
          </div>
          <div style={aiGrid}>
            {aiRoles.map((r) => (
              <article key={r.name} style={aiCard}>
                <div style={aiTagRow}>
                  <span style={aiName}>{r.name}</span>
                  <span style={aiTag}>{r.tag}</span>
                </div>
                <div style={aiScope}>{r.scope}</div>
                <p style={aiDetail}>{r.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div style={block}>
          <div style={blockHead}>
            <div>
              <div style={blockEyebrow}>{"// 03 — 로드맵"}</div>
              <h2 style={blockTitle}>다음 4단계</h2>
            </div>
          </div>
          <div style={phaseList}>
            {roadmap.map((p) => (
              <article key={p.phase} className="design-phase-card" style={phaseCard}>
                <div style={phaseLeft}>
                  <span style={phaseLabel}>{p.phase}</span>
                  <h3 style={phaseTitle}>{p.title}</h3>
                  <span style={phaseStatusStyle(p.status)}>{p.status}</span>
                </div>
                <div style={phaseItems}>
                  {p.items.map((it) => (
                    <span key={it} style={phaseItem}>
                      <span style={phaseBullet} aria-hidden />
                      {it}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
