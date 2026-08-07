import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/stories", label: "Stories" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

export default function Nav() {
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
          />
        </Link>

        <Link
          href="/write"
          className="col-start-3 flex items-center gap-2 justify-self-end rounded-full bg-pink py-1.5 pr-1.5 pl-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <span className="hidden sm:inline">Become a writer</span>
          <span className="sm:hidden">Write</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white">
            →
          </span>
        </Link>
      </div>
    </header>
  );
}
