export default function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="animate-glow-float absolute -right-24 top-[-10%] h-[32rem] w-[32rem] rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-glow-red) 0%, var(--color-pink) 40%, transparent 72%)",
        }}
      />
      <div
        className="animate-glow-float absolute -left-32 bottom-[-15%] h-[28rem] w-[28rem] rounded-full opacity-60 blur-[100px]"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(circle, var(--color-glow-indigo) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-glow-float absolute right-[15%] bottom-[5%] h-64 w-64 rounded-full opacity-50 blur-[70px]"
        style={{
          animationDelay: "-3s",
          background:
            "radial-gradient(circle, var(--color-glow-orange) 0%, var(--color-yellow) 45%, transparent 75%)",
        }}
      />
    </div>
  );
}
