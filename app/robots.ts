import type { MetadataRoute } from "next";

const SITE_URL = "https://kakutei-shinkoku-ai.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
