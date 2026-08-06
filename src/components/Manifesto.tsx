import ScrollReveal from "./ScrollReveal";

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-pink-dim),transparent_60%)] opacity-60" />

      <div className="relative mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="font-display text-3xl leading-tight text-paper italic sm:text-5xl">
            &ldquo;A little corner for people who still notice things.&rdquo;
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10 space-y-5 sm:mt-14">
          <p className="text-lg text-paper-dim sm:text-xl">
            We live in a world designed to make everything faster, louder,
            and more disposable.
          </p>
          <p className="text-lg text-paper-dim sm:text-xl">
            Odassity exists for those who believe there is still value in
            slowing down, paying attention, and asking better questions.
          </p>
        </ScrollReveal>

        <div className="mt-14 space-y-7 sm:mt-16 sm:space-y-8">
          <ScrollReveal delay={0.18}>
            <p className="font-display text-2xl leading-snug text-paper sm:text-3xl">
              We believe taste is not about having the newest thing. It is
              about <span className="text-pink">understanding why something
              matters</span>.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.26}>
            <p className="font-display text-2xl leading-snug text-paper sm:text-3xl">
              We believe technology should{" "}
              <span className="text-pink">expand humanity, not replace it</span>.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.34}>
            <p className="font-display text-2xl leading-snug text-paper sm:text-3xl">
              We believe curiosity is a{" "}
              <span className="text-pink">form of resistance</span>.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.42}>
            <p className="font-display text-2xl leading-snug text-paper sm:text-3xl">
              We believe the future belongs to people who{" "}
              <span className="text-pink">remain deeply human</span>.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
