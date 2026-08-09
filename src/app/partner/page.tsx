"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function PartnerPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      type: "partnership",
      company: form.get("company"),
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
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
      <div className="px-6 pt-40 pb-24 text-center sm:px-10">
        <h1 className="font-display text-display text-paper">Got it.</h1>
        <p className="mx-auto mt-4 max-w-xl text-paper-dim">
          Thanks for reaching out. We read every inquiry and will get back
          to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 pt-32 pb-16 sm:px-10">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-display text-paper">
          Partner with us
        </h1>
        <p className="mt-3 text-paper-dim">
          Brands and organizations who want to work with Odassity, tell us
          about it below.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <Field label="Company / brand" name="company" required />
          <Field label="Your name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Message" name="message" textarea required />

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Submit"}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
              →
            </span>
          </button>

          {status === "error" && (
            <p className="text-sm text-pink">
              Something went wrong sending that. Email kamilla@odassity.com
              directly instead.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const shared =
    "glass w-full rounded-xl px-4 py-3 text-paper placeholder:text-paper-faint focus:border-pink/60 focus:outline-none";

  return (
    <label className="flex flex-col gap-2 text-sm text-paper-dim">
      <span>{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={shared} />
      ) : (
        <input name={name} type={type} required={required} className={shared} />
      )}
    </label>
  );
}
