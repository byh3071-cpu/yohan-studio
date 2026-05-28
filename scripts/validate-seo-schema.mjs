/** Validates required JSON-LD fields for SEO tickets (local HTML fetch). */
const BASE = process.env.SEO_BASE ?? "http://localhost:3099"

function extractLd(html) {
  const out = []
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(JSON.parse(m[1]))
    } catch {
      out.push(null)
    }
  }
  return out.filter(Boolean)
}

function assert(cond, msg, errors) {
  if (!cond) errors.push(msg)
}

async function validateShowroom() {
  const html = await (await fetch(`${BASE}/showroom/notion-uiux`)).text()
  const ld = extractLd(html)
  const errors = []
  const cw = ld.find((b) => b["@type"] === "CreativeWork")
  const bc = ld.find((b) => b["@type"] === "BreadcrumbList")

  assert(cw, "CreativeWork block missing", errors)
  if (cw) {
    for (const k of ["name", "description", "url", "dateCreated", "keywords"]) {
      assert(cw[k], `CreativeWork.${k} missing`, errors)
    }
    assert(cw.author?.["@id"]?.includes("#person"), "CreativeWork.author @id", errors)
    assert(cw.isPartOf?.["@id"]?.includes("#website"), "CreativeWork.isPartOf @id", errors)
  }
  assert(bc?.itemListElement?.length >= 3, "BreadcrumbList items", errors)
  return { page: "/showroom/notion-uiux", ok: errors.length === 0, errors }
}

async function validateBlog() {
  const html = await (await fetch(`${BASE}/blog/vibe-coding-2hr-deploy`)).text()
  const ld = extractLd(html)
  const errors = []
  const article = ld.find((b) => b["@type"] === "Article")
  assert(article, "Article block missing", errors)
  if (article) {
    for (const k of ["headline", "description", "url", "datePublished", "inLanguage"]) {
      assert(article[k], `Article.${k} missing`, errors)
    }
    assert(article.author?.["@id"]?.includes("#person"), "Article.author @id", errors)
    assert(article.publisher?.["@id"]?.includes("#org"), "Article.publisher @id", errors)
    assert(article.image, "Article.image missing", errors)
  }
  return { page: "/blog/vibe-coding-2hr-deploy", ok: errors.length === 0, errors }
}

async function validateHome() {
  const html = await (await fetch(`${BASE}/`)).text()
  const ld = extractLd(html)
  const graph = ld.find((b) => b["@graph"])
  const errors = []
  assert(graph, "@graph missing on home", errors)
  if (graph) {
    const person = graph["@graph"].find((n) => n["@type"] === "Person")
    const org = graph["@graph"].find((n) => n["@type"] === "Organization")
    assert((person?.sameAs?.length ?? 0) >= 3, "Person.sameAs >= 3", errors)
    assert((person?.knowsAbout?.length ?? 0) >= 10, "Person.knowsAbout >= 10", errors)
    assert(org?.logo, "Organization.logo", errors)
    assert(org?.contactPoint?.url, "Organization.contactPoint.url", errors)
  }
  return { page: "/", ok: errors.length === 0, errors }
}

const results = await Promise.all([
  validateShowroom(),
  validateBlog(),
  validateHome(),
])
console.log(JSON.stringify(results, null, 2))
process.exit(results.every((r) => r.ok) ? 0 : 1)
