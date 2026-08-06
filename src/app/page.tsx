import { getAllArticleMeta } from "@/lib/articles";
import StoryCard from "@/components/StoryCard";
import FeaturedStoryRow from "@/components/FeaturedStoryRow";
import ScrollReveal from "@/components/ScrollReveal";
import HomeHero from "@/components/HomeHero";

export default function HomePage() {
  const articles = getAllArticleMeta().filter((a) => a.author === "kamilla");
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const others = articles.filter((a) => a.slug !== featured?.slug);
  const featuredCompact = others.slice(0, 2);
  const featuredMd = others.slice(2, 4);
  const [teaser1, teaser2] = others.slice(4, 6);

  return (
    <>
      <HomeHero teaser1={teaser1} teaser2={teaser2} />

      {featured && (
        <section className="px-6 py-16 sm:px-10">
          <div className="grid gap-4 lg:grid-cols-3">
            <ScrollReveal className="lg:col-span-2">
              <StoryCard article={featured} size="lg" />
            </ScrollReveal>
            <div className="flex flex-col gap-4">
              {featuredCompact.map((article, i) => (
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
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {featuredMd.map((article, i) => (
              <ScrollReveal key={article.slug} delay={0.2 + i * 0.08}>
                <StoryCard article={article} size="md" />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
