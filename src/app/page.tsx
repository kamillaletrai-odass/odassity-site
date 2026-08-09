import Link from "next/link";
import { getAllArticleMeta } from "@/lib/articles";
import StoryCard from "@/components/StoryCard";
import ScrollReveal from "@/components/ScrollReveal";
import HomeHero from "@/components/HomeHero";
import Obsessions from "@/components/Obsessions";
import Thinkerbells from "@/components/Thinkerbells";
import Beliefs from "@/components/Beliefs";

export default function HomePage() {
  const articles = getAllArticleMeta().filter((a) => a.author === "kamilla");
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const others = articles.filter((a) => a.slug !== featured?.slug);
  const featuredGrid = others.slice(0, 4);
  const mostRecent = articles[0];
  const mostViewed = others.slice(4, 6)[0];

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
            <StoryCard article={featured} size="lg" />
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
