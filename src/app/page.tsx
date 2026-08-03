import Link from "next/link";
import Image from "next/image";
import { getAllArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import { LENS_ORDER, LENSES } from "@/lib/lenses";
import StoryCard from "@/components/StoryCard";
import AuthorAvatar from "@/components/AuthorAvatar";
import NewsletterForm from "@/components/NewsletterForm";
import Marquee from "@/components/Marquee";
import ScrollReveal from "@/components/ScrollReveal";
import LiquidAura from "@/components/LiquidAura";

export default function HomePage() {
  const articles = getAllArticleMeta();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug).slice(0, 6);
  const [teaser1, teaser2] = rest;
  const authors = Object.values(AUTHORS);

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <LiquidAura />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-6 pt-32 pb-16 sm:pb-24">
          <ScrollReveal>
            <div className="max-w-2xl rounded-3xl bg-cloud/50 p-8 backdrop-blur-xl sm:p-12">
              <span className="inline-block rounded-full border border-ink-faint px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ink-dim">
                N&deg;01 — {articles.length} stories and counting
              </span>
              <h1 className="mt-8 font-display text-hero leading-[0.95] tracking-tight text-ink italic">
                Read today.
                <br />
                Understand <span className="text-pink not-italic">tomorrow.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-ink-dim">
                Psychology, social dynamics, and the art of being seen online
                — essays for people who want their feed to occasionally push
                back.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/stories"
                  className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Start reading
                </Link>
                <Link
                  href="/write"
                  className="rounded-full border border-ink-faint px-6 py-3 text-sm text-ink transition-colors hover:border-ink/40"
                >
                  Become a writer
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {teaser1 && (
          <Link
            href={`/stories/${teaser1.slug}`}
            className="absolute top-28 right-6 z-10 hidden w-48 rounded-xl border border-ink-faint bg-cloud/60 p-3 backdrop-blur-md transition-transform hover:-translate-y-1 sm:block"
          >
            {teaser1.cover && (
              <div className="relative h-24 w-full overflow-hidden rounded-lg">
                <Image
                  src={teaser1.cover}
                  alt=""
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            )}
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-pink">
              {LENSES[teaser1.lens].label}
            </p>
            <p className="mt-1 font-display text-sm leading-snug text-ink">
              {teaser1.title}
            </p>
          </Link>
        )}

        {teaser2 && (
          <Link
            href={`/stories/${teaser2.slug}`}
            className="absolute top-[19rem] right-6 z-10 hidden w-44 rounded-xl border border-ink-faint bg-cloud/60 p-3 backdrop-blur-md transition-transform hover:-translate-y-1 lg:block"
          >
            {teaser2.cover && (
              <div className="relative h-20 w-full overflow-hidden rounded-lg">
                <Image
                  src={teaser2.cover}
                  alt=""
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
            )}
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-pink">
              {LENSES[teaser2.lens].label}
            </p>
            <p className="mt-1 font-display text-sm leading-snug text-ink">
              {teaser2.title}
            </p>
          </Link>
        )}
      </section>

      <Marquee />

      {featured && (
        <ScrollReveal className="mx-auto max-w-6xl px-6 py-16">
          <StoryCard article={featured} size="lg" />
        </ScrollReveal>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-display text-ink">
            Latest stories
          </h2>
          <Link
            href="/stories"
            className="text-sm text-ink-dim hover:text-ink"
          >
            All stories →
          </Link>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, i) => (
            <ScrollReveal key={article.slug} delay={Math.min(i * 0.08, 0.4)}>
              <StoryCard article={article} size="md" />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-faint bg-lavender-dim">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pink">
                A coven of thinkerbells
              </span>
              <h2 className="mt-3 font-display text-display text-ink">
                The voices behind Odassity.
              </h2>
            </div>
            <Link
              href="/community"
              className="text-sm text-ink-dim hover:text-ink"
            >
              Meet the community →
            </Link>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {authors.map((author, i) => (
              <ScrollReveal key={author.id} delay={i * 0.08}>
                <Link
                  href="/community"
                  className="block h-full rounded-2xl border border-ink-faint bg-cloud p-6 transition-transform hover:-translate-y-1"
                >
                  <AuthorAvatar author={author} size="lg" />
                  <p className="mt-4 font-display text-lg text-ink">
                    {author.name}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pink">
                    {author.role}
                  </p>
                  <p className="mt-3 text-sm text-ink-dim">{author.bio}</p>
                </Link>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={authors.length * 0.08}>
              <Link
                href="/write"
                className="flex h-full min-h-[220px] flex-col items-start justify-center rounded-2xl border border-dashed border-ink-faint p-6 transition-colors hover:border-pink/60"
              >
                <p className="font-display text-lg text-ink">
                  Want to be next?
                </p>
                <p className="mt-2 text-sm text-ink-dim">
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

      <section className="border-t border-ink-faint">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pink">
              Why we exist
            </span>
            <h2 className="mt-3 font-display text-display text-ink">
              Slow content for a fast-scrolling brain.
            </h2>
            <p className="mt-4 text-ink-dim">
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
                  <div className="h-full rounded-2xl border border-ink-faint bg-babyblue-dim p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pink">
                      {meta.label}
                    </span>
                    <p className="mt-3 font-display text-lg text-ink">
                      {meta.tagline}
                    </p>
                    <p className="mt-2 text-sm text-ink-dim">
                      {meta.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-ink-faint bg-gradient-to-br from-pink/10 via-lavender to-babyblue p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl text-ink">
                Read the next one first.
              </p>
              <p className="mt-1 text-sm text-ink-dim">
                One email when a new story drops. No noise.
              </p>
            </div>
            <NewsletterForm theme="light" />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
