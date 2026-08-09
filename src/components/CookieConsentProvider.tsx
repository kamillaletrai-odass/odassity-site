"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Consent = "unset" | "accepted" | "declined";
const STORAGE_KEY = "odassity-cookie-consent";

const CookieConsentContext = createContext<{
  consent: Consent;
  hydrated: boolean;
  setConsent: (value: Exclude<Consent, "unset">) => void;
} | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent>("unset");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsentState(stored);
    }
    setHydrated(true);
  }, []);

  function setConsent(value: Exclude<Consent, "unset">) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsentState(value);
  }

  return (
    <CookieConsentContext.Provider value={{ consent, hydrated, setConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
