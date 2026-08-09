import type { MetadataRoute } from "next";
import { getAllArticleMeta } from "@/lib/articles";

const BASE_URL = "https://odassity.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticleMeta();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/stories`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/community`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/write`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/partner`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/stories/${article.slug}`,
    lastModified: article.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
