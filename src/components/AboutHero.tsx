import Image from "next/image";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const FACTS = [
  { label: "Marketer", arrow: "↘", position: "top-[8%] left-[4%] sm:left-[10%]" },
  { label: "Writer", arrow: "↙", position: "top-[20%] right-[2%] sm:right-[8%]" },
  { label: "Wanderer", arrow: "→", position: "top-[46%] left-[1%] sm:left-[4%]" },
  {
    label: "Philosophy nerd",
    arrow: "↖",
    position: "top-[68%] right-[1%] sm:right-[4%]",
  },
  {
    label: "Perfectionist",
    arrow: "↗",
    position: "top-[88%] left-[4%] sm:left-[12%]",
  },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 sm:px-10 sm:pt-40">
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

      <div className="relative mx-auto mt-4 h-[70svh] max-w-3xl sm:h-[88svh]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,var(--color-pink-dim),transparent_65%)] opacity-70" />

        <Image
          src="/about/kamilla-cutout.png"
          alt="Kamilla"
          fill
          sizes="(min-width: 640px) 768px, 100vw"
          priority
          className="object-contain object-bottom"
        />

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
        className={`${caveat.className} mx-auto -mt-6 flex max-w-sm flex-wrap items-center justify-center gap-x-4 gap-y-2 pb-8 text-center text-lg text-paper sm:hidden`}
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
