import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import matter from "gray-matter"

const slug = process.argv.slice(2).find((arg) => arg !== "--")

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("사용법: pnpm blog:naver -- <slug>")
  process.exit(1)
}

const root = process.cwd()
const inputPath = path.join(root, "src", "content", "blog", `${slug}.mdx`)
const outputDir = path.join(root, "docs", "content", "naver")
const outputPath = path.join(outputDir, `${slug}.txt`)

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

function normalizeText(text) {
  return text
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^```[^\n]*$/gm, "")
    .replace(/^#{2,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/ {2,}\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function toHashtag(tag) {
  return `#${String(tag).replace(/[\s/]+/g, "").replace(/[^\p{L}\p{N}_-]/gu, "")}`
}

const converted = normalizeText(convertLinks(convertBlogImages(content)))
const tags = Array.isArray(data.tags) ? data.tags.slice(0, 8).map(toHashtag) : []

// 네이버 고정 서명 (studio 브랜드 보이스 — 도입/결말). 위치는 초안 후 수동 조정 가능.
const INTRO_SIG = "- 비전공자가 AI와 함께 만들고 직접 검증한 기록입니다. -"
const OUTRO_SIG =
  "개발자가 아닌 사람이 AI와 함께 만드는 과정을 기록하고 있습니다.\n" +
  "부족한 부분도 많지만, 하나씩 만들어가며 남기려고 합니다."

const output = [
  "제목",
  String(data.title ?? slug),
  "",
  "본문",
  INTRO_SIG,
  "",
  converted,
  "",
  OUTRO_SIG,
  "",
  "원문",
  `https://yohanstudio.co/blog/${slug}`,
  "",
  "해시태그",
  tags.join(" "),
  "",
].join("\n")

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputPath, output, "utf8")
console.log(`네이버 평문 초안을 생성했습니다: ${outputPath}`)
