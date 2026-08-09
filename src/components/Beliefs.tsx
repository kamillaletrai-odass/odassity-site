"use client";

import { useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const STATEMENTS = [
  "There is a breath before every bold thing.",
  "This is that breath.",
  "For the “odassity” you keep almost having.",
];

export default function Beliefs() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <section className="relative px-6 py-24 sm:px-10 sm:py-32">
      <ScrollReveal className="flex justify-center">
        <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
          The Why
        </span>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="relative mt-10 sm:mt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(250,238,225,0.22), transparent 70%)",
          }}
        />

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STATEMENTS.map((line, i) => (
            <div
              key={i}
              className="flex w-full shrink-0 snap-center items-center justify-center px-6 py-16 text-center sm:py-24"
            >
              <p className="max-w-3xl font-display text-4xl leading-[1.15] text-paper sm:text-6xl">
                {line}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-3">
          {STATEMENTS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to statement ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                active === i ? "bg-paper" : "bg-paper-faint"
              }`}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
