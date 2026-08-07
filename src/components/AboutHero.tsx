import Image from "next/image";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const FACTS = [
  { label: "Marketer", arrow: "↘", position: "top-2 -left-2 sm:top-6 sm:-left-24" },
  { label: "Writer", arrow: "↙", position: "top-16 -right-2 sm:top-16 sm:-right-28" },
  { label: "Wanderer", arrow: "→", position: "top-1/2 -left-4 sm:-left-32" },
  {
    label: "Philosophy nerd",
    arrow: "↖",
    position: "bottom-24 -right-2 sm:bottom-28 sm:-right-32",
  },
  {
    label: "Perfectionist",
    arrow: "↗",
    position: "bottom-2 -left-2 sm:bottom-8 sm:-left-28",
  },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:px-10 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs tracking-[0.2em] text-paper-faint uppercase">
          [ About ]
        </span>
        <h1
          className={`${caveat.className} mt-3 text-6xl text-paper sm:text-8xl`}
        >
          Hi, I&apos;m Kamilla.
        </h1>
      </div>

      <div className="relative mx-auto mt-20 w-full max-w-[15rem] sm:mt-24 sm:max-w-xs">
        <div className="glass relative aspect-[3/4] -rotate-1 overflow-hidden rounded-2xl p-2">
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src="/about/kamilla.jpg"
              alt="Kamilla"
              fill
              sizes="320px"
              priority
              className="object-cover grayscale"
            />
          </div>
        </div>

        {FACTS.map((fact) => (
          <span
            key={fact.label}
            className={`${caveat.className} absolute hidden -rotate-3 items-center gap-1.5 text-xl text-paper sm:flex ${fact.position}`}
          >
            <span className="text-pink">{fact.arrow}</span>
            {fact.label}
          </span>
        ))}
      </div>

      <div
        className={`${caveat.className} mx-auto mt-10 flex max-w-sm flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-lg text-paper sm:hidden`}
      >
        {FACTS.map((fact) => (
          <span key={fact.label} className="inline-flex items-center gap-1">
            <span className="text-pink">✦</span>
            {fact.label}
          </span>
        ))}
      </div>
    </section>
  );
}
