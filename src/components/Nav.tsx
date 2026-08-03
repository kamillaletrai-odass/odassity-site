import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/write", label: "Become a writer" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper-faint/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-mark.png"
            alt=""
            width={22}
            height={22}
            className="opacity-90"
          />
          <Image
            src="/logo.png"
            alt="Odassity"
            width={112}
            height={33}
            priority
          />
        </Link>
        <nav className="hidden gap-8 text-sm tracking-wide text-paper-dim sm:flex">
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
        <Link
          href="/write"
          className="rounded-full border border-paper-faint/30 px-4 py-1.5 text-sm text-paper transition-colors hover:border-paper/60 sm:hidden"
        >
          Write
        </Link>
      </div>
    </header>
  );
}
