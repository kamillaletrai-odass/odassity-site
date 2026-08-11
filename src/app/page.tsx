import Link from "next/link";
import { getAllArticleMeta } from "@/lib/articles";
import { getMostViewedSlug } from "@/lib/ga4";
import StoryCard from "@/components/StoryCard";
import ScrollReveal from "@/components/ScrollReveal";
import HomeHero from "@/components/HomeHero";
import Obsessions from "@/components/Obsessions";
import Thinkerbells from "@/components/Thinkerbells";
import Beliefs from "@/components/Beliefs";

export default async function HomePage() {
  const allArticles = getAllArticleMeta();
  const articles = allArticles.filter((a) => a.author === "kamilla");
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const others = articles.filter((a) => a.slug !== featured?.slug);
  const mostRecent = articles[0];

  // Two of the 5 featured slots are deliberately not Kamilla's - the rest
  // stay Kamilla-only, matching how this section has always worked.
  // "Reputation Is Built in the Gaps" is excluded so it doesn't just
  // reappear in the natural fill once Scrolling Into Hunger takes its spot.
  const pinnedSlugs = [
    "maybe-we-re-asking-the-wrong-questions-about-celebrity-activism", // Andra
    "scrolling-into-hunger-the-performance-of-health-online", // Serena
  ];
  const excludedSlugs = ["reputation-is-built-in-the-gaps"];
  const pinnedArticles = pinnedSlugs
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter((a): a is (typeof allArticles)[number] => Boolean(a));
  const naturalFill = others
    .filter(
      (a) => !pinnedSlugs.includes(a.slug) && !excludedSlugs.includes(a.slug),
    )
    .slice(0, 4 - pinnedArticles.length);
  const featuredGrid = [...pinnedArticles, ...naturalFill];

  // Temporary manual override for the "Most popular" hero slot - remove
  // this line to go back to the live GA4-driven pick.
  const MOST_POPULAR_OVERRIDE_SLUG =
    "psycho-cybernetics-and-theself-image-in-the-age-of-the-fyp";

  const mostViewedSlug =
    MOST_POPULAR_OVERRIDE_SLUG ?? (await getMostViewedSlug());
  const mostViewed =
    articles.find((a) => a.slug === mostViewedSlug) ?? others.slice(4, 6)[0];

  return (
    <>
      <HomeHero teaser1={mostViewed} teaser2={mostRecent} />

      <Obsessions />

      {featured && (
        <section className="px-6 py-20 sm:px-10 sm:py-28">
          <ScrollReveal className="flex justify-center">
            <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
              Featured
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05} className="mt-8">
            <StoryCard
              article={featured}
              size="lg"
              badge={
                featured?.slug === mostRecent?.slug ? "Most recent" : undefined
              }
            />
          </ScrollReveal>
          <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8">
            {featuredGrid.map((article, i) => (
              <ScrollReveal key={article.slug} delay={0.1 + i * 0.08}>
                <StoryCard article={article} size="md" />
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-14 flex justify-center sm:mt-16">
            <Link
              href="/stories"
              className="glass inline-flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-4 text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              All stories
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper text-ink">
                →
              </span>
            </Link>
          </div>
        </section>
      )}

      <Thinkerbells />
      <Beliefs />
    </>
  );
}
