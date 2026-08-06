import ScrollReveal from "./ScrollReveal";
import NewsletterForm from "./NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="font-display text-display text-paper">
            A reminder to stay curious.
          </h2>
          <p className="mt-5 text-paper-dim">
            Every now and then, we send ideas worth carrying with you.
            Essays, discoveries, objects, and perspectives to help you slow
            down, think deeper, and stay connected to what makes you human.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8 flex justify-center">
          <NewsletterForm ctaLabel="Join the Odassity Letter" />
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <p className="mt-5 text-xs text-paper-faint">
            No noise. No daily spam. Just things worth opening.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
