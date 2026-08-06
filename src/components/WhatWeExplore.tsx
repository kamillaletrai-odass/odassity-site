import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const CATEGORIES = [
  {
    title: "Human Nature",
    description:
      "The psychology, behaviours, and contradictions that make us human.",
  },
  {
    title: "Technology & Tomorrow",
    description: "The tools that changed our lives, and the questions they leave behind.",
  },
  {
    title: "Taste & Culture",
    description:
      "The objects, aesthetics, and ideas that reveal what we value.",
  },
  {
    title: "Creativity & Expression",
    description: "The people and practices pushing imagination forward.",
  },
  {
    title: "Intentional Living",
    description:
      "The rituals, choices, and perspectives that help us live with more awareness.",
  },
];

export default function WhatWeExplore() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28">
      <ScrollReveal className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-paper-faint">
          What We Explore
        </span>
        <h2 className="mt-3 font-display text-display text-paper">
          Ideas worth sitting with
        </h2>
        <p className="mt-5 text-lg text-paper-dim">
          Odassity is a place for curious minds exploring the intersection of
          technology, culture, creativity, and the human experience.
        </p>
        <p className="mt-4 text-paper-dim">
          We look at the ideas, objects, and movements shaping the way we
          live, create, and see ourselves in an increasingly changing world.
        </p>
      </ScrollReveal>

      <div className="mt-14 border-t border-paper-faint/10 sm:mt-16">
        {CATEGORIES.map((cat, i) => (
          <ScrollReveal key={cat.title} delay={Math.min(i * 0.06, 0.3)}>
            <div className="group relative flex flex-col gap-2 border-b border-paper-faint/10 py-6 pl-5 transition-colors sm:flex-row sm:items-baseline sm:gap-10 sm:py-8">
              <span className="pointer-events-none absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 bg-pink transition-transform duration-300 group-hover:scale-y-100" />
              <span className="font-display text-sm text-paper-faint sm:w-10">
                0{i + 1}
              </span>
              <h3 className="shrink-0 font-display text-xl text-paper transition-colors sm:w-72 sm:text-2xl">
                {cat.title}
              </h3>
              <p className="text-paper-dim sm:flex-1">{cat.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.1} className="mt-14 sm:mt-16">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          Explore our thoughts
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
            →
          </span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
