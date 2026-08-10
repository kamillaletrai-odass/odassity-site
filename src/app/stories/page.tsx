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
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h1 className="font-display text-display text-paper">Our stories</h1>
        <p className="mt-3 max-w-xl text-lg text-pink">
          For when your brain needs a good kind of stimulation.
        </p>
        <div className="mt-4 flex flex-col gap-4 text-paper-dim">
          <p>
            A coffee break on a Monday. A flat evening that needs saving.
            There&rsquo;s always something that fits. Something you keep
            thinking about days later, like a good film you can&rsquo;t
            quite put down.
          </p>
          <p>
            Our stories start from real life experiences, a conversation
            that went too far, a trend we couldn&rsquo;t stop tripping
            over, a Tuesday that felt stranger than it should have.
          </p>
          <p>
            None of them end cleanly. That&rsquo;s the magic, it leaves you
            mid thought, so the story is yours to finish.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
