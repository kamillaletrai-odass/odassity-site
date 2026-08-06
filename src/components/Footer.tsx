import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="px-6 pt-12 pb-8 sm:px-10 sm:pt-16 sm:pb-10">
      <ScrollReveal className="mx-auto max-w-2xl pb-16 text-center sm:pb-20">
        <p className="font-display text-2xl text-paper sm:text-3xl">
          Stay curious. Stay human.
        </p>
        <p className="mt-4 text-paper-dim">
          Embrace Odassity in a world becoming increasingly synthetic.
        </p>
        <p className="mt-2 text-paper-dim">
          Come in. Take a seat. There is always something worth thinking
          about.
        </p>
      </ScrollReveal>

      <div className="glass flex flex-col gap-10 rounded-3xl px-6 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-10">
        <div className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="Odassity" width={28} height={28} />
          <span className="font-display text-lg text-paper">Odassity</span>
        </div>

        <div className="flex flex-wrap gap-16 text-sm text-paper-dim">
          <div className="flex flex-col gap-2">
            <span className="mb-1 text-xs uppercase tracking-[0.18em] text-paper-faint">
              Site
            </span>
            <Link href="/" className="transition-colors hover:text-paper">
              Home
            </Link>
            <Link
              href="/stories"
              className="transition-colors hover:text-paper"
            >
              Stories
            </Link>
            <Link
              href="/community"
              className="transition-colors hover:text-paper"
            >
              Community
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-paper"
            >
              About
            </Link>
            <Link
              href="/write"
              className="transition-colors hover:text-paper"
            >
              Become a writer
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mb-1 text-xs uppercase tracking-[0.18em] text-paper-faint">
              Contact
            </span>
            <a
              href="mailto:kamilla@odassity.com"
              className="transition-colors hover:text-paper"
            >
              kamilla@odassity.com
            </a>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-paper-faint">
        © {new Date().getFullYear()} Odassity. All rights reserved.
      </p>
    </footer>
  );
}
