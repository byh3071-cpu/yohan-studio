import type { CSSProperties } from "react"

// 6 Q&A — answer-engine friendly. 자연어 질의를 그대로 받도록 한 문장 핵심 + 부연 한 단락.
// 콘텐츠 변경 시 schema.org FAQPage 가 자동 동기화된다 (mainEntity 매핑이 이 배열 그대로).
const faqs: { q: string; a: string }[] = [
  {
    q: "바이브코더가 뭐예요?",
    a:
      "코드를 직접 타이핑하기보다 AI 코드 에이전트(Claude Code, Codex, Cursor 등)에게 시키고, 결과물을 검증·통합하는 1인 개발 방식이다. 사람은 프롬프팅·시스템 설계·의사결정에, AI는 실행에 집중한다. 바이브코더는 그 패턴을 일하는 방식으로 받아들이고 1인 기업으로 운영하는 사람을 가리킨다.",
  },
  {
    q: "왜 카페에서 시작했어요?",
    a:
      "바리스타로 일하면서 매장에서 반복되는 작업을 어떻게 자동화할지 고민하던 게 시드가 됐다. AI 도구를 손에 익혀가면서 1인 기업이 가능하다는 가설이 점점 단단해졌고, 그 흐름을 그대로 요한 스튜디오라는 브랜드로 묶었다.",
  },
  {
    q: "어떤 도구를 쓰세요?",
    a:
      "코딩은 Claude Code(메인 구현) + Codex(역검증·리뷰), 디자인은 Claude Design + 레퍼런스 큐레이션(Lazyweb·Mobbin·Savee), 문서·태스크는 Notion, 자동화는 n8n, 배포는 Vercel. 모두 1인이 직접 운영할 수 있는 스택이다.",
  },
  {
    q: "AI에 어디까지 맡기세요?",
    a:
      "코드 작성, 디자인 시안, 문서 초안, 콘텐츠 드래프트, 리뷰까지. 의사결정·검증·정렬·고객 대화는 사람이 한다. AI 결과물을 그대로 출시하지 않고 항상 사람이 한 번 통과시키는 게 원칙이다.",
  },
  {
    q: "포트폴리오 작업 의뢰가 가능해요?",
    a:
      "1인 운영이라 받을 수 있는 작업이 한정적이다. byh3071@gmail.com 으로 프로젝트 개요·예산·일정을 보내면 가능 여부를 답변한다.",
  },
  {
    q: "스토어는 언제 열어요?",
    a:
      "Phase 3(2026-05-17 ~ 2026-05-30) 기간에 Supabase + Stripe 결제로 베타 오픈을 목표로 한다. 첫 상품은 노션 템플릿과 자동화 워크플로 패키지를 검토하고 있다.",
  },
]

const section: CSSProperties = {
  background: "var(--surface)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = {
  maxWidth: "var(--max-w)",
  margin: "0 auto",
  width: "100%",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
}

const eyeMark: CSSProperties = {
  display: "inline-block",
  width: "20px",
  height: "8px",
  background: "var(--accent)",
}

const heading: CSSProperties = {
  fontSize: "clamp(32px, 5vw, 56px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  lineHeight: 1.05,
  color: "var(--ink)",
  marginBottom: "12px",
}

const lede: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--ink-2)",
  maxWidth: "560px",
  marginBottom: "48px",
}

const list: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
  listStyle: "none",
  padding: 0,
  margin: 0,
}

const item: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow-sm)",
  padding: "22px 24px",
}

const question: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
  marginBottom: "10px",
  display: "flex",
  alignItems: "baseline",
  gap: "10px",
}

const qMark: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "13px",
  fontWeight: 700,
  color: "var(--accent)",
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
}

const answer: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.75,
  color: "var(--ink-2)",
  margin: 0,
}

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }

  return (
    <section id="faq" style={section}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={inner}>
        <div style={eyebrow}>
          <span style={eyeMark} />
          04 / FAQ · 자주 묻는 질문
        </div>
        <h2 style={heading}>물어볼 만한 것들.</h2>
        <p style={lede}>
          답변 엔진(ChatGPT · Perplexity · Gemini)이 인용해도 그대로 쓸 수 있도록, 한 문장 핵심 + 한 단락 부연 구조로 정리했다.
        </p>
        <ul style={list} className="faq-list">
          {faqs.map(({ q, a }, i) => (
            <li key={q} style={item}>
              <h3 style={question}>
                <span style={qMark}>Q{String(i + 1).padStart(2, "0")}</span>
                <span>{q}</span>
              </h3>
              <p style={answer}>{a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
