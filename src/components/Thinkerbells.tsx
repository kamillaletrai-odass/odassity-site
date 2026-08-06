import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const FACES = [
  { offset: "translate-y-6 sm:translate-y-8" },
  { offset: "-translate-y-3 sm:-translate-y-4" },
  { offset: "-translate-y-8 sm:-translate-y-10" },
  { offset: "-translate-y-2 sm:-translate-y-3" },
  { offset: "translate-y-5 sm:translate-y-7" },
];

function PlaceholderFace() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7 text-paper-faint sm:h-9 sm:w-9"
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-lavender-dim),transparent_60%)] opacity-70" />

      <div className="relative mx-auto max-w-3xl">
        <div className="flex justify-center gap-3 sm:gap-5">
          {FACES.map((face, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div
                className={`glass flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl sm:h-24 sm:w-24 ${face.offset}`}
              >
                <PlaceholderFace />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          delay={0.3}
          className="mt-16 text-center sm:mt-24"
        >
          <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
            Community
          </span>
          <h2 className="mt-6 font-display text-5xl text-paper sm:text-7xl">
            Thinkerbells
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-paper-dim">
            Our community of writers, contributors, and curious minds who
            refuse to move through life on autopilot — designers, creators,
            dreamers, and readers who still follow their curiosity.
          </p>
          <Link
            href="/write"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            Join us
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper">
              →
            </span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
