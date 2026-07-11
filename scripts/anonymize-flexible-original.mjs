// 원본 flexible index.html의 실명을 가상 이름으로 치환한 사본 생성 (원본 불변)
// 사용: node scripts/anonymize-flexible-original.mjs <원본> <출력>
import fs from "node:fs"

const [src, out] = process.argv.slice(2)
const html = fs.readFileSync(src, "utf8")

// 명단 배열 리터럴에서 한글 이름 수집 (DEFAULT_ROSTER / FIXED_SCHEDULE_MEMBERS / AUTO_EXCLUDED_MEMBERS)
const names = new Set()
for (const m of html.matchAll(/"([가-힣]{2,4})"/g)) {
  names.add(m[1])
}

// UI 라벨·본인 이름은 치환 제외. 실명 여부가 애매하면 치환하는 쪽이 안전하지만,
// 라벨을 깨면 앱이 망가지므로 명단 배열 주변에서 수집한 것만 대상으로 좁힌다.
const rosterSection = html.slice(
  html.indexOf("DEFAULT_ROSTER"),
  html.indexOf("function", html.indexOf("AUTO_EXCLUDED_MEMBERS")),
)
const rosterNames = new Set()
for (const m of rosterSection.matchAll(/"([가-힣]{2,4})"/g)) {
  rosterNames.add(m[1])
}
rosterNames.delete("백요한") // 본인 이름은 자기공개 — 유지

let result = html
let i = 0
const mapping = []
for (const name of rosterNames) {
  i += 1
  const alias = `참여자 ${String(i).padStart(2, "0")}`
  mapping.push([name, alias])
  result = result.split(name).join(alias)
}

// 데모 기본 명단을 현장 규모(자리배치 대상 13명)로 확장
const roster13 = ["백요한", ...Array.from({ length: 12 }, (_, n) => `참여자 ${String(n + 1).padStart(2, "0")}`)]
result = result.replace(
  /const DEFAULT_ROSTER = \[[^\]]*\];/,
  `const DEFAULT_ROSTER = ${JSON.stringify(roster13)};`,
)

// 공개본임을 페이지 설명문에 명시
result = result.replace(
  "데이터는 이 기기 브라우저에만 저장됩니다.",
  "데이터는 이 기기 브라우저에만 저장됩니다. 이 공개본의 명단은 전원 가상 이름입니다.",
)

fs.writeFileSync(out, result, "utf8")

// 검증: 치환 대상 실명 잔존 0건이어야 함
const leftovers = mapping.filter(([name]) => result.includes(name))
console.log(`treated: ${mapping.length} names -> aliases`)
console.log(`leftover-real-names: ${leftovers.length}`)
console.log(`output: ${out}`)
