import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import NewsletterForm from "./NewsletterForm";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/write", label: "Become a writer" },
  { href: "/partner", label: "Partner with us" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/odassity" },
  { label: "TikTok", href: "https://www.tiktok.com/@odassity.com" },
  { label: "LinkedIn", href: "https://linkedin.com/company/odassity" },
];

export default function Footer() {
  return (
    <footer className="footer-photo relative overflow-hidden pb-[env(safe-area-inset-bottom)]">
      <div className="footer-gradient-top pointer-events-none absolute inset-0" />
      <div className="footer-gradient-bottom pointer-events-none absolute inset-x-0 bottom-0 h-72 sm:h-96" />

      <div className="relative px-6 pt-40 pb-16 text-center sm:px-10 sm:pt-56">
        <ScrollReveal>
          <h2 className="font-display text-5xl text-paper sm:text-7xl">
            Stay a little longer.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-paper">
            Join our mailing list. Get a little something to spark up your
            mind every now and then.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-10 flex justify-center">
          <NewsletterForm glass ctaLabel="Sign up" />
        </ScrollReveal>
      </div>

      <div className="relative grid grid-cols-1 gap-10 px-6 pt-16 pb-24 text-sm sm:grid-cols-3 sm:items-end sm:px-10 sm:pt-24 sm:pb-28">
        <div>
          <Image
            src="/logo-mark.png"
            alt="Odassity"
            width={26}
            height={26}
          />
          <div className="mt-4 flex flex-col gap-2 text-white">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-white sm:justify-self-center sm:self-end">
          Odassity&trade; &copy; {new Date().getFullYear()}
        </p>

        <div className="sm:justify-self-end sm:text-right">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Follow us on
          </span>
          <div className="mt-3 flex gap-4 sm:justify-end">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-white transition-opacity hover:opacity-70"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
