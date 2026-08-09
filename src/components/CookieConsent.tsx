"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GoogleAnalytics from "./GoogleAnalytics";

type Consent = "unset" | "accepted" | "declined";
const STORAGE_KEY = "odassity-cookie-consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>("unset");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    }
    setHydrated(true);
  }, []);

  function choose(value: Exclude<Consent, "unset">) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}

      {hydrated && consent === "unset" && (
        <div className="glass fixed inset-x-0 bottom-0 z-[100] flex flex-col gap-3 p-4 text-paper sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-4">
          <p className="text-xs leading-snug text-paper-dim sm:text-sm">
            We use cookies to see how people read Odassity.{" "}
            <Link href="/privacy" className="text-paper underline underline-offset-2">
              Learn more
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => choose("declined")}
              className="rounded-full px-4 py-2 text-xs font-medium text-paper-dim transition-opacity hover:opacity-80 sm:text-sm"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-full bg-paper px-4 py-2 text-xs font-medium text-ink transition-opacity hover:opacity-90 sm:text-sm"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
