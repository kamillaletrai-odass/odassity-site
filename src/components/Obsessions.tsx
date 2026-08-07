import ScrollReveal from "./ScrollReveal";

const TOPICS = [
  {
    word: "Taste",
    tagline: "Where trend meets taste.",
    description:
      "In a world of infinite choices, discernment becomes an art form. We explore craftsmanship, cultural intuition, and the quiet rebellion of choosing with intention.",
    closing: "Beyond consumption. Toward curation.",
    gradient:
      "radial-gradient(circle at 35% 25%, var(--color-pink) 0%, var(--color-pink-deep) 45%, #170a10 100%)",
  },
  {
    word: "Trends",
    tagline: "Where human meets digital.",
    description:
      "From digiculture to AI, we explore the signals emerging between technology and humanity. The rituals, aesthetics and ideas shaping tomorrow.",
    closing: "Not anti-AI. Anti-autopilot.",
    gradient:
      "radial-gradient(circle at 30% 70%, var(--color-babyblue) 0%, #17222c 55%, #05080a 100%)",
  },
  {
    word: "Psyche",
    tagline: "Where authentic meets performative.",
    description:
      "The theatre of identity. The stories we inherit, the selves we construct, and the endless possibility of becoming. Through psychology and neuroplasticity, we explore the architecture of human transformation.",
    closing: "",
    gradient:
      "radial-gradient(circle at 55% 35%, var(--color-lavender) 0%, var(--color-pink-deep) 55%, #0d0710 100%)",
  },
  {
    word: "Aesthetics",
    tagline: "Where beauty meets meaning.",
    description:
      "Beyond decoration lies a deeper language. Through neuroaesthetics, philosophy and symbolism, we explore why certain forms awaken something within us.",
    closing: "Beauty is not just seen. It is felt.",
    gradient:
      "radial-gradient(circle at 65% 30%, var(--color-yellow-bright) 0%, var(--color-yellow) 40%, #14150a 100%)",
  },
  {
    word: "Patterns",
    tagline: "Where chaos reveals its design.",
    description:
      "The hidden threads connecting everything: culture and technology, psychology and behaviour, the past and the future. We search for the patterns beneath the surface.",
    closing: "The invisible architecture of our era.",
    gradient:
      "conic-gradient(from 200deg at 50% 40%, var(--color-pink) 0deg, var(--color-lavender) 120deg, var(--color-yellow-bright) 240deg, var(--color-pink) 360deg)",
  },
];

export default function Obsessions() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28">
      <ScrollReveal className="flex justify-center">
        <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
          Motifs
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
                  <h3 className="font-display text-lg text-paper sm:text-xl">
                    {topic.word}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-paper opacity-100 transition-opacity delay-100 duration-500 sm:text-sm sm:opacity-0 sm:group-hover:opacity-100">
                    {topic.tagline}
                  </p>
                  <p className="mt-2 text-[0.7rem] leading-snug text-paper-dim opacity-100 transition-opacity delay-100 duration-500 sm:text-xs sm:opacity-0 sm:group-hover:opacity-100">
                    {topic.description}
                  </p>
                  {topic.closing && (
                    <p className="mt-2 text-[0.7rem] text-pink italic opacity-100 transition-opacity delay-100 duration-500 sm:text-xs sm:opacity-0 sm:group-hover:opacity-100">
                      {topic.closing}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
