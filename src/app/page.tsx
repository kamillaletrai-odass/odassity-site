import Link from "next/link";
import { getAllArticleMeta } from "@/lib/articles";
import StoryCard from "@/components/StoryCard";
import { LENS_ORDER, LENSES } from "@/lib/lenses";

export default function HomePage() {
  const articles = getAllArticleMeta();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug).slice(0, 5);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
        <span className="inline-block rounded-full border border-paper-faint/30 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-paper-dim">
          For digital creators who overthink it
        </span>
        <h1 className="mt-8 max-w-4xl font-display text-hero leading-[0.98] tracking-tight text-paper">
          Read today.
          <br />
          Understand tomorrow.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-paper-dim">
          Psychology, social dynamics, and the art of being seen online —
          exclusively for those who want to understand themselves, not just
          perform for everyone else.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/stories"
            className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            Read the stories
          </Link>
          <Link
            href="/write"
            className="rounded-full border border-paper-faint/30 px-6 py-3 text-sm text-paper transition-colors hover:border-paper/60"
          >
            Become a writer
          </Link>
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-6xl px-6 pb-6">
          <StoryCard article={featured} size="lg" />
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-display text-paper">
            Latest stories
          </h2>
          <Link
            href="/stories"
            className="text-sm text-paper-dim hover:text-paper"
          >
            All stories →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <StoryCard key={article.slug} article={article} size="md" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-display text-display text-paper">
          The three lenses
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {LENS_ORDER.map((lens) => {
            const meta = LENSES[lens];
            return (
              <div
                key={lens}
                className="rounded-2xl border border-paper-faint/10 p-6"
              >
                <span
                  className={`text-xs font-medium uppercase tracking-[0.18em] ${meta.text}`}
                >
                  {meta.label}
                </span>
                <p className="mt-3 font-display text-lg text-paper">
                  {meta.tagline}
                </p>
                <p className="mt-2 text-sm text-paper-dim">
                  {meta.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
