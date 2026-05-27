import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import type { ShowroomFaqItem, ShowroomProject } from "@/data/showroomProjects"

const section: CSSProperties = {
  background: "var(--bg)",
  padding: "96px 24px",
  borderBottom: "var(--border-w) solid var(--line)",
}

const inner: CSSProperties = { maxWidth: "var(--max-w)", margin: "0 auto" }

const back: CSSProperties = {
  display: "inline-block",
  marginBottom: "28px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  color: "var(--accent)",
  textDecoration: "none",
}

const metaRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px 20px",
  marginBottom: "16px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.05em",
}

const cat: CSSProperties = { color: "var(--accent)", textTransform: "uppercase" }

const h1: CSSProperties = {
  fontSize: "clamp(36px, 5vw, 56px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
  lineHeight: 1.05,
  color: "var(--ink)",
  marginBottom: "16px",
}

const lead: CSSProperties = {
  fontSize: "18px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  maxWidth: "720px",
  marginBottom: "32px",
}

const heroImg: CSSProperties = {
  position: "relative",
  aspectRatio: "16 / 9",
  maxWidth: "960px",
  marginBottom: "48px",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  background: "var(--surface-2)",
  overflow: "hidden",
}

const block: CSSProperties = {
  marginBottom: "40px",
  paddingBottom: "32px",
  borderBottom: "1px dashed var(--muted-2)",
}

const h2: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "14px",
}

const body: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--ink-2)",
  maxWidth: "720px",
}

const valueList: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: 0,
  margin: 0,
  listStyle: "none",
  maxWidth: "720px",
}

const valueItem: CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "var(--ink-2)",
  paddingLeft: "18px",
  position: "relative",
}

const bullet: CSSProperties = {
  position: "absolute",
  left: 0,
  top: "11px",
  width: "10px",
  height: "2px",
  background: "var(--accent)",
}

const tags: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
}

const tag: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  fontFamily: "var(--font-mono)",
  padding: "4px 10px",
  border: "1px solid var(--line)",
  color: "var(--ink)",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
}

const links: CSSProperties = { display: "flex", flexWrap: "wrap", gap: "16px" }

const extLink: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 700,
  color: "var(--accent)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  textDecoration: "none",
}

const faqH2: CSSProperties = {
  ...h2,
  fontSize: "14px",
  color: "var(--ink)",
  marginBottom: "24px",
}

const faqH3: CSSProperties = {
  fontSize: "18px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  marginBottom: "10px",
  marginTop: "24px",
}

function getDetailSections(project: ShowroomProject) {
  if (project.valueProps && project.valueProps.length > 0) {
    return {
      problem:
        project.problem ??
        project.audience ??
        project.summary,
      solution:
        project.solution ??
        "임베드 가능한 HTML 위젯 세트로 노션 대시보드를 확장합니다.",
      result:
        project.result ??
        project.valueProps[0] ??
        project.summary,
      valueProps: project.valueProps,
    }
  }

  return {
    problem: project.problem,
    solution: project.solution,
    result: project.result ?? project.learned,
    valueProps: undefined as string[] | undefined,
  }
}

function defaultFaq(project: ShowroomProject): ShowroomFaqItem[] {
  return [
    {
      question: `${project.title}은 어떤 문제를 해결하나요?`,
      answer: project.summary,
    },
    {
      question: "기술 스택은 무엇인가요?",
      answer: project.stack.join(", "),
    },
  ]
}

export function ShowroomProjectDetail({ project }: { project: ShowroomProject }) {
  const sections = getDetailSections(project)
  const faq = project.faq?.length ? project.faq : defaultFaq(project)

  return (
    <section style={section}>
      <div style={inner}>
        <Link href="/showroom" style={back}>
          ← SHOWROOM INDEX
        </Link>
        <header>
          <div style={metaRow}>
            <span style={cat}>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1 style={h1}>{project.title}</h1>
          <p style={lead}>{project.summary}</p>
        </header>

        {project.image && (
          <div style={heroImg}>
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.title} 대표 이미지`}
              fill
              sizes="(max-width: 960px) 100vw, 960px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        {sections.problem && (
          <section style={block}>
            <h2 style={h2}>문제</h2>
            <p style={body}>{sections.problem}</p>
          </section>
        )}

        {sections.solution && (
          <section style={block}>
            <h2 style={h2}>해결</h2>
            {sections.valueProps ? (
              <ul style={valueList}>
                {sections.valueProps.map((v) => (
                  <li key={v} style={valueItem}>
                    <span style={bullet} />
                    {v}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={body}>{sections.solution}</p>
            )}
          </section>
        )}

        {sections.result && (
          <section style={block}>
            <h2 style={h2}>결과</h2>
            <p style={body}>{sections.result}</p>
          </section>
        )}

        <section style={block}>
          <h2 style={h2}>사용 기술</h2>
          <div style={tags}>
            {project.stack.map((s) => (
              <span key={s} style={tag}>
                {s}
              </span>
            ))}
          </div>
        </section>

        {(project.github || project.demo) && (
          <section style={block}>
            <h2 style={h2}>링크</h2>
            <div style={links}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={extLink}
                >
                  GitHub →
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={extLink}
                >
                  Live / Demo →
                </a>
              )}
            </div>
          </section>
        )}

        <section style={{ marginBottom: 0 }}>
          <h2 style={faqH2}>자주 묻는 질문</h2>
          {faq.map((item) => (
            <div key={item.question}>
              <h3 style={faqH3}>{item.question}</h3>
              <p style={body}>{item.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </section>
  )
}
