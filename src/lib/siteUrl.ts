/** Canonical origin for sitemap, robots, JSON-LD. No trailing slash. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const base = raw || "https://yohanstudio.co"
  return base.replace(/\/+$/, "")
}
