import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import matter from "gray-matter"

// 네이버 라이트 마크다운(.md) → SE ONE 친화 HTML
// 사용법: node naver-to-html.mjs <slug|입력.md>
// 출력 2개:
//   <이름>.html          — 사람 미리보기 (안내 바·제목 복사·본문 복사 버튼 포함)
//   <이름>.fragment.html — 클립보드/자동 주입용 순수 본문 (래퍼 0)
//
// 실발행 격식 (2026-07-19 발행글 실측 — m.blog.naver.com/yohan3071/224316171488):
//   · 섹션(##)마다 앞에 구분선(<hr> → SE ONE 구분선 컴포넌트로 자동 매핑)
//   · 섹션 제목 = 19px 굵게 (h2 태그가 아니라 인라인 font-size — 발행글과 동일한 시각 위계)
//   · 문단 사이 제로폭 공백(U+200B) 단독 문단으로 여백 리듬
//   · 해시태그 줄은 본문에서 제외 — 발행창 태그 입력에 등록 (발행글 본문엔 해시태그 없음)

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
const fragmentPath = inputPath.replace(/\.md$/i, ".fragment.html")

const { content } = matter(fs.readFileSync(inputPath, "utf8"))

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

// 인라인 변환 (순서 중요: 마커 → 링크 → 굵게 → 기울임 → 코드)
// mode: "preview"(클래스) | "fragment"(인라인 스타일 — 페이스트 시 클래스는 소실되므로)
function inline(text, mode) {
  const img =
    mode === "fragment"
      ? '<span style="background-color:#fff19b;font-weight:700;">\u{1F5BC} 이미지: $1</span>'
      : '<span class="imgmark">\u{1F5BC} 이미지: $1</span>'
  const slot =
    mode === "fragment"
      ? '<span style="background-color:#ffe08a;font-weight:700;">\u{270D} 여기 네 말: $1</span>'
      : '<span class="myslot">\u{270D} 여기 네 말: $1</span>'
  let t = esc(text)
  // 확장 문법: [이미지 삽입: 설명 | https://…] — URL이 있으면 실제 <img>로.
  // SE ONE은 붙여넣은 외부 <img>를 이미지 컴포넌트로 변환한다 (2026-07-20 에디터 실측).
  // 라이브 블로그 이미지 URL을 쓰면 수동 삽입 단계가 사라진다.
  t = t.replace(/\[이미지 삽입:\s*([^\]|]+?)\s*\|\s*(https?:[^\]\s]+)\]/g, '<img src="$2" alt="$1">')
  t = t.replace(/\[이미지 삽입:\s*([^\]]+)\]/g, img)
  t = t.replace(/\[여기 네 말:\s*([^\]]+)\]/g, slot)
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  t = t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
  t = t.replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>")
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>")
  return t
}

const lines = content.replace(/\r\n/g, "\n").split("\n")
let title = ""
let i = 0
const hashtags = []

const isSpecial = (s) =>
  /^#{1,3}\s+/.test(s) || /^>\s?/.test(s) || /^[-*]\s+/.test(s) || /^\d+\.\s+/.test(s) || /^---+$/.test(s)

// 1패스: 블록 목록 수집 (렌더는 모드별 2패스)
const blocks = []
while (i < lines.length) {
  const t = lines[i].trim()
  if (t === "") { i++; continue }
  if (/^#\s+/.test(t) && !title) { title = t.replace(/^#\s+/, ""); i++; continue }
  // 해시태그 줄 → 본문 제외, 태그 목록으로
  if (/^#[^\s#]/.test(t) && t.split(/\s+/).every((w) => w.startsWith("#"))) {
    hashtags.push(...t.split(/\s+/).map((w) => w.replace(/^#/, "")))
    i++
    continue
  }
  if (/^###\s+/.test(t)) { blocks.push({ type: "h3", text: t.replace(/^###\s+/, "") }); i++; continue }
  if (/^##\s+/.test(t)) { blocks.push({ type: "h2", text: t.replace(/^##\s+/, "") }); i++; continue }
  if (/^---+$/.test(t)) { blocks.push({ type: "hr" }); i++; continue }
  if (/^>\s?/.test(t)) {
    const q = []
    while (i < lines.length && /^>\s?/.test(lines[i].trim())) { q.push(lines[i].trim().replace(/^>\s?/, "")); i++ }
    blocks.push({ type: "quote", items: q })
    continue
  }
  // 양끝 대시 캡션 (예: "- 비전공자가 … 기록입니다. -") — 리스트로 오인 방지
  if (/^-\s+.+\s-$/.test(t)) { blocks.push({ type: "caption", text: t }); i++; continue }
  if (/^[-*]\s+/.test(t)) {
    const items = []
    while (i < lines.length && /^[-*]\s+/.test(lines[i].trim()) && !/^-\s+.+\s-$/.test(lines[i].trim())) {
      items.push(lines[i].trim().replace(/^[-*]\s+/, "")); i++
    }
    blocks.push({ type: "ul", items })
    continue
  }
  if (/^\d+\.\s+/.test(t)) {
    const items = []
    while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s+/, "")); i++ }
    blocks.push({ type: "ol", items })
    continue
  }
  const para = []
  while (i < lines.length && lines[i].trim() !== "" && !isSpecial(lines[i].trim())) { para.push(lines[i].trim()); i++ }
  blocks.push({ type: "p", lines: para })
}

// 2패스: 모드별 렌더. 격식 규칙은 여기 한 곳에만 둔다.
function render(mode) {
  const out = []
  const GAP = "<p>​</p>"
  for (const b of blocks) {
    switch (b.type) {
      case "h2":
        out.push("<hr>")
        out.push(
          mode === "fragment"
            ? `<p><span style="font-size:19px;"><b>${inline(b.text, mode)}</b></span></p>`
            : `<h2>${inline(b.text, mode)}</h2>`,
        )
        break
      case "h3":
        out.push(
          mode === "fragment"
            ? `<p><b>${inline(b.text, mode)}</b></p>`
            : `<h3>${inline(b.text, mode)}</h3>`,
        )
        break
      case "hr":
        out.push("<hr>")
        break
      case "quote":
        out.push(`<blockquote>${b.items.map((x) => inline(x, mode)).join("<br>")}</blockquote>`)
        break
      case "caption":
        // 고정멘트 취향: 가운데 정렬 + 회색(#c2c2c2), 이탤릭 없음 (2026-07-20 발행본 요한 수동수정 실측)
        out.push(
          mode === "fragment"
            ? `<p style="text-align: center;"><span style="color: #c2c2c2;">${inline(b.text, mode)}</span></p>`
            : `<p class="caption">${inline(b.text, mode)}</p>`,
        )
        break
      case "ul":
        out.push(`<ul>${b.items.map((x) => `<li>${inline(x, mode)}</li>`).join("")}</ul>`)
        break
      case "ol":
        out.push(`<ol>${b.items.map((x) => `<li>${inline(x, mode)}</li>`).join("")}</ol>`)
        break
      case "p":
        out.push(`<p>${b.lines.map((x) => inline(x, mode)).join("<br>")}</p>`)
        break
    }
  }
  // 문단 사이 여백 리듬: hr 인접부를 제외한 모든 블록 사이에 제로폭 공백 문단
  const spaced = []
  for (let k = 0; k < out.length; k++) {
    spaced.push(out[k])
    const cur = out[k], next = out[k + 1]
    if (next && cur !== "<hr>" && next !== "<hr>") spaced.push(GAP)
  }
  return spaced.join("\n")
}

const previewBody = render("preview")
const fragmentBody = render("fragment")

fs.writeFileSync(fragmentPath, `<div>\n${fragmentBody}\n</div>\n`, "utf8")

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
article h2{font-size:19px;margin:22px 0 10px;font-weight:800}
article h3{font-size:16px;margin:18px 0 8px;font-weight:700}
article p{margin:0 0 14px}
article b,article strong{font-weight:800}
article blockquote{background:#f7f7f9;border-left:4px solid #03c75a;margin:0 0 14px;padding:10px 14px;border-radius:0 8px 8px 0}
article ul,article ol{margin:0 0 14px;padding-left:22px}
article li{margin:4px 0}
article a{color:#0a6cff;text-decoration:underline}
article hr{border:0;border-top:1px dashed #ccc;margin:18px 0}
article img{max-width:100%;height:auto;display:block;border:1px solid #eee;border-radius:8px}
.caption{text-align:center;color:#8a8a8a;font-size:14px}
.imgmark{display:inline-block;background:#fff4e5;border:1px dashed #f0a94b;border-radius:6px;padding:1px 8px;color:#a5651a;font-size:13px}
.myslot{display:inline-block;background:#fff3c4;border:1px dashed #e0c000;border-radius:6px;padding:1px 8px;color:#7a6a00;font-size:13px}
.legend{margin-top:12px;font-size:12px;color:#888}
.tags{margin-top:8px;font-size:13px;color:#175c33;background:#eafaf0;border:1px solid #b6e6c9;border-radius:8px;padding:8px 12px}
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

const tagsLine = hashtags.length
  ? `<div class="tags">\u{1F3F7} 발행창 태그 입력에 등록 (본문에 넣지 않음): ${hashtags.map(esc).join(", ")}</div>`
  : ""

const page = `<style>${style}</style>
<div class="wrap">
  <div class="bar"><strong>네이버 붙여넣기 미리보기</strong> — [본문 복사]를 누르고 네이버 글쓰기(SE ONE)에 Ctrl+V. 구분선·19px 소제목·여백까지 자동. 이미지는 형광펜 자리에 수동.</div>
  <div class="titlebox"><span class="lbl">제목</span><span id="ttl">${esc(title)}</span><button onclick="copyText('ttl')">제목 복사</button></div>
  <button class="copybtn" id="cpbtn" data-o="\u{1F4CB} 본문 복사 (서식 유지)" onclick="copyRich('article')">\u{1F4CB} 본문 복사 (서식 유지)</button>
  <article id="article">
${fragmentBody}
  </article>
  ${tagsLine}
  <div class="legend">\u{1F5BC} = 이미지 넣을 자리 · ✍ = 네가 직접 쓸 진솔 슬롯(자동생성 안 함) · 자동 주입은 .fragment.html 사용</div>
</div>
<script>${script}</script>`

fs.writeFileSync(outputPath, page, "utf8")
console.log(`생성: ${outputPath}`)
console.log(`생성: ${fragmentPath} (클립보드/자동 주입용 — 래퍼 없음)`)
if (hashtags.length) console.log(`태그(발행창에 등록): ${hashtags.join(", ")}`)
