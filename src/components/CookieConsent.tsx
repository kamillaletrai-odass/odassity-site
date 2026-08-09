"use client";

import Link from "next/link";
import GoogleAnalytics from "./GoogleAnalytics";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieConsent() {
  const { consent, hydrated, setConsent } = useCookieConsent();

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}

      {hydrated && consent === "unset" && (
        <div className="glass fixed inset-x-0 bottom-0 z-[100] flex flex-col gap-3 p-4 text-paper sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-4">
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
              onClick={() => setConsent("declined")}
              className="rounded-full px-4 py-2 text-xs font-medium text-paper-dim transition-opacity hover:opacity-80 sm:text-sm"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => setConsent("accepted")}
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
