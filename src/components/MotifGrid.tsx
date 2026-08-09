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

export default function MotifGrid({ topics }: { topics: Topic[] }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let ticking = false;

    function computeActive() {
      ticking = false;
      const viewportCenter = window.innerHeight / 2;
      const threshold = window.innerHeight * 0.3;

      let closestIndex: number | null = null;
      let closestDistance = Infinity;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestDistance < threshold ? closestIndex : null);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(computeActive);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
