"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import MotifCard from "./MotifCard";

type Topic = {
  word: string;
  description: string;
  gradient: string;
  icon: ReactNode;
};

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);
const MIN_RATIO_TO_ACTIVATE = 0.35;

export default function MotifGrid({ topics }: { topics: Topic[] }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ratios = useRef<number[]>(topics.map(() => 0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) ratios.current[idx] = entry.intersectionRatio;
        });

        let bestIndex: number | null = null;
        let bestRatio = MIN_RATIO_TO_ACTIVATE;
        ratios.current.forEach((ratio, i) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = i;
          }
        });
        setActiveIndex(bestIndex);
      },
      { threshold: THRESHOLDS, rootMargin: "-20% 0px -20% 0px" },
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [topics.length]);

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
      {topics.map((topic, i) => (
        <ScrollReveal key={topic.word} delay={Math.min(i * 0.06, 0.3)}>
          <MotifCard
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            index={i}
            word={topic.word}
            description={topic.description}
            gradient={topic.gradient}
            icon={topic.icon}
            active={activeIndex === i}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
