import { getPublishedPosts } from "@/lib/blog"
import { getAllShowroomProjects } from "@/lib/showroom"
import { SITE_CONFIG } from "@/data/siteConfig"
import { getSiteUrl } from "@/lib/siteUrl"

// 빌드 시 1회 정적 생성. 블로그·쇼룸 항목이 늘면 다음 빌드에 자동 반영된다.
// AEO/GEO: 생성형 엔진이 전체 콘텐츠 맵(URL+요약)을 한 파일로 수집하도록.
export const dynamic = "force-static"

export function GET() {
  const base = getSiteUrl()
  const posts = getPublishedPosts()
  const projects = getAllShowroomProjects()

  const lines: string[] = [
    `# ${SITE_CONFIG.name} (${SITE_CONFIG.englishName}) — Full Index`,
    "",
    `> ${SITE_CONFIG.tagline}`,
    "",
    "## Pages",
    ...SITE_CONFIG.pages.map((p) => `- [${p.path}](${base}${p.path}): ${p.desc}`),
    "",
    "## Blog — all published posts",
    ...posts.map(
      (post) =>
        `- [${post.title}](${base}/blog/${post.slug}) (${post.date}): ${post.description}`,
    ),
    "",
    "## Showroom — all projects",
    ...projects.map(
      (pj) =>
        `- [${pj.title}](${base}/showroom/${pj.slug}) [${pj.category}]: ${pj.summary}`,
    ),
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
