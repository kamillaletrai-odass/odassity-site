import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const FACES = [
  { offset: "translate-y-6 sm:translate-y-16" },
  { offset: "-translate-y-2 sm:-translate-y-6" },
  { offset: "-translate-y-6 sm:-translate-y-20" },
  { offset: "-translate-y-1 sm:-translate-y-5" },
  { offset: "translate-y-5 sm:translate-y-14" },
];

function PlaceholderFace() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-paper-faint sm:h-12 sm:w-12"
    >
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Thinkerbells() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32">
      <div className="flex justify-between gap-2 sm:gap-3">
        {FACES.map((face, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div
              className={`glass flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl sm:h-36 sm:w-36 sm:rounded-2xl ${face.offset}`}
            >
              <PlaceholderFace />
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal
        delay={0.3}
        className="relative mx-auto mt-16 max-w-3xl text-center sm:mt-24"
      >
        <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
          Community
        </span>
        <h2 className="mt-6 font-display text-5xl text-paper sm:text-7xl">
          Thinkerbells
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-paper-dim">
          Our community of writers, contributors, and curious minds who
          refuse to move through life on autopilot.
        </p>
        <Link
          href="/write"
          className="glass mt-8 inline-flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Join us
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink text-white">
            →
          </span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
