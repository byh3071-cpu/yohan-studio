const urls = [
  "http://localhost:3099/showroom/notion-uiux",
  "http://localhost:3099/blog/vibe-coding-2hr-deploy",
  "http://localhost:3099/",
]

function extractLdJson(html) {
  const blocks = []
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1]))
    } catch {
      blocks.push({ parseError: true })
    }
  }
  return blocks
}

function extractMeta(html, key) {
  const prop = html.match(
    new RegExp(`property="${key.replace(":", "\\:")}" content="([^"]+)"`),
  )
  if (prop) return prop[1]
  const name = html.match(
    new RegExp(`name="${key.replace(":", "\\:")}" content="([^"]+)"`),
  )
  return name?.[1]
}

function flattenTypes(ld) {
  if (ld["@graph"]) return ld["@graph"].map((n) => n["@type"]).filter(Boolean)
  return ld["@type"] ? [ld["@type"]] : []
}

async function check(url) {
  const res = await fetch(url)
  const html = await res.text()
  const ld = extractLdJson(html)
  const ogImage = await fetch(
    extractMeta(html, "og:image") ??
      `${url.split("/").slice(0, 3).join("/")}/showroom/notion-uiux/opengraph-image`,
    { method: "HEAD" },
  ).catch(() => null)

  return {
    url,
    status: res.status,
    ldCount: ld.length,
    ldTypes: ld.flatMap(flattenTypes),
    ogTitle: extractMeta(html, "og:title"),
    ogDescription: extractMeta(html, "og:description"),
    ogImage: extractMeta(html, "og:image"),
    twitterCard: extractMeta(html, "twitter:card"),
    ogImageHeadStatus: ogImage?.status ?? "n/a",
    hasCreativeWork: ld.some((b) => JSON.stringify(b).includes("CreativeWork")),
    hasArticle: ld.some((b) => JSON.stringify(b).includes("Article")),
    hasBreadcrumb: ld.some((b) => JSON.stringify(b).includes("BreadcrumbList")),
    personId: ld.some((b) => JSON.stringify(b).includes("#person")),
  }
}

for (const u of urls) {
  console.log(JSON.stringify(await check(u), null, 2))
}
