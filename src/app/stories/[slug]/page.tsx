import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticle, getAllArticleMeta } from "@/lib/articles";
import LensTag from "@/components/LensTag";

export function generateStaticParams() {
  return getAllArticleMeta().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/stories"
        className="text-sm text-paper-dim hover:text-paper"
      >
        ← All stories
      </Link>

      <div className="mt-6">
        <LensTag lens={article.lens} size="md" />
      </div>

      <h1 className="mt-6 font-display text-display leading-[1.05] text-paper">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-paper-dim">{article.dek}</p>

      <div className="mt-6 flex items-center gap-3 text-sm text-paper-faint">
        <span>Odassity</span>
        <span>·</span>
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      <div
        className="prose-odassity mt-12"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
    </article>
  );
}
