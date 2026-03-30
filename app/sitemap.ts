import type { MetadataRoute } from "next";

const SITE_URL = "https://kakutei-shinkoku-ai.vercel.app";

const KEYWORD_SLUGS = [
  "kakutei-shinkoku-freelance",
  "kakutei-shinkoku-yarikata",
  "kakutei-shinkoku-keihi",
  "aojiro-shinkoku-ai",
  "kakutei-shinkoku-ikura-kara",
  "fukugyou-kakutei-shinkoku",
  "e-tax-yarikata",
  "iryouhi-koujo",
  "furusato-nouzei-shinkoku",
  "zeirishi-hiyou",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tool`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const keywordPages: MetadataRoute.Sitemap = KEYWORD_SLUGS.map((slug) => ({
    url: `${SITE_URL}/keywords/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...keywordPages];
}
