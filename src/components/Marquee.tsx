const WORDS = [
  "MIRROR",
  "RAW",
  "AUTOPSY",
  "SLOW CONTENT",
  "STIMULATE YOUR BRAIN",
  "NOT ANOTHER FEED",
];

function Strip() {
  return (
    <span className="flex shrink-0 items-center">
      {WORDS.map((word) => (
        <span key={word} className="mx-4 flex items-center">
          <span className="text-sm font-semibold tracking-[0.2em] text-ink">
            {word}
          </span>
          <span className="ml-4 h-1.5 w-1.5 rounded-full bg-ink/40" />
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-yellow py-3">
      <div className="flex w-max animate-marquee">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
