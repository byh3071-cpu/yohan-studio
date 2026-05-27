import type { CSSProperties } from "react"
import Image from "next/image"
import type { ShowroomProject } from "@/data/showroomProjects"

const card: CSSProperties = {
  background: "var(--bg)",
  border: "var(--border-w) solid var(--line)",
  boxShadow: "var(--shadow)",
  padding: "22px 24px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  overflow: "hidden",
}

const imageWrap: CSSProperties = {
  position: "relative",
  aspectRatio: "16 / 9",
  margin: "-22px -24px 4px",
  borderBottom: "var(--border-w) solid var(--line)",
  background: "var(--surface)",
  overflow: "hidden",
}

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  paddingBottom: "12px",
  borderBottom: "1px solid var(--line)",
}

const cat: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 600,
  color: "var(--accent)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
}

const year: CSSProperties = {
  fontFamily: "var(--font-en)",
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--muted)",
  letterSpacing: "0.05em",
}

const title: CSSProperties = {
  fontSize: "24px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  lineHeight: 1.15,
}

const summary: CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: "var(--ink-2)",
}

const block: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  paddingTop: "10px",
  borderTop: "1px dashed var(--muted-2)",
}

const label: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
}

const text: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
}

const valueList: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: 0,
  margin: 0,
  listStyle: "none",
}

const valueItem: CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-2)",
  paddingLeft: "16px",
  position: "relative",
}

const valueBullet: CSSProperties = {
  position: "absolute",
  left: 0,
  top: "9px",
  width: "8px",
  height: "2px",
  background: "var(--accent)",
}

const audienceLine: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.04em",
  color: "var(--muted)",
  paddingTop: "10px",
  borderTop: "1px dashed var(--muted-2)",
}

const tags: CSSProperties = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
  marginTop: "4px",
}

const tagItem: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  fontFamily: "var(--font-mono)",
  padding: "3px 8px",
  border: "1px solid var(--line)",
  color: "var(--ink)",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
}

const links: CSSProperties = {
  display: "flex",
  gap: "12px",
  paddingTop: "10px",
  borderTop: "1px solid var(--line)",
}

const link: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  fontWeight: 700,
  color: "var(--accent)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  textDecoration: "none",
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: ShowroomProject
  priority?: boolean
}) {
  return (
    <article style={card} data-category={project.category}>
      {project.image && (
        <div style={imageWrap}>
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 400px"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={priority}
          />
        </div>
      )}
      <div style={top}>
        <span style={cat}>{project.category}</span>
        <span style={year}>{project.year}</span>
      </div>
      <h3 style={title}>{project.title}</h3>
      <p style={summary}>{project.summary}</p>
      {project.valueProps && project.valueProps.length > 0 ? (
        <>
          <div style={block}>
            <span style={label}>핵심</span>
            <ul style={valueList}>
              {project.valueProps.map((v) => (
                <li key={v} style={valueItem}>
                  <span style={valueBullet} />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          {project.audience && (
            <p style={audienceLine}>{`// 대상 — ${project.audience}`}</p>
          )}
        </>
      ) : (
        <>
          {project.problem && (
            <div style={block}>
              <span style={label}>문제</span>
              <p style={text}>{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div style={block}>
              <span style={label}>해결</span>
              <p style={text}>{project.solution}</p>
            </div>
          )}
          {project.learned && (
            <div style={block}>
              <span style={label}>배운 점</span>
              <p style={text}>{project.learned}</p>
            </div>
          )}
        </>
      )}
      <div style={tags}>
        {project.stack.map((s) => (
          <span key={s} style={tagItem}>{s}</span>
        ))}
      </div>
      {(project.github || project.demo) && (
        <div style={links}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer noopener" style={link}>
              GitHub →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer noopener" style={link}>
              Live →
            </a>
          )}
        </div>
      )}
    </article>
  )
}
