"use client";

import { useRef } from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className={`${caveat.className} text-5xl text-paper sm:text-7xl`}>
      {children}
    </h2>
  );
}

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl px-2 text-center">{children}</div>
  );
}

export default function AboutContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const opacity0 = useTransform(scrollYProgress, [0, 0.05, 0.19, 0.24], [0, 1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.19, 0.24, 0.38, 0.43], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.38, 0.43, 0.57, 0.62], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.57, 0.62, 0.76, 0.81], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.76, 0.81, 0.95, 1], [0, 1, 1, 0]);
  const opacities = [opacity0, opacity1, opacity2, opacity3, opacity4];

  const slideElements: React.ReactNode[] = [
    <Slide key="about">
      <Title>About</Title>
      <p className="mt-5 text-lg leading-relaxed text-paper-dim sm:text-xl">
        I&rsquo;ve rewritten this sentence four times already and I&rsquo;m
        still not happy with it, which is probably the most honest way to
        introduce myself. Writing and designing aren&rsquo;t things I do for
        work, they&rsquo;re how I find my way back to myself. I grew up
        between languages and countries, which maybe explains why
        I&rsquo;ve never fully trusted the easy, agreed-upon version of
        anything. I read philosophy for fun, rearrange a room until the
        light finally sits right, and still think a good disagreement is
        one of the more intimate things two people can have.
      </p>
    </Slide>,

    <Slide key="why">
      <Title>Why Odassity</Title>
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
    </Slide>,

    <Slide key="find">
      <Title>What You&rsquo;ll Find Here</Title>
      <p className="mt-5 text-lg leading-relaxed text-paper-dim sm:text-xl">
        A quiet retreat on the internet with slow content, refreshed every
        season. Ideas you sit with, not scroll past. Writing meant to feed
        the mind in a way a five-second video never will. Recurring series
        designed to make you come back on purpose, not out of habit. Every
        piece ends the same way, a small, strange fable, never explained,
        yours to finish however you like.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-paper-dim sm:text-xl">
        This is a place to have a conversation with yourself. To wrestle
        with an idea instead of just agreeing with it. For creators to
        share what they&rsquo;re actually thinking, not just what performs.
        A little whimsy dropped into an adult life that doesn&rsquo;t leave
        much room for it.
      </p>
    </Slide>,

    <Slide key="signoff">
      <p
        className={`${caveat.className} text-4xl leading-snug text-paper sm:text-6xl`}
      >
        The breath before the bold thing. For the &ldquo;odassity&rdquo; you
        keep almost having.
      </p>
      <p
        className={`${caveat.className} mt-8 text-3xl text-paper sm:text-4xl`}
      >
        Xo, Kamilla
      </p>
    </Slide>,

    <Slide key="partner">
      <Title>Create something meaningful with us.</Title>
      <p className="mt-5 text-base leading-relaxed text-paper-dim sm:text-lg">
        If you&rsquo;re a brand, a creator, or a thinker who sees the world
        the way we do, curious, a little audacious, allergic to the
        obvious, with something real to say and nowhere sharp enough to
        say it, raise a hand.
      </p>
      <Link
        href="/partner"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-opacity hover:opacity-90"
      >
        Partnership inquiries
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
          →
        </span>
      </Link>
    </Slide>,
  ];

  if (reduceMotion) {
    return (
      <section className="flex flex-col items-center gap-20 px-6 py-20 sm:px-10 sm:py-28">
        {slideElements}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: "625vh" }}>
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
          className="absolute inset-x-0 bottom-10 hidden flex-col items-center gap-2 text-paper-faint sm:bottom-14 sm:flex"
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
