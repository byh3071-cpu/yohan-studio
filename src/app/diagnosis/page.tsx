import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { DiagnosisForm } from "@/components/diagnosis/DiagnosisForm"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { PageFaq, type FaqItem } from "@/components/seo/PageFaq"

export const metadata: Metadata = {
  // Layout template appends "| 요한 스튜디오", so the brand isn't repeated here.
  title: "A'Im Scan — 1인 기업 자가진단",
  description:
    "7영역 × 3문항 = 21문항으로 AI 시대 1인 기업의 운영 체계를 진단한다. 방향·전략·구조·수익화·프롬프트·디자인·의사결정.",
  alternates: { canonical: "/diagnosis" },
}

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "880px", margin: "0 auto" }

const head: CSSProperties = {
  paddingBottom: "32px",
  marginBottom: "40px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "12px",
}

const title: CSSProperties = {
  fontSize: "clamp(36px, 6vw, 56px)",
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--ink)",
  marginBottom: "16px",
}

const accentMark: CSSProperties = { color: "var(--accent)" }

const lead: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "620px",
}

const faqs: FaqItem[] = [
  {
    q: "A'Im Scan은 무엇을 진단하나요?",
    a: "AI 시대 1인 기업의 운영 체계를 7개 영역(방향·전략·구조·수익화·프롬프트·디자인·의사결정)으로 나눠, 영역당 3문항씩 총 21문항으로 진단한다. 각 영역 점수와 종합 레벨로 어디가 비어 있는지 보여준다.",
  },
  {
    q: "진단 결과가 저장되나요?",
    a: "아니다. 결과는 이 페이지 안에서만 계산·표시되며 서버에 저장되지 않는다. 가입이나 로그인 없이 바로 풀 수 있다.",
  },
  {
    q: "진단에 얼마나 걸리나요?",
    a: "21문항이라 보통 3~5분이면 끝난다. 직관적으로 답할 수 있게 각 문항을 짧게 구성했다.",
  },
  {
    q: "진단 후에는 뭘 하면 되나요?",
    a: "결과에서 약한 영역을 확인한 뒤, 더 깊은 해석과 30일 실행 처방이 필요하면 A'Im Scan Report 서비스로 이어가면 된다.",
  },
]

export default function DiagnosisPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", path: "/" },
          { name: "진단", path: "/diagnosis" },
        ]}
      />
      <section style={section}>
        <div style={inner}>
          <div style={head}>
            <div style={eyebrow}>{"// A'IM SCAN v0.1 — 21문항"}</div>
            <h1 style={title}>
              1인 기업 자가진단<span style={accentMark}>.</span>
            </h1>
            <p style={lead}>
              7개 영역·21문항으로 운영 체계의 빈 곳을 찾는다. 결과는 이 페이지에만 표시되며 저장되지 않는다.
            </p>
          </div>
          <DiagnosisForm />
        </div>
      </section>
      <PageFaq
        eyebrow="// FAQ — 진단 자주 묻는 질문"
        heading="진단, 물어볼 만한 것들."
        faqs={faqs}
      />
    </>
  )
}
