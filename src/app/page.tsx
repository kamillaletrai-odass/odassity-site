import { getAllArticleMeta } from "@/lib/articles";
import StoryCard from "@/components/StoryCard";
import FeaturedStoryRow from "@/components/FeaturedStoryRow";
import ScrollReveal from "@/components/ScrollReveal";
import HomeHero from "@/components/HomeHero";

export default function HomePage() {
  const articles = getAllArticleMeta();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const others = articles.filter((a) => a.slug !== featured?.slug);
  const featuredSmall = others.slice(0, 3);
  const [teaser1, teaser2] = others.slice(3, 5);

  return (
    <>
      <HomeHero teaser1={teaser1} teaser2={teaser2} />

      {featured && (
        <section className="px-6 py-16 sm:px-10">
          <ScrollReveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="font-display text-display text-paper">
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
                <ScrollReveal
                  key={article.slug}
                  delay={0.1 + i * 0.08}
                  className="flex flex-1"
                >
                  <FeaturedStoryRow article={article} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
