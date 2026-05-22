import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/siteUrl"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      { userAgent: "Yeti", allow: "/", disallow: ["/admin/"] },
      { userAgent: "*", allow: "/", disallow: ["/admin/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
