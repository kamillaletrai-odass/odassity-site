"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const STATEMENTS: [string, string, string][] = [
  ["We believe technology should ", "expand humanity, not replace it", "."],
  ["We believe curiosity is a ", "form of resistance", "."],
  ["We believe the future belongs to people who ", "remain deeply human", "."],
];

export default function Beliefs() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const opacity0 = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.36], [0, 1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.28, 0.36, 0.62, 0.7], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.62, 0.7, 0.94, 1], [0, 1, 1, 0]);
  const opacities = [opacity0, opacity1, opacity2];

  if (reduceMotion) {
    return (
      <section className="relative px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto flex max-w-3xl flex-col gap-14 text-center">
          {STATEMENTS.map(([pre, highlight, post], i) => (
            <p
              key={i}
              className="font-display text-3xl leading-snug text-paper sm:text-5xl"
            >
              {pre}
              <span className="text-pink">{highlight}</span>
              {post}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-pink-dim),transparent_60%)] opacity-50" />
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 sm:px-10">
        {STATEMENTS.map(([pre, highlight, post], i) => (
          <motion.p
            key={i}
            style={{ opacity: opacities[i] }}
            className="absolute max-w-3xl text-center font-display text-3xl leading-snug text-paper sm:text-5xl"
          >
            {pre}
            <span className="text-pink">{highlight}</span>
            {post}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
