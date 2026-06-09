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
    return `${label}\n${url}`
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

const output = [
  "제목",
  String(data.title ?? slug),
  "",
  "본문",
  converted,
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
