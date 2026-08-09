import type { Lens } from "./lenses";
import articlesData from "./articles-data.json";

export type ArticleMeta = {
  slug: string;
  title: string;
  dek: string;
  lens: Lens;
  date: string;
  cover: string;
  author: string;
  featured?: boolean;
};

export type Article = ArticleMeta & { html: string };

const ALL_ARTICLES = articlesData as Article[];

export function getAllArticleMeta(): ArticleMeta[] {
  return [...ALL_ARTICLES]
    .map(({ html: _html, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticle(slug: string): Promise<Article | null> {
  return ALL_ARTICLES.find((article) => article.slug === slug) ?? null;
}
