import Image from "next/image";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

function ArrowDownRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 70" fill="none" className={className}>
      <circle cx="6" cy="6" r="2.2" fill="currentColor" />
      <path
        d="M6.5 6.5C30 14 55 24 72 34C88 44 98 50 110 58"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M110 58L99.5 52"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M110 58L103 46.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowDownLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 70" fill="none" className={className}>
      <circle cx="124" cy="6" r="2.2" fill="currentColor" />
      <path
        d="M123.5 6.5C99 14 75 24 58 34C42 44 32 50 20 58"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 58L30.5 55.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 58C18.7 52 23 48.7 27.5 52.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 40" fill="none" className={className}>
      <circle cx="6" cy="20" r="2.2" fill="currentColor" />
      <path
        d="M6.5 20.3C40 11.5 75 28.5 110 18.3C120 15.3 130 20 140 22"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M140 22L127.5 14.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M140 22L129.5 29"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 70" fill="none" className={className}>
      <circle cx="124" cy="64" r="2.2" fill="currentColor" />
      <path
        d="M123.5 63.5C99 55 75 40 58 30C42 20 32 15 20 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 10L30.5 12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 10C18.7 16 23 19.3 27.5 15.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 70" fill="none" className={className}>
      <circle cx="6" cy="64" r="2.2" fill="currentColor" />
      <path
        d="M6.5 63.5C30 55 55 40 72 30C88 20 98 15 110 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M110 10L99.5 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M110 10L103 21.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const FACTS = [
  {
    label: "I write positioning docs for a living, I doubt my own.",
    Arrow: ArrowDownRight,
    side: "left" as const,
    position: "top-[6%] left-[2%] sm:left-[5%]",
    arrowClass: "h-12 w-20 sm:h-16 sm:w-28",
  },
  {
    label: "I talk like I edit, I don't.",
    Arrow: ArrowDownLeft,
    side: "right" as const,
    position: "top-[19%] right-[0%] sm:right-[3%]",
    arrowClass: "h-12 w-20 sm:h-16 sm:w-28",
  },
  {
    label: "I feel most home when on the road.",
    Arrow: ArrowRight,
    side: "left" as const,
    position: "top-[46%] left-[-2%] sm:left-[0%]",
    arrowClass: "h-8 w-24 sm:h-10 sm:w-32",
  },
  {
    label: "I read the last page of every book first.",
    Arrow: ArrowUpLeft,
    side: "right" as const,
    position: "top-[68%] right-[-2%] sm:right-[0%]",
    arrowClass: "h-12 w-20 sm:h-16 sm:w-28",
  },
  {
    label: "I read Kafka for fun, unfortunately.",
    Arrow: ArrowUpRight,
    side: "left" as const,
    position: "top-[87%] left-[2%] sm:left-[6%]",
    arrowClass: "h-12 w-20 sm:h-16 sm:w-28",
  },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 sm:px-10 sm:pt-40">
      <div className="mx-auto max-w-2xl text-center">
        <h1
          className={`${caveat.className} flex flex-col text-6xl text-paper sm:text-8xl`}
        >
          <span>Hi,</span>
          <span>I&apos;m Kamilla</span>
        </h1>
      </div>

      <div className="relative mx-auto mt-4 h-[70svh] max-w-3xl sm:h-[88svh]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,var(--color-pink-dim),transparent_65%)] opacity-70" />

        <Image
          src="/about/kamilla-dark.png"
          alt="Kamilla"
          fill
          sizes="(min-width: 640px) 768px, 100vw"
          priority
          className="kamilla-photo-dark object-contain object-bottom"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 72%, transparent 97%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 72%, transparent 97%)",
          }}
        />
        <Image
          src="/about/kamilla-cutout.png"
          alt="Kamilla"
          fill
          sizes="(min-width: 640px) 768px, 100vw"
          className="kamilla-photo-light object-contain object-bottom"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 72%, transparent 97%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 72%, transparent 97%)",
          }}
        />

        {FACTS.map((fact) => (
          <span
            key={fact.label}
            className={`${caveat.className} absolute hidden -rotate-2 items-center gap-1 text-lg leading-snug text-paper sm:flex ${fact.position} ${
              fact.side === "right"
                ? "text-right"
                : `text-left ${fact.side === "left" ? "flex-row-reverse" : ""}`
            }`}
          >
            <fact.Arrow className={`shrink-0 text-pink ${fact.arrowClass}`} />
            <span className="max-w-[8.5rem]">{fact.label}</span>
          </span>
        ))}
      </div>

      <div
        className={`${caveat.className} mx-auto -mt-6 flex max-w-sm flex-col items-center gap-3 pb-8 text-center text-lg text-paper sm:hidden`}
      >
        {FACTS.map((fact) => (
          <span key={fact.label} className="inline-flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
            {fact.label}
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 pb-10 text-paper-faint">
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-bounce">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
