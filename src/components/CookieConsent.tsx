"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import GoogleAnalytics from "./GoogleAnalytics";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieConsent() {
  const { consent, hydrated, setConsent } = useCookieConsent();
  const reduceMotion = useReducedMotion();

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}

      {hydrated && consent === "unset" && (
        <motion.div
          initial={reduceMotion ? undefined : { y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-[100] flex flex-col gap-4 rounded-t-3xl bg-paper p-6 text-ink shadow-[0_-12px_40px_rgba(0,0,0,0.3)] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:rounded-t-none sm:px-10 sm:py-5"
        >
          <p className="text-sm leading-snug sm:text-base">
            We use cookies to see how people read Odassity.{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Learn more
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => setConsent("declined")}
              className="flex-1 rounded-full px-5 py-3 text-sm font-medium transition-opacity hover:opacity-70 sm:flex-none sm:py-2.5"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              className="flex-1 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:flex-none sm:py-2.5"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
