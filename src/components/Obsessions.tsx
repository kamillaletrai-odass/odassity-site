import ScrollReveal from "./ScrollReveal";
import MotifCard from "./MotifCard";

const TOPICS = [
  {
    word: "Outwards",
    description:
      "Identity as a performative act. On conformity, belonging, and thinking for yourself before it's cool to.",
    gradient:
      "linear-gradient(90deg, transparent 70%, #f9f3b866 100%), radial-gradient(circle at 35% 25%, #ffd0de 0%, #ffabc6 42%, #2b131c 100%)",
    Icon: DoorIcon,
  },
  {
    word: "Inwards",
    description:
      "The self, alone with itself. Get to know who you are before the world hands you an answer.",
    gradient:
      "linear-gradient(90deg, transparent 70%, #ece4ff66 100%), radial-gradient(circle at 40% 30%, #f9f3b8 0%, #f0e888 42%, #201f10 100%)",
    Icon: KeyIcon,
  },
  {
    word: "Autopsy",
    description:
      "Trends, cut open. A live wrestling with ideologies, modern or ancient.",
    gradient:
      "linear-gradient(90deg, transparent 70%, #d9f0ff66 100%), radial-gradient(circle at 45% 30%, #ece4ff 0%, #c9b6f2 42%, #140f22 100%)",
    Icon: KnifeIcon,
  },
  {
    word: "Digicore",
    description:
      "AI, internet culture, the chronically online. Never anti-machine, always anti-autopilot.",
    gradient:
      "linear-gradient(90deg, transparent 70%, #ffd0de66 100%), radial-gradient(circle at 40% 30%, #d9f0ff 0%, #a8dcf5 42%, #0a1620 100%)",
    Icon: CursorIcon,
  },
  {
    word: "Aesthetics",
    description:
      "Beauty as the consequence of the thinking behind it. Rooted in neuroaesthetics.",
    gradient:
      "conic-gradient(from 180deg at 50% 50%, #ffd0de, #f9f3b8, #d9f0ff, #ece4ff, #ffd0de)",
    Icon: PaletteIcon,
  },
];

function DoorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.5" cy="12" r="0.9" fill="currentColor" />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="7" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M11 12h10M17 12v3M20 12v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KnifeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 20L13 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13 11L19 5C20 4 21 5 20 6L14 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CursorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 3L18 13.5L12.2 14.8L15.5 21L12.8 22.2L9.5 16L5 19.5V3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3C6.5 3 2 6.8 2 11.5C2 15 4.5 16 6.5 16C7.3 16 7.7 15.4 7.2 14.7C6.7 14 7 13 8 13H15C18 13 20 10.8 20 8.5C20 5.5 16.5 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="9" r="1" fill="currentColor" />
      <circle cx="11" cy="6.5" r="1" fill="currentColor" />
      <circle cx="16" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Obsessions() {
  return (
    <section className="px-6 pt-36 pb-20 sm:px-10 sm:pt-48 sm:pb-28">
      <ScrollReveal className="flex justify-center">
        <span className="glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper">
          Recurring Motifs
        </span>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
        {TOPICS.map((topic, i) => (
          <ScrollReveal key={topic.word} delay={Math.min(i * 0.06, 0.3)}>
            <MotifCard
              index={i}
              word={topic.word}
              description={topic.description}
              gradient={topic.gradient}
              icon={
                <topic.Icon className="h-16 w-16 text-paper-faint [filter:drop-shadow(1px_1px_1px_rgba(0,0,0,0.45))_drop-shadow(-1px_-1px_1px_rgba(255,255,255,0.12))]" />
              }
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
