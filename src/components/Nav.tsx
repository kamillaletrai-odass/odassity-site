"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/stories", label: "Stories" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

const mobileLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/write", label: "Become a writer" },
  { href: "/partner", label: "Partner with us" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="glass mx-auto grid max-w-5xl grid-cols-3 items-center rounded-full py-2 pr-2 pl-5">
        <nav className="hidden gap-7 text-sm text-paper-dim sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-8 w-8 flex-col items-start justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`block h-[1.5px] w-5 bg-paper transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-paper transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-paper transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>

        <Link
          href="/"
          className="col-start-2 flex items-center justify-self-center"
        >
          <Image
            src="/logo-mark.png"
            alt="Odassity"
            width={30}
            height={30}
            priority
            className="logo-mark"
          />
        </Link>

        <Link
          href="/write"
          className="col-start-3 flex items-center gap-2 justify-self-end rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          <span className="hidden sm:inline">Become a writer</span>
          <span className="sm:hidden">Write</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
            →
          </span>
        </Link>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl p-3 sm:hidden"
          >
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-paper text-ink"
                    : "text-paper-dim hover:text-paper"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
