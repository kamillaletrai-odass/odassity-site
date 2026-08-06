import Link from "next/link";
import { getAllArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import { LENS_ORDER, LENSES } from "@/lib/lenses";
import StoryCard from "@/components/StoryCard";
import FeaturedStoryRow from "@/components/FeaturedStoryRow";
import AuthorAvatar from "@/components/AuthorAvatar";
import NewsletterForm from "@/components/NewsletterForm";
import ScrollReveal from "@/components/ScrollReveal";
import HomeHero from "@/components/HomeHero";

export default function HomePage() {
  const articles = getAllArticleMeta();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const others = articles.filter((a) => a.slug !== featured?.slug);
  const featuredSmall = others.slice(0, 3);
  const [teaser1, teaser2] = others.slice(3, 5);
  const latestGrid = others.slice(5, 11);
  const authors = Object.values(AUTHORS);

  return (
    <>
      <HomeHero teaser1={teaser1} teaser2={teaser2} />

      {featured && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="font-display text-display text-pink">
              Featured Stories
            </h2>
            <p className="text-paper-dim italic">
              lullabies to feed your mind
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <ScrollReveal className="lg:col-span-2">
              <StoryCard article={featured} size="lg" />
            </ScrollReveal>
            <div className="flex flex-col gap-2">
              {featuredSmall.map((article, i) => (
                <ScrollReveal key={article.slug} delay={0.1 + i * 0.08}>
                  <FeaturedStoryRow article={article} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-display text-paper">
            Latest stories
          </h2>
          <Link
            href="/stories"
            className="text-sm text-paper-dim hover:text-paper"
          >
            All stories →
          </Link>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestGrid.map((article, i) => (
            <ScrollReveal key={article.slug} delay={Math.min(i * 0.08, 0.4)}>
              <StoryCard article={article} size="md" />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="relative border-t border-paper-faint/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-lavender-dim),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pink">
                A coven of thinkerbells
              </span>
              <h2 className="mt-3 font-display text-display text-paper">
                The voices behind Odassity.
              </h2>
            </div>
            <Link
              href="/community"
              className="text-sm text-paper-dim hover:text-paper"
            >
              Meet the community →
            </Link>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {authors.map((author, i) => (
              <ScrollReveal key={author.id} delay={i * 0.08}>
                <Link
                  href="/community"
                  className="glass block h-full rounded-2xl p-6 transition-transform hover:-translate-y-1"
                >
                  <AuthorAvatar author={author} size="lg" />
                  <p className="mt-4 font-display text-lg text-paper">
                    {author.name}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pink">
                    {author.role}
                  </p>
                  <p className="mt-3 text-sm text-paper-dim">{author.bio}</p>
                </Link>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={authors.length * 0.08}>
              <Link
                href="/write"
                className="flex h-full min-h-[220px] flex-col items-start justify-center rounded-2xl border border-dashed border-paper-faint/20 p-6 transition-colors hover:border-pink/60"
              >
                <p className="font-display text-lg text-paper">
                  Want to be next?
                </p>
                <p className="mt-2 text-sm text-paper-dim">
                  We&rsquo;re always reading writer submissions.
                </p>
                <span className="mt-4 text-sm text-pink">
                  Become a writer →
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="border-t border-paper-faint/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pink">
              Why we exist
            </span>
            <h2 className="mt-3 font-display text-display text-paper">
              Slow content for a fast-scrolling brain.
            </h2>
            <p className="mt-4 text-paper-dim">
              Odassity is built for the five minutes between doomscrolls —
              essays that ask you to actually think, not just tap again. Not
              a feed. Not a vibe. A place that pushes back a little, on
              purpose, in a world engineered to dilute your attention span.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LENS_ORDER.map((lens, i) => {
              const meta = LENSES[lens];
              return (
                <ScrollReveal key={lens} delay={i * 0.08}>
                  <div className="glass h-full rounded-2xl p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pink">
                      {meta.label}
                    </span>
                    <p className="mt-3 font-display text-lg text-paper">
                      {meta.tagline}
                    </p>
                    <p className="mt-2 text-sm text-paper-dim">
                      {meta.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal className="glass mt-16 flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl text-paper">
                Read the next one first.
              </p>
              <p className="mt-1 text-sm text-paper-dim">
                One email when a new story drops. No noise.
              </p>
            </div>
            <NewsletterForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
