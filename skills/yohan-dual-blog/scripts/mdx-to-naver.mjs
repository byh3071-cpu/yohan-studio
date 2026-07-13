import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import matter from "gray-matter"

// MDX 블로그 글 → 네이버 라이트 마크다운 초안(.md). 형식(굵게·소제목·인용·리스트)을 보존해서
// naver-to-html.mjs 가 SE ONE 친화 HTML로 렌더 → [본문 복사] 붙여넣기 시 서식이 살아남는다.
// 이 .md 를 references/naver-structure.md 규칙대로 편집(‑다 통일·문단 1~3문장·용어 풀이·계절 1줄·
// 이모지 팔레트·[여기 네 말] 진솔슬롯) 후 → pnpm blog:naver:html -- <slug>
// 사용법: pnpm blog:naver -- <slug>

const slug = process.argv.slice(2).find((arg) => arg !== "--")

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("사용법: pnpm blog:naver -- <slug>")
  process.exit(1)
}

const root = process.cwd()
const inputPath = path.join(root, "src", "content", "blog", `${slug}.mdx`)
const outputDir = path.join(root, "docs", "content", "naver")
const outputPath = path.join(outputDir, `${slug}.md`)

if (!fs.existsSync(inputPath)) {
  console.error(`MDX 파일을 찾을 수 없습니다: ${inputPath}`)
  process.exit(1)
}

const source = fs.readFileSync(inputPath, "utf8")
const { data, content } = matter(source)

function readAttribute(block, name) {
  const match = block.match(new RegExp(`${name}="([^"]*)"`))
  return match?.[1]?.trim() ?? ""
}

function convertBlogImages(text) {
  return text.replace(/<BlogImage[\s\S]*?\/>/g, (block) => {
    const caption = readAttribute(block, "caption")
    const alt = readAttribute(block, "alt")
    return `\n[이미지 삽입: ${caption || alt || "본문 관련 이미지"}]\n`
  })
}

function convertLinks(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    if (url.startsWith("/blog/")) {
      return `${label}\nhttps://yohanstudio.co${url}`
    }
    // 인라인 외부 링크(오픈소스 참조 등)는 URL을 떼고 라벨만 남긴다.
    // 네이버 평문에서 문장 중간 URL은 흐름을 끊고 클릭도 안 되므로 최소화한다.
    return label
  })
}

// 마크다운 서식(##·**·*·>·-·`)은 보존한다 — naver-to-html 이 <h2>·<strong>·<blockquote>·<ul> 로 렌더.
// MDX 주석·HTML 주석·코드펜스 라인만 정리한다(명령어 내용 라인은 유지).
function normalizeMarkdown(text) {
  return text
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^```[^\n]*$/gm, "")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function toHashtag(tag) {
  return `#${String(tag).replace(/[\s/]+/g, "").replace(/[^\p{L}\p{N}_-]/gu, "")}`
}

const bodyMd = normalizeMarkdown(convertLinks(convertBlogImages(content)))
const tags = Array.isArray(data.tags) ? data.tags.slice(0, 8).map(toHashtag) : []

// 네이버 고정 슬롯 (studio 브랜드 보이스). 위치·문구는 편집 단계에서 조정 가능.
const INTRO_SIG = "- 비전공자가 AI와 함께 만들고 직접 검증한 기록입니다. -"
const OUTRO_SIG =
  "개발자가 아닌 사람이 AI와 함께 만드는 과정을 기록하고 있습니다.\n" +
  "부족한 부분도 많지만, 하나씩 만들어가며 남기려고 합니다."

// 제목은 # 로 (naver-to-html 이 제목 필드로 분리). 본문 = 마크다운.
const output = [
  `# ${String(data.title ?? slug)}`,
  "",
  INTRO_SIG,
  "",
  bodyMd,
  "",
  OUTRO_SIG,
  "",
  `원문: https://yohanstudio.co/blog/${slug}`,
  "",
  tags.join(" "),
  "",
].join("\n")

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputPath, output, "utf8")
console.log(`네이버 마크다운 초안 생성: ${outputPath}`)
console.log(`다음: naver-structure.md 규칙대로 편집(‑다·문단분절·용어풀이·계절·이모지·[여기 네 말] 진솔슬롯) → pnpm blog:naver:html -- ${slug}`)
