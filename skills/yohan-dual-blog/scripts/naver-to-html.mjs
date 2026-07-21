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

// ── 브랜드 이모지 (2026-07-21 SE ONE 실측 확정) ────────────────────────────
// 유니코드 이모지를 요한 브랜드 아이콘(오렌지 실루엣 PNG)으로 치환한다.
// SoT: src/data/emojiSet.json · 규칙 상세: references/naver-structure.md §4
//
// 실측으로 확정된 제약 (전부 우회 불가):
//   · style 속성은 붙여넣기에서 통째로 제거 → margin·vertical-align 보정 불가
//   · height≠width로 줘도 정사각으로 강제 정규화됨
//   · data URI img는 제거됨 → 외부 http URL만 생존
//   · 간격은 &nbsp;만 통함 (일반 공백·margin 모두 소실)
//   · img는 baseline에 고정되어 유니코드 이모지보다 3.6px 위에 앉는다.
//     보정 수단이 없어, 비교 대상이 생기는 문장 중간 사용은 금지하고
//     줄 맨 앞에서만 쓴다(요한 확정 2026-07-21).
const EMOJI_BASE = "https://yohanstudio.co/images/emoji"
// 크기는 그 줄의 글자 크기에 맞춰야 한다. 고정값을 쓰면 소제목 옆에서 아이콘만 작아 보인다.
const EMOJI_PX_BODY = 16 // 본문 15px 기준 — 14px는 작고 17px부터 위로 뜨는 게 보인다
// 소제목은 <b>로 굵어져 글자의 시각 무게가 커진다. 폰트 크기 비례(19/15 → 20px)만 쓰면
// 아이콘이 눌려 보인다 — 실측으로 굵기 보정분을 더해 22px로 잡았다(24px는 줄을 밀어낸다).
const EMOJI_PX_H2 = 22
// 매핑은 SoT에서 읽는다 — 하드코딩하면 세트를 늘릴 때 여기만 빠진다.
// 변이 선택자(️ U+FE0F)가 붙은 형태도 함께 등록해야 원고에서 어느 쪽으로 써도 잡힌다.
const emojiSet = JSON.parse(
  fs.readFileSync(path.join(root, "src", "data", "emojiSet.json"), "utf8"),
)
const BRAND_EMOJI_MAP = {}
for (const [concept, icon] of Object.entries(emojiSet.emoji)) {
  BRAND_EMOJI_MAP[icon.unicode] = concept
  BRAND_EMOJI_MAP[icon.unicode.replace(/️/g, "")] = concept
}
// 긴 것부터 매칭해야 "🛠️"가 "🛠"으로 잘려 잡히지 않는다.
const BRAND_EMOJI_KEYS = Object.keys(BRAND_EMOJI_MAP).sort((a, b) => b.length - a.length)

function brandEmojiTag(concept, px) {
  return `<img src="${EMOJI_BASE}/${concept}-solid.png" width="${px}" height="${px}" />&nbsp;`
}

// 줄 맨 앞 이모지만 치환한다. 문장 중간 이모지는 그대로 두어(유니코드 유지)
// 같은 줄에서 커스텀과 유니코드가 정렬 차이로 비교되는 상황 자체를 만들지 않는다.
//
// 치환은 선두 이모지 "하나"만 소비한다. 매치에 딸려온 나머지는 반드시 되돌려 놔야 한다 —
// 예전엔 매치 전체를 버려서 `📊✅ 제목`의 ✅가 조용히 사라졌다(2026-07-22 적대검증에서 발견).
const 이모지경고 = []
function brandEmoji(html, px = EMOJI_PX_BODY) {
  return html.replace(/^(\s*)([\p{Extended_Pictographic}️]+)(\s*)/u, (m, pre, emo, tail) => {
    const key = BRAND_EMOJI_KEYS.find((k) => emo.startsWith(k))
    if (!key) return m
    const rest = emo.slice(key.length)
    // 선두에 이모지를 여러 개 쓰면 브랜드 아이콘과 유니코드가 한 줄에 나란히 서게 된다.
    // 네이버에선 둘의 baseline이 3.6px 어긋나 눈에 띄므로(보정 불가) 사람이 원고를 고쳐야 한다.
    if (rest) 이모지경고.push(`선두 이모지 여러 개 — "${emo}" (첫 개만 아이콘으로 바뀌고 나머지는 유니코드로 남는다)`)
    return pre + brandEmojiTag(BRAND_EMOJI_MAP[key], px) + rest + (rest ? tail : "")
  })
}

// 서식(**굵게**·[링크])으로 감싼 선두 이모지는 inline()이 먼저 <b>/<a>로 바꿔버려
// ^ 앵커에 안 걸린다 → 유니코드로 남는다. 조용히 섞이지 않게 경고로 알린다.
function 서식감싼선두이모지검출(text) {
  if (/^\s*(\*\*|\[|`|\*)\s*[\p{Extended_Pictographic}]/u.test(text)) {
    이모지경고.push(`서식으로 감싼 선두 이모지 — "${text.slice(0, 24)}…" (아이콘 치환 안 됨. 이모지를 서식 밖으로 빼라)`)
  }
}

// 인라인 변환 (순서 중요: 마커 → 링크 → 굵게 → 기울임 → 코드)
// 서식은 인라인 스타일로 낸다 — SE ONE 붙여넣기에서 클래스는 소실된다.
function inline(text, emojiPx = EMOJI_PX_BODY) {
  const img = '<span style="background-color:#fff19b;font-weight:700;">\u{1F5BC} 이미지: $1</span>'
  const slot = '<span style="background-color:#ffe08a;font-weight:700;">\u{270D} 여기 네 말: $1</span>'
  서식감싼선두이모지검출(text)
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
  t = brandEmoji(t, emojiPx)
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

// 2패스: 렌더. 격식 규칙은 여기 한 곳에만 둔다.
// 미리보기 HTML도 이 결과를 그대로 보여준다 — 실제 붙여넣기 결과와 다른 화면을 보여주면
// 미리보기의 의미가 없다(예전엔 preview 전용 렌더가 따로 있었지만 쓰이지 않았다).
function render() {
  const out = []
  const GAP = "<p>​</p>"
  for (const b of blocks) {
    switch (b.type) {
      case "h2":
        out.push("<hr>")
        out.push(`<p><span style="font-size:19px;"><b>${inline(b.text, EMOJI_PX_H2)}</b></span></p>`)
        break
      case "h3":
        out.push(`<p><b>${inline(b.text)}</b></p>`)
        break
      case "hr":
        out.push("<hr>")
        break
      case "quote":
        out.push(`<blockquote>${b.items.map((x) => inline(x)).join("<br>")}</blockquote>`)
        break
      case "caption":
        // 고정멘트 취향: 가운데 정렬 + 회색(#c2c2c2), 이탤릭 없음 (2026-07-20 발행본 요한 수동수정 실측)
        out.push(`<p style="text-align: center;"><span style="color: #c2c2c2;">${inline(b.text)}</span></p>`)
        break
      case "ul":
        out.push(`<ul>${b.items.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`)
        break
      case "ol":
        out.push(`<ol>${b.items.map((x) => `<li>${inline(x)}</li>`).join("")}</ol>`)
        break
      case "p":
        out.push(`<p>${b.lines.map((x) => inline(x)).join("<br>")}</p>`)
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

const fragmentBody = render()

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

// 이모지 경고는 발행 전에 사람이 원고를 고쳐야 하는 사항이라 마지막에 눈에 띄게 낸다.
if (이모지경고.length) {
  console.log("")
  console.log(`⚠ 이모지 주의 ${이모지경고.length}건 — 원고(.md)를 고치는 게 맞다:`)
  for (const w of [...new Set(이모지경고)]) console.log(`  · ${w}`)
}
