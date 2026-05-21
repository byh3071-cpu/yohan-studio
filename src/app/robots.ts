import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/siteUrl"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      { userAgent: "Yeti", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
