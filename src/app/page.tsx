import Link from "next/link";
import Image from "next/image";
import { getAllArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import { LENS_ORDER, LENSES } from "@/lib/lenses";
import StoryCard from "@/components/StoryCard";
import AuthorAvatar from "@/components/AuthorAvatar";
import Marquee from "@/components/Marquee";
import ScrollReveal from "@/components/ScrollReveal";
import LiquidHeroImage from "@/components/LiquidHeroImage";

export default function HomePage() {
  const articles = getAllArticleMeta();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug).slice(0, 6);
  const [teaser1, teaser2] = rest;
  const authors = Object.values(AUTHORS);

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <LiquidHeroImage src="/hero/hero-figure.jpg" />
        <div className="pointer-events-none absolute inset-0 bg-ink/35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink from-0% via-ink/85 via-55% to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-6 pt-32 pb-16 sm:pb-24">
          <ScrollReveal>
            <span className="inline-block rounded-full border border-paper-faint/30 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-paper-dim backdrop-blur-sm">
              N&deg;01 — {articles.length} stories and counting
            </span>
            <h1 className="mt-8 max-w-4xl font-display text-hero leading-[0.95] tracking-tight text-paper uppercase [text-shadow:0_4px_30px_rgba(0,0,0,0.55)]">
              Read today.
              <br />
              Understand <span className="text-pink">tomorrow.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-paper-dim [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
              Psychology, social dynamics, and the art of being seen online —
              essays for people who want their feed to occasionally push
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
                className="rounded-full border border-paper-faint/30 px-6 py-3 text-sm text-paper backdrop-blur-sm transition-colors hover:border-paper/60"
              >
                Become a writer
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {teaser1 && (
          <Link
            href={`/stories/${teaser1.slug}`}
            className="absolute top-28 right-6 z-10 hidden w-48 rounded-xl border border-paper-faint/15 bg-ink/50 p-3 backdrop-blur-md transition-transform hover:-translate-y-1 sm:block"
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
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-yellow">
              {LENSES[teaser1.lens].label}
            </p>
            <p className="mt-1 font-display text-sm leading-snug text-paper">
              {teaser1.title}
            </p>
          </Link>
        )}

        {teaser2 && (
          <Link
            href={`/stories/${teaser2.slug}`}
            className="absolute top-[19rem] right-6 z-10 hidden w-44 rounded-xl border border-paper-faint/15 bg-ink/50 p-3 backdrop-blur-md transition-transform hover:-translate-y-1 lg:block"
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
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-yellow">
              {LENSES[teaser2.lens].label}
            </p>
            <p className="mt-1 font-display text-sm leading-snug text-paper">
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
          {rest.map((article, i) => (
            <ScrollReveal key={article.slug} delay={Math.min(i * 0.08, 0.4)}>
              <StoryCard article={article} size="md" />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-paper-faint/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ScrollReveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-yellow">
              Who&rsquo;s writing
            </span>
            <h2 className="mt-3 font-display text-display text-paper">
              The voices behind Odassity.
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {authors.map((author, i) => (
              <ScrollReveal key={author.id} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-paper-faint/10 p-6">
                  <AuthorAvatar author={author} size="lg" />
                  <p className="mt-4 font-display text-lg text-paper">
                    {author.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-paper-faint">
                    {author.role}
                  </p>
                  <p className="mt-3 text-sm text-paper-dim">{author.bio}</p>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={authors.length * 0.08}>
              <Link
                href="/write"
                className="flex h-full min-h-[220px] flex-col items-start justify-center rounded-2xl border border-dashed border-paper-faint/30 p-6 transition-colors hover:border-pink/60"
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
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-yellow">
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
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {LENS_ORDER.map((lens, i) => {
              const meta = LENSES[lens];
              return (
                <ScrollReveal key={lens} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-paper-faint/10 p-6">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-yellow">
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
        </div>
      </section>
    </>
  );
}
