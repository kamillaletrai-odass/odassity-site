"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function WritePage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      type: "writer",
      name: form.get("name"),
      email: form.get("email"),
      why: form.get("why"),
      experience: form.get("experience"),
      substack: form.get("substack"),
      linkedin: form.get("linkedin"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-display text-ink">
          Got it.
        </h1>
        <p className="mt-4 text-ink-dim">
          Thanks for reaching out — we read every submission and will get
          back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-display text-ink">
        Become a writer
      </h1>
      <p className="mt-3 text-ink-dim">
        Join the coven of thinkerbells. Fill out this form to write for
        Odassity.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field
          label="Why do you want to write for Odassity?"
          name="why"
          textarea
          required
        />
        <Field
          label="Previous writing experience"
          name="experience"
          textarea
          optional
        />
        <Field label="Substack" name="substack" optional />
        <Field label="LinkedIn" name="linkedin" optional />

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 w-fit rounded-full bg-pink px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit"}
        </button>

        {status === "error" && (
          <p className="text-sm text-pink">
            Something went wrong sending that — email kamilla@odassity.com
            directly instead.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
  optional = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  optional?: boolean;
}) {
  const shared =
    "w-full rounded-xl border border-ink-faint bg-white/60 px-4 py-3 text-ink placeholder:text-ink-dim focus:border-pink/60 focus:outline-none";

  return (
    <label className="flex flex-col gap-2 text-sm text-ink-dim">
      <span>
        {label}
        {optional && <span className="text-ink-dim"> (optional)</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={shared} />
      ) : (
        <input name={name} type={type} required={required} className={shared} />
      )}
    </label>
  );
}
