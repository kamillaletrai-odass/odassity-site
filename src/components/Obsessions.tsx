import ScrollReveal from "./ScrollReveal";

const TOPICS = [
  {
    word: "Identity",
    description:
      "Because who we are keeps shifting — and that's the most interesting part.",
    gradient:
      "radial-gradient(circle at 35% 25%, var(--color-pink) 0%, var(--color-pink-deep) 45%, #170a10 100%)",
  },
  {
    word: "Culture",
    description:
      "The objects and aesthetics that quietly reveal what we actually value.",
    gradient:
      "radial-gradient(circle at 65% 30%, var(--color-yellow-bright) 0%, var(--color-yellow) 40%, #14150a 100%)",
  },
  {
    word: "Technology",
    description:
      "The tools rewriting how we live, love, and perform for an audience.",
    gradient:
      "radial-gradient(circle at 30% 70%, var(--color-babyblue) 0%, #17222c 55%, #05080a 100%)",
  },
  {
    word: "Creativity",
    description:
      "Where imagination refuses to follow the rules everyone else agreed to.",
    gradient:
      "conic-gradient(from 200deg at 50% 40%, var(--color-pink) 0deg, var(--color-lavender) 120deg, var(--color-yellow-bright) 240deg, var(--color-pink) 360deg)",
  },
  {
    word: "Attention",
    description:
      "The last scarce resource. What we choose to notice says everything.",
    gradient:
      "radial-gradient(circle at 55% 35%, var(--color-lavender) 0%, var(--color-pink-deep) 55%, #0d0710 100%)",
  },
];

export default function Obsessions() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28">
      <ScrollReveal className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-paper-faint">
          The Obsessions
        </span>
        <h2 className="mt-3 font-display text-display text-paper">
          The words we keep circling back to
        </h2>
      </ScrollReveal>

      {/* Desktop: hover-to-expand row */}
      <ScrollReveal
        delay={0.1}
        className="mt-12 hidden gap-3 sm:flex sm:h-[26rem]"
      >
        {TOPICS.map((topic) => (
          <div
            key={topic.word}
            className="group glass relative flex-1 basis-0 cursor-default overflow-hidden rounded-2xl p-5 transition-all duration-500 ease-out hover:flex-[3]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: topic.gradient }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

            <div className="relative flex h-full flex-col justify-between">
              <span className="glass inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
                {topic.word}
              </span>
              <div className="max-w-xs translate-y-2 opacity-0 transition-all delay-100 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="font-display text-2xl text-paper sm:text-3xl">
                  {topic.word}
                </h3>
                <p className="mt-2 text-sm text-paper-dim">
                  {topic.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ScrollReveal>

      {/* Mobile: stacked, always expanded */}
      <div className="mt-10 flex flex-col gap-4 sm:hidden">
        {TOPICS.map((topic, i) => (
          <ScrollReveal key={topic.word} delay={Math.min(i * 0.06, 0.3)}>
            <div className="glass relative overflow-hidden rounded-2xl p-5">
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: topic.gradient }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

              <div className="relative">
                <span className="glass inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
                  {topic.word}
                </span>
                <h3 className="mt-4 font-display text-2xl text-paper">
                  {topic.word}
                </h3>
                <p className="mt-2 text-sm text-paper-dim">
                  {topic.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
