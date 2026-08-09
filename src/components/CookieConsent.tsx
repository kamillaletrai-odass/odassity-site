"use client";

import { useEffect, useState } from "react";
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
        <div className="glass fixed right-3 bottom-3 z-[100] flex w-52 flex-col gap-2.5 rounded-2xl p-3.5 text-paper sm:right-6 sm:bottom-6 sm:w-64">
          <p className="text-xs leading-snug text-paper-dim">
            We use cookies to see how people read Odassity.
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => choose("declined")}
              className="flex-1 rounded-full px-3 py-1.5 text-xs font-medium text-paper-dim transition-opacity hover:opacity-80"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="flex-1 rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-opacity hover:opacity-90"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
