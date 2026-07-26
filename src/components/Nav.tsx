import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/write", label: "Become a writer" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper-faint/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-paper"
        >
          Odassity
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
