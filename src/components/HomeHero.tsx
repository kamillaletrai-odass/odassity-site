"use client";

import { useRef } from "react";
import { Barlow_Semi_Condensed } from "next/font/google";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LENSES } from "@/lib/lenses";
import type { ArticleMeta } from "@/lib/articles";
import LiquidHeroImage from "./LiquidHeroImage";

const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const MotionLink = motion.create(Link);

export default function HomeHero({
  teaser1,
  teaser2,
}: {
  teaser1?: ArticleMeta;
  teaser2?: ArticleMeta;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const imageStyle = reduceMotion ? undefined : { scale: imageScale };
  const contentStyle = reduceMotion ? undefined : { y: contentY, opacity: contentOpacity };

  return (
    <section ref={sectionRef} className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div style={imageStyle} className="absolute inset-0">
        <LiquidHeroImage src="/hero/dragonfly.jpg" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/25" />

      <motion.div
        style={contentStyle}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end gap-8 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10"
      >
        <h1
          className={`${barlow.className} text-[clamp(3.5rem,15vw,10rem)] leading-[0.85] tracking-[0.03em] text-paper`}
        >
          Odassity
        </h1>

        <div className="max-w-xs sm:pb-2">
          <p className="text-sm text-paper-dim">
            Psychology, social dynamics, and the art of being seen online —
            essays for people who want their feed to occasionally push
            back.
          </p>
          <MotionLink
            href="/stories"
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink"
          >
            Start reading
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
              →
            </span>
          </MotionLink>
        </div>
      </motion.div>

      {teaser1 && (
        <Link
          href={`/stories/${teaser1.slug}`}
          className="glass absolute top-24 right-6 z-10 hidden w-48 rounded-xl p-3 transition-transform hover:-translate-y-1 sm:block"
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
          className="glass absolute top-[21rem] right-6 z-10 hidden w-48 rounded-xl p-3 transition-transform hover:-translate-y-1 lg:block"
        >
          {teaser2.cover && (
            <div className="relative h-24 w-full overflow-hidden rounded-lg">
              <Image
                src={teaser2.cover}
                alt=""
                fill
                sizes="192px"
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
