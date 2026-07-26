import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-paper-faint/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <h2 className="font-display text-2xl text-paper">
            Read the next one first.
          </h2>
          <p className="mt-2 text-sm text-paper-dim">
            Subscribe to the newsletter — be the first to know when a new
            story drops.
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>
        <div className="flex gap-16 text-sm text-paper-dim">
          <div className="flex flex-col gap-2">
            <span className="mb-1 text-xs uppercase tracking-[0.18em] text-paper-faint">
              Site
            </span>
            <Link href="/" className="hover:text-paper">
              Home
            </Link>
            <Link href="/stories" className="hover:text-paper">
              Stories
            </Link>
            <Link href="/about" className="hover:text-paper">
              About
            </Link>
            <Link href="/write" className="hover:text-paper">
              Become a writer
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mb-1 text-xs uppercase tracking-[0.18em] text-paper-faint">
              Contact
            </span>
            <a href="mailto:kamilla@odassity.com" className="hover:text-paper">
              kamilla@odassity.com
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-10 text-xs text-paper-faint">
        © {new Date().getFullYear()} Odassity. All rights reserved.
      </div>
    </footer>
  );
}
