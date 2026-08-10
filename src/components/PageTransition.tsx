"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const prevHref = useRef<string | null>(null);

  // Scroll to top on every client-side navigation, including query-only
  // changes (e.g. the stories page's lens filter) that don't change
  // pathname and so wouldn't otherwise trigger Next's default reset.
  // Runs on every render (no deps) so it catches search-param-only
  // navigations; the ref skips the very first mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prevHref.current !== null && prevHref.current !== window.location.href) {
      window.scrollTo(0, 0);
    }
    prevHref.current = window.location.href;
  });

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
