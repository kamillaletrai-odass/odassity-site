import ScrollReveal from "./ScrollReveal";

const TOPICS = [
  {
    word: "Psyche",
    triad: "Psychology · Neuroplasticity · Identity",
    description:
      "Why you think what you think, want what you want, become who you become.",
    gradient:
      "radial-gradient(circle at 55% 35%, var(--color-lavender) 0%, var(--color-pink-deep) 55%, #0d0710 100%)",
  },
  {
    word: "Taste",
    triad: "Curation · Culture · Discernment",
    description: "Choosing on purpose, in a world built to choose for you.",
    gradient:
      "radial-gradient(circle at 35% 25%, var(--color-pink) 0%, var(--color-pink-deep) 45%, #170a10 100%)",
  },
  {
    word: "Aesthetics",
    triad: "Neuroaesthetics · Philosophy · Symbolism",
    description:
      "Why some things move you before you've decided to notice.",
    gradient:
      "radial-gradient(circle at 65% 30%, var(--color-yellow-bright) 0%, var(--color-yellow) 40%, #14150a 100%)",
  },
  {
    word: "Trends",
    triad: "Digiculture · AI · Internet Culture",
    description: "Not anti-AI. Anti-autopilot.",
    gradient:
      "radial-gradient(circle at 30% 70%, var(--color-babyblue) 0%, #17222c 55%, #05080a 100%)",
  },
  {
    word: "Patterns",
    triad: "Systems · Behaviour · Connection",
    description:
      "The threads nobody points out until you're looking for them.",
    gradient:
      "conic-gradient(from 200deg at 50% 40%, var(--color-pink) 0deg, var(--color-lavender) 120deg, var(--color-yellow-bright) 240deg, var(--color-pink) 360deg)",
  },
];

export default function Obsessions() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28">
      <ScrollReveal className="flex justify-center">
        <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
          Recurring Motifs
        </span>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {TOPICS.map((topic, i) => (
          <ScrollReveal key={topic.word} delay={Math.min(i * 0.06, 0.3)}>
            <div className="group glass relative cursor-default overflow-hidden rounded-2xl p-4 transition-transform duration-500 ease-out sm:aspect-[3/4] sm:hover:z-10 sm:hover:scale-[1.18] sm:p-5">
              <div
                className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100"
                style={{ background: topic.gradient }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

              <div className="relative flex flex-col justify-between sm:h-full">
                <span className="glass inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
                  {topic.word}
                </span>
                <div className="mt-4 sm:mt-0">
                  <h3 className="font-display text-base leading-snug text-paper sm:text-lg">
                    {topic.triad}
                  </h3>
                  <p className="mt-2 text-[0.7rem] leading-snug text-paper-dim opacity-100 transition-opacity delay-100 duration-500 sm:text-xs sm:opacity-0 sm:group-hover:opacity-100">
                    {topic.description}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
