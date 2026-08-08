"use client";

import { useState } from "react";
import Link from "next/link";
import type { Author } from "@/lib/authors";
import type { ArticleMeta } from "@/lib/articles";
import { LENSES } from "@/lib/lenses";
import AuthorAvatar from "./AuthorAvatar";

const COLLAPSED_COUNT = 3;

export default function AuthorCard({
  author,
  pieces,
}: {
  author: Author;
  pieces: ArticleMeta[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? pieces : pieces.slice(0, COLLAPSED_COUNT);

  return (
    <div className="glass rounded-3xl p-8 sm:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <AuthorAvatar author={author} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-2xl text-paper">{author.name}</p>
          <p className="text-xs uppercase tracking-[0.14em] text-pink">
            {author.role}
          </p>
          <p className="mt-3 max-w-lg text-paper-dim">{author.bio}</p>
        </div>
      </div>

      {pieces.length > 0 && (
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.16em] text-paper-dim">
            Published stories
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {visible.map((piece) => (
              <li key={piece.slug}>
                <Link
                  href={`/stories/${piece.slug}`}
                  className="group flex w-fit max-w-full items-center gap-3 rounded-xl bg-paper/5 px-4 py-3 transition-colors hover:bg-paper/10"
                >
                  {piece.lens !== "all" && (
                    <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-pink">
                      {LENSES[piece.lens].label}
                    </span>
                  )}
                  <span className="font-display text-paper group-hover:underline">
                    {piece.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {pieces.length > COLLAPSED_COUNT && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-4 text-sm font-medium text-paper-dim transition-colors hover:text-paper"
            >
              {expanded ? "Show less" : `Show all ${pieces.length} stories`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
