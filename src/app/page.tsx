import Link from "next/link";
import { getAllArticleMeta } from "@/lib/articles";
import StoryCard from "@/components/StoryCard";
import ScrollReveal from "@/components/ScrollReveal";
import HomeHero from "@/components/HomeHero";

export default function HomePage() {
  const articles = getAllArticleMeta().filter((a) => a.author === "kamilla");
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const others = articles.filter((a) => a.slug !== featured?.slug);
  const featuredGrid = others.slice(0, 4);
  const [teaser1, teaser2] = others.slice(4, 6);

  return (
    <>
      <HomeHero teaser1={teaser1} teaser2={teaser2} />

      {featured && (
        <section className="px-6 py-16 sm:px-10">
          <ScrollReveal>
            <StoryCard article={featured} size="lg" />
          </ScrollReveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {featuredGrid.map((article, i) => (
              <ScrollReveal key={article.slug} delay={0.1 + i * 0.08}>
                <StoryCard article={article} size="md" />
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              All stories
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
                →
              </span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
