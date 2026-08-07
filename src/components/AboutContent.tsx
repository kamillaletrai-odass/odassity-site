"use client";

import { useRef } from "react";
import { Caveat } from "next/font/google";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"];

function SlideCard({
  children,
  rotate,
}: {
  children: React.ReactNode;
  rotate: string;
}) {
  return (
    <div
      className={`${rotate} max-w-xl rounded-2xl border border-dashed border-paper-faint/30 bg-paper/[0.03] p-8 backdrop-blur-sm sm:p-10`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] text-paper-faint uppercase">
      [ {children} ]
    </span>
  );
}

export default function AboutContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const opacity0 = useTransform(scrollYProgress, [0, 0.04, 0.19, 0.24], [0, 1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.19, 0.24, 0.44, 0.49], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.44, 0.49, 0.79, 0.84], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.79, 0.84, 0.96, 1], [0, 1, 1, 0]);
  const opacities = [opacity0, opacity1, opacity2, opacity3];

  const slideElements: React.ReactNode[] = [
    <SlideCard key="about" rotate={ROTATIONS[0]}>
      <Eyebrow>About</Eyebrow>
      <p className="mt-5 text-lg leading-relaxed text-paper-dim sm:text-xl">
        I market for a living, write because I have to, and spend most of my
        free hours somewhere in between. Mostly here. I grew up between
        languages and countries, which maybe explains why I&rsquo;ve never
        fully trusted the easy, agreed-upon version of anything. I&rsquo;m
        the person who reads philosophy for fun and still can&rsquo;t stop
        rearranging a room until the light hits it right.
      </p>
    </SlideCard>,

    <SlideCard key="why" rotate={ROTATIONS[1]}>
      <Eyebrow>Why Odassity</Eyebrow>
      <p className="mt-5 text-lg leading-relaxed text-paper-dim sm:text-xl">
        There&rsquo;s a breath everyone takes right before they do something
        bold, right before they say the true thing instead of the easy
        thing. Most of modern life is built to make you skip that breath
        entirely. Odassity is built to make you take it.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-paper-dim sm:text-xl">
        I wanted a little world of my own, a bit ethereal, a bit utopian,
        entirely mine, and then I wanted to open the door and let other
        people in. Not to follow me. To find their own version of that same
        breath. To become a little more intentional in a life that&rsquo;s
        mostly designed to keep you reactive instead.
      </p>
      <p
        className={`${caveat.className} mt-6 text-2xl text-paper sm:text-3xl`}
      >
        Odassity is a world I wanted to live inside, so I made it. And
        I&rsquo;d rather not live in it alone.
      </p>
    </SlideCard>,

    <SlideCard key="find" rotate={ROTATIONS[2]}>
      <Eyebrow>What You&rsquo;ll Find Here</Eyebrow>
      <p className="mt-5 text-lg leading-relaxed text-paper-dim sm:text-xl">
        New every season, never fast. Ideas you sit with, not scroll past.
        Writing meant to feed the mind in a way a five-second video never
        will. Recurring series designed to make you come back on purpose,
        not out of habit. Every piece ends the same way, a small, strange
        fable, never explained, yours to finish however you like.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-paper-dim sm:text-xl">
        This is a place to have a conversation with yourself. To wrestle
        with an idea instead of just agreeing with it. For creators to
        share what they&rsquo;re actually thinking, not just what performs.
        A little whimsy dropped into an adult life that doesn&rsquo;t leave
        much room for it.
      </p>
      <p className="mt-6 font-display text-xl text-paper italic sm:text-2xl">
        Read today. Understand tomorrow.
      </p>
      <p className="mt-2 text-sm text-paper-dim">
        That&rsquo;s what I work towards. A feed that feeds your brain.
      </p>
      <p
        className={`${caveat.className} mt-6 text-3xl text-paper sm:text-4xl`}
      >
        Xo, Kamilla
      </p>
    </SlideCard>,

    <SlideCard key="partner" rotate={ROTATIONS[3]}>
      <Eyebrow>Let&rsquo;s work together</Eyebrow>
      <p
        className={`${caveat.className} mt-5 text-3xl text-paper sm:text-4xl`}
      >
        Create something meaningful with us.
      </p>
      <p className="mt-4 text-base leading-relaxed text-paper-dim sm:text-lg">
        We collaborate with brands, creators, and thinkers who share our
        belief that the things we create should have a story behind them.
      </p>
      <a
        href="mailto:kamilla@odassity.com?subject=Partnership%20Inquiry"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-opacity hover:opacity-90"
      >
        Partnership inquiries
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
          →
        </span>
      </a>
    </SlideCard>,
  ];

  if (reduceMotion) {
    return (
      <section className="flex flex-col items-center gap-10 px-6 py-20 sm:px-10 sm:py-28">
        {slideElements}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 sm:px-10">
        {slideElements.map((slide, i) => (
          <motion.div
            key={i}
            style={{ opacity: opacities[i] }}
            className="absolute"
          >
            {slide}
          </motion.div>
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
