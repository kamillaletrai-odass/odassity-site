import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArticle, getAllArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import LensTag from "@/components/LensTag";
import AuthorAvatar from "@/components/AuthorAvatar";
import StoryCard from "@/components/StoryCard";

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

  const others = getAllArticleMeta().filter((a) => a.slug !== article.slug);
  const sameLens = others.filter(
    (a) => article.lens !== "all" && a.lens === article.lens,
  );
  const rest = others.filter((a) => !sameLens.includes(a));
  const recommended = [...sameLens, ...rest].slice(0, 3);

  return (
    <article className="pb-16">
      {article.cover && (
        <div className="relative h-[52vh] min-h-[320px] w-full overflow-hidden bg-ink sm:h-[66vh]">
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 55%, transparent 92%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 55%, transparent 92%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/stories"
          className={`inline-block text-sm text-paper-dim hover:text-paper ${article.cover ? "-mt-24 relative" : "mt-32"}`}
        >
          ← All stories
        </Link>

        {article.lens !== "all" && (
          <div className="mt-6">
            <LensTag lens={article.lens} size="md" />
          </div>
        )}

        <h1 className="mt-6 font-display text-hero leading-[1.05] text-paper">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-paper-dim">{article.dek}</p>

        <time dateTime={article.date} className="mt-6 block text-sm text-pink">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

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

      {recommended.length > 0 && (
        <div className="mt-20 px-6 sm:px-10">
          <p className="mx-auto max-w-6xl text-xs font-semibold uppercase tracking-[0.18em] text-paper-dim">
            Continue reading
          </p>
          <div className="mx-auto mt-6 grid max-w-6xl gap-6 sm:grid-cols-3">
            {recommended.map((piece) => (
              <StoryCard key={piece.slug} article={piece} size="sm" />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
