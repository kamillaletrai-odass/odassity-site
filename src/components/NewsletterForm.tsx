"use client";

import { useState } from "react";
import clsx from "clsx";

export default function NewsletterForm({
  compact = false,
  ctaLabel = "Subscribe",
  glass = false,
}: {
  compact?: boolean;
  ctaLabel?: string;
  glass?: boolean;
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

  if (status === "sent") {
    return (
      <p className={compact ? "text-sm text-paper" : "text-paper"}>
        You&rsquo;re on the list. First story lands in your inbox soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex w-full max-w-md flex-col gap-3 sm:flex-row",
        glass && "glass rounded-full p-1.5 sm:items-center",
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className={clsx(
          "w-full rounded-full bg-transparent px-4 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:outline-none",
          glass
            ? "sm:pl-5"
            : "border border-paper-faint/30 focus:border-paper/60",
        )}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="whitespace-nowrap rounded-full bg-pink px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : ctaLabel}
      </button>
      {status === "error" && (
        <p className="text-xs text-pink sm:hidden">
          Something went wrong — try again in a moment.
        </p>
      )}
    </form>
  );
}
