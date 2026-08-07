"use client";

import { useRef } from "react";
import { Barlow_Semi_Condensed } from "next/font/google";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LENSES } from "@/lib/lenses";
import type { ArticleMeta } from "@/lib/articles";

const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const MotionLink = motion.create(Link);

// Update each season — shows as a small magazine-style issue label above the wordmark.
const EDITION = "No. 01 — Summer Edition";

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

  // Background keeps a subtle scroll-linked zoom. The whole section fades
  // out uniformly (not individual pieces) so nothing goes out of sync —
  // that mismatch is what caused the old "clips then reappears" glitch.
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageStyle = reduceMotion ? undefined : { scale: imageScale };
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sectionStyle = reduceMotion ? undefined : { opacity: sectionOpacity };

  return (
    <motion.section
      ref={sectionRef}
      style={sectionStyle}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <motion.div style={imageStyle} className="absolute inset-0">
        <Image
          src="/hero/dragonfly.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55svh] bg-gradient-to-b from-transparent to-ink" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end gap-8 p-6 pb-10 sm:flex-row sm:items-end sm:justify-between sm:p-10">
        <div>
          <span className="block text-xs font-semibold tracking-[0.3em] text-paper-dim uppercase sm:text-sm">
            {EDITION}
          </span>
          <h1
            className={`${barlow.className} text-[clamp(4rem,19vw,15rem)] leading-[1.05] tracking-[0.03em] text-paper`}
          >
            Odassity
          </h1>
        </div>

        <div className="max-w-xs sm:pb-2">
          <p className="text-sm text-paper-dim">
            In pursuit of the art of being. Come along in a world where time
            is intentional, thoughts are clear, and every story leads
            further inward.
          </p>
          <MotionLink
            href="/stories"
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink"
          >
            Explore
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
              →
            </span>
          </MotionLink>
        </div>
      </div>

      {teaser1 && (
        <Link
          href={`/stories/${teaser1.slug}`}
          className="glass group absolute top-24 right-6 z-10 hidden w-48 rounded-xl p-3 transition-transform duration-300 hover:scale-[1.04] sm:block"
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute -top-3 -left-3 z-20 rounded-full bg-paper px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.12em] text-ink uppercase shadow-lg"
          >
            Most viewed
          </motion.span>
          {teaser1.cover && (
            <div className="relative h-24 w-full overflow-hidden rounded-lg">
              <Image
                src={teaser1.cover}
                alt=""
                fill
                sizes="192px"
                className="warm-grayscale object-cover"
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
          className="glass group absolute top-[21rem] right-6 z-10 hidden w-48 rounded-xl p-3 transition-transform duration-300 hover:scale-[1.04] lg:block"
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }
            }
            className="absolute -top-3 -left-3 z-20 rounded-full bg-paper px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.12em] text-ink uppercase shadow-lg"
          >
            Most recent
          </motion.span>
          {teaser2.cover && (
            <div className="relative h-24 w-full overflow-hidden rounded-lg">
              <Image
                src={teaser2.cover}
                alt=""
                fill
                sizes="192px"
                className="warm-grayscale object-cover"
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
    </motion.section>
  );
}
