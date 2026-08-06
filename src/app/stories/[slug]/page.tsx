import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArticle, getAllArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import LensTag from "@/components/LensTag";
import AuthorAvatar from "@/components/AuthorAvatar";

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

  const author = AUTHORS[article.author];

  return (
    <article className="pb-16">
      {article.cover && (
        <div className="relative h-[42vh] min-h-[280px] w-full sm:h-[56vh]">
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-6">
        <Link
          href="/stories"
          className={`inline-block text-sm text-paper-dim hover:text-paper ${article.cover ? "-mt-10 relative" : "mt-32"}`}
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

        <div className="mt-6 flex items-center gap-3">
          {author && (
            <>
              <AuthorAvatar author={author} size="sm" />
              <div className="text-sm">
                <span className="text-paper">{author.name}</span>
                <span className="mx-2 text-paper-faint">·</span>
                <time dateTime={article.date} className="text-paper-dim">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </>
          )}
        </div>

        <div
          className="prose-odassity mt-12"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {author && (
          <div className="glass mt-16 flex items-start gap-4 rounded-2xl p-6">
            <AuthorAvatar author={author} size="lg" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-paper-dim">
                Written by
              </p>
              <p className="mt-1 font-display text-lg text-paper">
                {author.name}
              </p>
              <p className="mt-1 text-sm text-paper-dim">{author.bio}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
