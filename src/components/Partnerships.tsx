import ScrollReveal from "./ScrollReveal";

export default function Partnerships() {
  return (
    <section className="border-t border-paper-faint/10 px-6 py-16 sm:px-10 sm:py-20">
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-2xl text-paper sm:text-3xl">
          &ldquo;Create something meaningful with us.&rdquo;
        </h2>
        <p className="mt-4 text-paper-dim">
          We collaborate with brands, creators, and thinkers who share our
          belief that the things we create should have a story behind them.
        </p>
        <a
          href="mailto:kamilla@odassity.com?subject=Partnership%20Inquiry"
          className="glass mt-6 inline-flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-4 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Partnership inquiries
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink text-white">
            →
          </span>
        </a>
      </ScrollReveal>
    </section>
  );
}
