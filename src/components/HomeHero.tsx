"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LENSES } from "@/lib/lenses";
import type { ArticleMeta } from "@/lib/articles";
import LiquidAura from "./LiquidAura";

const MotionLink = motion.create(Link);

export default function HomeHero({
  articlesCount,
  teaser1,
  teaser2,
}: {
  articlesCount: number;
  teaser1?: ArticleMeta;
  teaser2?: ArticleMeta;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const auraScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const auraStyle = reduceMotion ? undefined : { scale: auraScale, opacity: auraOpacity };
  const contentStyle = reduceMotion ? undefined : { y: contentY, opacity: contentOpacity };

  return (
    <section ref={sectionRef} className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div style={auraStyle} className="absolute inset-0">
        <LiquidAura />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />

      <motion.div
        style={contentStyle}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pt-32 pb-20 sm:pb-28"
      >
        <span className="inline-block w-fit rounded-full border border-paper-faint/30 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-paper-dim backdrop-blur-sm">
          N&deg;01 — {articlesCount} stories and counting
        </span>
        <h1 className="mt-8 max-w-3xl font-display text-hero leading-[0.95] tracking-tight text-paper uppercase">
          Read today.
          <br />
          Understand <span className="text-pink">tomorrow.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-paper-dim">
          Psychology, social dynamics, and the art of being seen online —
          essays for people who want their feed to occasionally push back.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MotionLink
            href="/stories"
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white"
          >
            Start reading
          </MotionLink>
          <MotionLink
            href="/write"
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="glass rounded-full px-6 py-3 text-sm text-paper"
          >
            Become a writer
          </MotionLink>
        </div>
      </motion.div>

      {teaser1 && (
        <Link
          href={`/stories/${teaser1.slug}`}
          className="glass absolute top-28 right-6 z-10 hidden w-48 rounded-xl p-3 transition-transform hover:-translate-y-1 sm:block"
        >
          {teaser1.cover && (
            <div className="relative h-24 w-full overflow-hidden rounded-lg">
              <Image
                src={teaser1.cover}
                alt=""
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          )}
          <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-pink">
            {LENSES[teaser1.lens].label}
          </p>
          <p className="mt-1 font-display text-sm leading-snug text-paper">
            {teaser1.title}
          </p>
        </Link>
      )}

      {teaser2 && (
        <Link
          href={`/stories/${teaser2.slug}`}
          className="glass absolute top-[19rem] right-6 z-10 hidden w-44 rounded-xl p-3 transition-transform hover:-translate-y-1 lg:block"
        >
          {teaser2.cover && (
            <div className="relative h-20 w-full overflow-hidden rounded-lg">
              <Image
                src={teaser2.cover}
                alt=""
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
          )}
          <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-pink">
            {LENSES[teaser2.lens].label}
          </p>
          <p className="mt-1 font-display text-sm leading-snug text-paper">
            {teaser2.title}
          </p>
        </Link>
      )}
    </section>
  );
}
