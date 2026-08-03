"use client";

import { useState } from "react";

export default function NewsletterForm({
  compact = false,
  theme = "dark",
}: {
  compact?: boolean;
  theme?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const textColor = theme === "dark" ? "text-paper" : "text-ink";
  const inputClass =
    theme === "dark"
      ? "border-paper-faint/30 text-paper placeholder:text-paper-faint focus:border-paper/60"
      : "border-ink-faint text-ink placeholder:text-ink-dim focus:border-pink/60";

  if (status === "sent") {
    return (
      <p className={compact ? `text-sm ${textColor}` : textColor}>
        You&rsquo;re on the list. First story lands in your inbox soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className={`w-full rounded-full border bg-transparent px-4 py-2.5 text-sm focus:outline-none ${inputClass}`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="whitespace-nowrap rounded-full bg-pink px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-pink sm:hidden">
          Something went wrong — try again in a moment.
        </p>
      )}
    </form>
  );
}
