"use client"

import { useMemo } from "react"
import type { CSSProperties } from "react"
import { useSearchParams } from "next/navigation"
import {
  SHOWROOM_CATEGORIES,
  type ShowroomCategory,
  type ShowroomProject,
} from "@/data/showroomProjects"
import { ProjectCard } from "./ProjectCard"
import { CategoryFilter, ALL, type FilterValue } from "./CategoryFilter"

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
  gap: "24px",
}

const empty: CSSProperties = {
  padding: "48px 0",
  textAlign: "center",
  fontFamily: "var(--font-mono)",
  fontSize: "13px",
  color: "var(--muted)",
}

function parseCat(raw: string | null): FilterValue {
  if (!raw) return ALL
  return (SHOWROOM_CATEGORIES as readonly string[]).includes(raw)
    ? (raw as ShowroomCategory)
    : ALL
}

export function ProjectGrid({ projects }: { projects: ShowroomProject[] }) {
  const params = useSearchParams()
  const active = parseCat(params?.get("cat") ?? null)

  const filtered = useMemo(() => {
    if (active === ALL) return projects
    return projects.filter((p) => p.category === active)
  }, [active, projects])

  return (
    <>
      <CategoryFilter active={active} />
      {filtered.length === 0 ? (
        <div style={empty}>이 카테고리엔 아직 프로젝트가 없다.</div>
      ) : (
        <div style={grid}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 3} />
          ))}
        </div>
      )}
    </>
  )
}
