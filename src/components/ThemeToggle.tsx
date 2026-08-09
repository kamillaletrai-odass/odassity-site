"use client";

import clsx from "clsx";
import { useTheme } from "./ThemeProvider";
import { useCookieConsent } from "./CookieConsentProvider";

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect
        x="3"
        y="4.5"
        width="18"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 20h7M12 16.5V20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v2.5M12 19v2.5M4.5 12H2M22 12h-2.5M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const OPTIONS = [
  { key: "system" as const, label: "System mood", Icon: SystemIcon },
  { key: "light" as const, label: "Light mood", Icon: SunIcon },
  { key: "dark" as const, label: "Dark mood", Icon: MoonIcon },
];

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const { consent, hydrated } = useCookieConsent();
  const bannerVisible = hydrated && consent === "unset";

  return (
    <div
      role="group"
      aria-label="Light or dark mood"
      className={clsx(
        "glass fixed right-4 z-50 flex items-center gap-1 rounded-full p-1.5 transition-[bottom] duration-300 sm:right-6",
        bannerVisible ? "bottom-24 sm:bottom-20" : "bottom-4 sm:bottom-6",
      )}
    >
      {OPTIONS.map(({ key, label, Icon }) => {
        const active = mode === key;
        return (
          <button
            key={key}
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={() => setMode(key)}
            className={clsx(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200",
              active
                ? "bg-pink text-white"
                : "text-paper-dim hover:text-paper",
            )}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}
