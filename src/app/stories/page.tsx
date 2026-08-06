import type { Metadata } from "next";
import { getAllArticleMeta } from "@/lib/articles";
import StoryCard from "@/components/StoryCard";
import { LENS_ORDER, LENSES, type Lens } from "@/lib/lenses";
import Link from "next/link";
import clsx from "clsx";

export const metadata: Metadata = { title: "Stories" };

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ lens?: string }>;
}) {
  const { lens } = await searchParams;
  const activeLens = LENS_ORDER.includes(lens as Lens) ? (lens as Lens) : undefined;
  const articles = getAllArticleMeta().filter(
    (a) => !activeLens || a.lens === activeLens,
  );

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
      <h1 className="font-display text-display text-paper">All stories</h1>
      <p className="mt-3 max-w-lg text-paper-dim">
        Every essay, sorted by the lens it looks through.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/stories"
          className={clsx(
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            !activeLens
              ? "border-pink bg-pink text-white"
              : "border-paper-faint/20 text-paper-dim hover:border-paper-faint/40",
          )}
        >
          All
        </Link>
        {LENS_ORDER.map((l) => (
          <Link
            key={l}
            href={`/stories?lens=${l}`}
            className={clsx(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              activeLens === l
                ? "border-pink bg-pink text-white"
                : "border-paper-faint/20 text-paper-dim hover:border-paper-faint/40",
            )}
          >
            {LENSES[l].label}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <StoryCard key={article.slug} article={article} size="md" />
        ))}
        {articles.length === 0 && (
          <p className="text-paper-dim">No stories in this lens yet.</p>
        )}
      </div>
    </div>
  );
}
