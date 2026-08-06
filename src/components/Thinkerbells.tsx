import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function Thinkerbells() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-lavender-dim),transparent_60%)] opacity-70" />

      <div className="relative mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="font-display text-display text-paper">
            For the Thinkerbells
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-6 space-y-5 text-lg text-paper-dim">
          <p>
            Thinkerbells are curious minds who refuse to move through life on
            autopilot.
          </p>
          <p>
            They question trends, search for meaning, notice details, and
            believe that ideas are worth exploring simply because they make
            us see the world differently.
          </p>
          <p>
            They are designers, creators, founders, dreamers, readers,
            builders, and anyone who still follows their curiosity.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-12 sm:mt-14">
          <p className="font-display text-2xl text-paper sm:text-3xl">
            Does this sound like you?
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <Link
              href="/write"
              className="inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Become a contributor
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
                →
              </span>
            </Link>
            <p className="text-sm text-paper-dim">
              Share your ideas, essays, observations, and perspectives with
              the Odassity community.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
