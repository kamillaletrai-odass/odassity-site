"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const STATEMENTS = [
  "There is a breath before every bold thing.",
  "This is that breath.",
  "For the “odassity” you keep almost having.",
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
        <div className="mx-auto flex max-w-4xl flex-col gap-14 text-center">
          {STATEMENTS.map((line, i) => (
            <p
              key={i}
              className="font-display text-5xl leading-[1.05] text-paper sm:text-7xl"
            >
              {line}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 sm:px-10">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(250,238,225,0.55), rgba(250,238,225,0.18) 45%, transparent 72%)",
          }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.6, 0.9, 0.6], scale: [1, 1.06, 1] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {STATEMENTS.map((line, i) => (
          <motion.p
            key={i}
            style={{ opacity: opacities[i] }}
            className="absolute max-w-4xl text-center font-display text-5xl leading-[1.05] text-paper sm:text-7xl"
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-paper-faint sm:bottom-14"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
