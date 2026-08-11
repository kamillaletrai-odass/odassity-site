"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { ArticleMeta } from "@/lib/articles";
import LensTag from "./LensTag";

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

export default function StoryCard({
  article,
  size = "md",
}: {
  article: ArticleMeta;
  size?: "lg" | "md" | "sm";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Desktop already reveals color on hover — only track scroll position
    // on mobile, where there's no real hover to rely on.
    if (window.matchMedia("(min-width: 640px)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.intersectionRatio > 0.55),
      { threshold: THRESHOLDS, rootMargin: "-20% 0px -20% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/stories/${article.slug}`}
      className={clsx(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02]",
        size === "lg" && "min-h-[28rem]",
        size === "md" && "min-h-[22rem]",
        size === "sm" && "min-h-[16rem]",
      )}
    >
      {article.cover && (
        <Image
          src={article.cover}
          alt=""
          fill
          sizes={size === "lg" ? "100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className={clsx(
            "object-cover transition-[filter] duration-500",
            !active && "warm-grayscale",
          )}
          priority={size === "lg"}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

      <div
        className={clsx(
          "glass relative m-4 rounded-xl sm:m-5",
          size === "lg" ? "p-6 sm:p-7" : "p-4 sm:p-5",
        )}
      >
        <LensTag lens={article.lens} size={size === "lg" ? "md" : "sm"} />
        <h3
          className={clsx(
            "mt-3 font-display leading-tight text-paper transition-colors group-hover:text-paper/90",
            size === "lg" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          {article.title}
        </h3>
        <p
          className={clsx(
            "text-paper-dim",
            size === "lg" ? "mt-3 max-w-2xl text-base" : "mt-2 text-sm",
          )}
        >
          {article.dek}
        </p>
      </div>
    </Link>
  );
}
