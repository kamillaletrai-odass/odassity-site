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
    <div className="px-6 pt-32 pb-16 sm:px-10">
      <h1 className="font-display text-display text-paper">Our stories</h1>
      <p className="mt-3 max-w-xl text-lg text-paper-dim">
        Browse through our stories, pick the lens that speaks to you.
      </p>
      <div className="mt-4 flex max-w-xl flex-col gap-4 text-paper-dim">
        <p>
          A coffee break on a Monday. A flat evening that needs saving.
          There&rsquo;s always one that fits, the kind you keep thinking
          about days later, like a good film you can&rsquo;t quite put
          down.
        </p>
        <p>
          Nothing here started as an idea. It started as something that
          actually happened, a conversation that went too far, a trend we
          couldn&rsquo;t stop picking apart, a Tuesday that felt stranger
          than it should have. Then it got written down until it meant more
          than it did the first time.
        </p>
        <p>
          None of them end cleanly. That&rsquo;s the magic, it leaves you
          mid thought, so it&rsquo;s yours to finish.
        </p>
        <p>Minutes to read. Stays with you far longer. Take a break with us.</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/stories"
          className={clsx(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            !activeLens
              ? "bg-paper text-ink"
              : "glass text-paper-dim hover:text-paper",
          )}
        >
          All
        </Link>
        {LENS_ORDER.map((l) => (
          <Link
            key={l}
            href={`/stories?lens=${l}`}
            className={clsx(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeLens === l
                ? "bg-paper text-ink"
                : "glass text-paper-dim hover:text-paper",
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
          <p className="text-paper-dim">We are working on it…</p>
        )}
      </div>
    </div>
  );
}
