import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const FACES = [
  { src: "/community/thinkerbells-1b.png", offset: "translate-y-6 sm:translate-y-16" },
  { src: "/community/thinkerbells-2b.png", offset: "-translate-y-2 sm:-translate-y-6" },
  { src: "/community/thinkerbells-3b.png", offset: "-translate-y-6 sm:-translate-y-20" },
  { src: "/community/thinkerbells-4.png", offset: "-translate-y-1 sm:-translate-y-5" },
  { src: "/community/thinkerbells-5b.png", offset: "translate-y-5 sm:translate-y-14" },
  { src: "/community/thinkerbells-6b.png", offset: "-translate-y-3 sm:-translate-y-9" },
];

// Mobile-only arc offsets: top row bows up at the center, bottom row bows
// down at the center, so the two rows loosely frame the text like a circle.
const TOP_OFFSETS = ["translate-y-3", "-translate-y-4", "translate-y-3"];
const BOTTOM_OFFSETS = ["-translate-y-3", "translate-y-4", "-translate-y-3"];

function Face({ src, offset }: { src: string; offset: string }) {
  return (
    <div
      className={`glass relative h-14 w-14 overflow-hidden rounded-xl transition-transform duration-500 ease-out hover:scale-110 sm:h-36 sm:w-36 sm:rounded-2xl ${offset}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 640px) 144px, 56px"
        className="object-cover"
      />
    </div>
  );
}

export default function Thinkerbells() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32">
      {/* Desktop: single row of six */}
      <div className="hidden justify-between gap-2 sm:flex sm:gap-3">
        {FACES.map((face, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <Face src={face.src} offset={face.offset} />
          </ScrollReveal>
        ))}
      </div>

      {/* Mobile: three above the text */}
      <div className="flex justify-center gap-4 sm:hidden">
        {FACES.slice(0, 3).map((face, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <Face src={face.src} offset={TOP_OFFSETS[i]} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal
        delay={0.3}
        className="relative mx-auto mt-10 max-w-3xl text-center sm:mt-24"
      >
        <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
          Community
        </span>
        <h2 className="mt-6 font-display text-5xl text-paper sm:text-7xl">
          Thinkerbells
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-paper-dim">
          Our community of writers, creators, and curious minds who
          refuse to move through life on autopilot.
        </p>
        <Link
          href="/write"
          className="glass mt-8 inline-flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Join us
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink">
            →
          </span>
        </Link>
      </ScrollReveal>

      {/* Mobile: three below the text */}
      <div className="mt-10 flex justify-center gap-4 sm:hidden">
        {FACES.slice(3, 6).map((face, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <Face src={face.src} offset={BOTTOM_OFFSETS[i]} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
