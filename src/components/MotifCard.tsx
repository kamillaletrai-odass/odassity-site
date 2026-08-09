"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export default function MotifCard({
  index,
  word,
  description,
  gradient,
  icon,
}: {
  index: number;
  word: string;
  description: string;
  gradient: string;
  icon: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [centered, setCentered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCentered(entry.isIntersecting),
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group glass relative cursor-default overflow-hidden rounded-2xl p-4 transition-transform duration-500 ease-out sm:aspect-[3/4] sm:hover:z-10 sm:hover:scale-[1.08] sm:p-5"
    >
      {/* Embossed icon, standby only, desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-100 transition-opacity duration-500 group-hover:opacity-0 sm:flex">
        {icon}
      </div>

      {/* Abstract gradient: colored when centered in view on mobile, hover on desktop */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100 ${
          centered ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: gradient }}
      />
      {/* Light mist */}
      <div
        className={`pointer-events-none absolute inset-0 blur-2xl transition-opacity duration-500 sm:group-hover:opacity-100 ${
          centered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.4), transparent 65%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

      <div className="relative flex flex-col justify-between sm:h-full">
        <span className="glass inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
          Motif {index + 1}
        </span>

        {/* Mobile: always-visible title + description (no hover on touch) */}
        <div className="mt-4 sm:hidden">
          <h3 className="font-display text-2xl text-paper">{word}</h3>
          <p className="mt-2 text-sm leading-snug text-paper-dim">
            {description}
          </p>
        </div>

        {/* Desktop: standby hint (shimmer text), replaced by title + description on hover */}
        <div className="relative hidden sm:block">
          <p className="text-shine text-xs font-semibold tracking-[0.2em] uppercase transition-opacity duration-300 group-hover:opacity-0">
            Reveal
          </p>
          <div className="absolute inset-x-0 bottom-0 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
            <p className="text-sm leading-snug text-paper-dim">
              {description}
            </p>
            <h3 className="mt-2 font-display text-2xl text-paper">{word}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
