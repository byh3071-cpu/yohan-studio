import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import matter from "gray-matter"

// 네이버 라이트 마크다운(.md) → SE ONE 친화 HTML(.html)
// 사용법: node naver-to-html.mjs <slug|입력.md>
//   slug 주면 docs/content/naver/<slug>.md 를 읽어 같은 폴더에 .html 생성
//   직접 .md 경로 주면 같은 위치에 .html 생성
// 목적: 브라우저에서 [본문 복사] 클릭 → 네이버 글쓰기에 Ctrl+V → 굵게·소제목·리스트·링크 유지.

const arg = process.argv.slice(2).find((a) => a !== "--")
if (!arg) {
  console.error("사용법: node naver-to-html.mjs <slug|입력.md>")
  process.exit(1)
}

const root = process.cwd()
let inputPath = arg
if (!arg.endsWith(".md") && !arg.includes("/") && !arg.includes("\\")) {
  inputPath = path.join(root, "docs", "content", "naver", `${arg}.md`)
}
if (!fs.existsSync(inputPath)) {
  console.error(`입력 파일 없음: ${inputPath}`)
  process.exit(1)
}
const outputPath = inputPath.replace(/\.md$/i, ".html")

const { content } = matter(fs.readFileSync(inputPath, "utf8"))

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

// 인라인 변환 (순서 중요: 마커 → 링크 → 굵게 → 기울임 → 코드)
function inline(text) {
  let t = esc(text)
  t = t.replace(/\[이미지 삽입:\s*([^\]]+)\]/g, '<span class="imgmark">\u{1F5BC} 이미지: $1</span>')
  t = t.replace(/\[여기 네 말:\s*([^\]]+)\]/g, '<span class="myslot">\u{270D} 여기 네 말: $1</span>')
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  t = t.replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>")
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>")
  return t
}

const lines = content.replace(/\r\n/g, "\n").split("\n")
const out = []
let title = ""
let i = 0

const isSpecial = (s) =>
  /^#{1,3}\s+/.test(s) || /^>\s?/.test(s) || /^[-*]\s+/.test(s) || /^\d+\.\s+/.test(s) || /^---+$/.test(s)

while (i < lines.length) {
  const t = lines[i].trim()
  if (t === "") { i++; continue }
  if (/^#\s+/.test(t) && !title) { title = t.replace(/^#\s+/, ""); i++; continue }
  if (/^###\s+/.test(t)) { out.push(`<h3>${inline(t.replace(/^###\s+/, ""))}</h3>`); i++; continue }
  if (/^##\s+/.test(t)) { out.push(`<h2>${inline(t.replace(/^##\s+/, ""))}</h2>`); i++; continue }
  if (/^---+$/.test(t)) { out.push("<hr>"); i++; continue }
  if (/^>\s?/.test(t)) {
    const q = []
    while (i < lines.length && /^>\s?/.test(lines[i].trim())) { q.push(lines[i].trim().replace(/^>\s?/, "")); i++ }
    out.push(`<blockquote>${q.map(inline).join("<br>")}</blockquote>`)
    continue
  }
  // 고정멘트 등 양끝 대시로 감싼 캡션 (예: "- 비개발자가 … 기록입니다. -") — 리스트로 오인 방지
  if (/^-\s+.+\s-$/.test(t)) { out.push(`<p class="caption">${inline(t)}</p>`); i++; continue }
  if (/^[-*]\s+/.test(t)) {
    const items = []
    while (i < lines.length && /^[-*]\s+/.test(lines[i].trim()) && !/^-\s+.+\s-$/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^[-*]\s+/, "")); i++ }
    out.push(`<ul>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`)
    continue
  }
  if (/^\d+\.\s+/.test(t)) {
    const items = []
    while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s+/, "")); i++ }
    out.push(`<ol>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</ol>`)
    continue
  }
  const para = []
  while (i < lines.length && lines[i].trim() !== "" && !isSpecial(lines[i].trim())) { para.push(lines[i].trim()); i++ }
  out.push(`<p>${para.map(inline).join("<br>")}</p>`)
}

const body = out.join("\n")

const style = `
.wrap{max-width:720px;margin:0 auto;padding:16px;background:#fbfbfb;color:#1a1a1a;line-height:1.75;font-family:'Apple SD Gothic Neo',Pretendard,'Malgun Gothic',sans-serif}
.bar{background:#eafaf0;border:1px solid #b6e6c9;border-radius:8px;padding:10px 12px;font-size:13px;color:#175c33;margin-bottom:14px}
.titlebox{background:#f0f0f0;border-radius:8px;padding:10px 12px;margin-bottom:10px;font-size:15px;color:#1a1a1a}
.titlebox .lbl{color:#888;font-size:12px;margin-right:6px}
.titlebox button,.copybtn{font-family:inherit;cursor:pointer}
.titlebox button{margin-left:8px;background:#fff;border:1px solid #ccc;border-radius:6px;padding:3px 10px;font-size:12px}
.copybtn{display:block;width:100%;background:#03c75a;color:#fff;border:0;border-radius:8px;padding:12px;font-size:15px;font-weight:700;margin-bottom:14px}
.copybtn:active{opacity:.8}
article{background:#fff;border:1px solid #eee;border-radius:8px;padding:20px;color:#1a1a1a}
article h2{font-size:20px;margin:22px 0 10px;font-weight:800}
article h3{font-size:17px;margin:18px 0 8px;font-weight:700}
article p{margin:0 0 14px}
article strong{font-weight:800}
article blockquote{background:#f7f7f9;border-left:4px solid #03c75a;margin:0 0 14px;padding:10px 14px;border-radius:0 8px 8px 0}
article ul,article ol{margin:0 0 14px;padding-left:22px}
article li{margin:4px 0}
article a{color:#0a6cff;text-decoration:underline}
article hr{border:0;border-top:1px dashed #ccc;margin:18px 0}
.caption{text-align:center;color:#8a8a8a;font-size:14px}
.imgmark{display:inline-block;background:#fff4e5;border:1px dashed #f0a94b;border-radius:6px;padding:1px 8px;color:#a5651a;font-size:13px}
.myslot{display:inline-block;background:#fff3c4;border:1px dashed #e0c000;border-radius:6px;padding:1px 8px;color:#7a6a00;font-size:13px}
.legend{margin-top:12px;font-size:12px;color:#888}
`

const script = `
function copyRich(id){
  var el=document.getElementById(id);
  var r=document.createRange(); r.selectNodeContents(el);
  var s=window.getSelection(); s.removeAllRanges(); s.addRange(r);
  var ok=false; try{ok=document.execCommand('copy')}catch(e){}
  s.removeAllRanges();
  var b=document.getElementById('cpbtn'); if(b){var o=b.getAttribute('data-o'); b.textContent= ok?'✅ 복사됨 — 네이버에 Ctrl+V':'복사 실패(수동 선택)'; setTimeout(function(){b.textContent=o},2200)}
}
function copyText(id){
  var t=document.getElementById(id).textContent;
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t)}
  else{var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(ta)}
}
`

const page = `<style>${style}</style>
<div class="wrap">
  <div class="bar"><strong>네이버 붙여넣기 미리보기</strong> — [본문 복사]를 누르고 네이버 글쓰기(SE ONE)에 Ctrl+V. 굵게·소제목·리스트·링크는 유지, 인용·구분선·스티커는 에디터에서 수동.</div>
  <div class="titlebox"><span class="lbl">제목</span><span id="ttl">${esc(title)}</span><button onclick="copyText('ttl')">제목 복사</button></div>
  <button class="copybtn" id="cpbtn" data-o="\u{1F4CB} 본문 복사 (서식 유지)" onclick="copyRich('article')">\u{1F4CB} 본문 복사 (서식 유지)</button>
  <article id="article">
${body}
  </article>
  <div class="legend">\u{1F5BC} = 이미지 넣을 자리 · ✍ = 네가 직접 쓸 진솔 슬롯(자동생성 안 함)</div>
</div>
<script>${script}</script>`

fs.writeFileSync(outputPath, page, "utf8")
console.log(`생성: ${outputPath}`)
