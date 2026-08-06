import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import { LENSES } from "@/lib/lenses";
import AuthorAvatar from "@/components/AuthorAvatar";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  const authors = Object.values(AUTHORS);
  const articles = getAllArticleMeta();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pink">
        The community
      </span>
      <h1 className="mt-3 font-display text-hero leading-[0.98] text-paper">
        A coven of thinkerbells.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-paper-dim">
        Thinkers who are also a little magical, a little mischievous — not
        taking themselves too seriously, while taking the ideas completely
        seriously. This isn&rsquo;t one person&rsquo;s blog. It&rsquo;s a
        collective.
      </p>
      <Link
        href="/write"
        className="mt-8 inline-block rounded-full bg-pink px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Join the community
      </Link>

      <div className="mt-16 flex flex-col gap-10">
        {authors.map((author) => {
          const pieces = articles.filter((a) => a.author === author.id);
          return (
            <div key={author.id} className="glass rounded-3xl p-8 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <AuthorAvatar author={author} size="lg" />
                <div>
                  <p className="font-display text-2xl text-paper">
                    {author.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-pink">
                    {author.role}
                  </p>
                  <p className="mt-3 max-w-lg text-paper-dim">{author.bio}</p>
                </div>
              </div>

              {pieces.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.16em] text-paper-dim">
                    Published pieces
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {pieces.map((piece) => (
                      <li key={piece.slug}>
                        <Link
                          href={`/stories/${piece.slug}`}
                          className="group flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
                        >
                          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-pink">
                            {LENSES[piece.lens].label}
                          </span>
                          <span className="font-display text-paper group-hover:underline">
                            {piece.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        <Link
          href="/write"
          className="flex flex-col items-start gap-2 rounded-3xl border border-dashed border-paper-faint/20 p-8 transition-colors hover:border-pink/60 sm:p-10"
        >
          <p className="font-display text-2xl text-paper">
            Want to be part of the coven?
          </p>
          <p className="max-w-lg text-paper-dim">
            We&rsquo;re always reading writer submissions — bring your
            thoughts on identity, perception, and being a person online.
          </p>
          <span className="mt-2 text-sm text-pink">
            Become a writer →
          </span>
        </Link>
      </div>
    </div>
  );
}
