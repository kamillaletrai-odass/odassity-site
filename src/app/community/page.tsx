import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import AuthorCard from "@/components/AuthorCard";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  const authors = Object.values(AUTHORS);
  const articles = getAllArticleMeta();

  return (
    <div className="px-6 pt-32 pb-16 sm:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h1 className="font-display text-display text-paper">
          Thinkerbells
        </h1>
        <p className="mt-4 max-w-xl text-lg text-pink">
          The people who make Odassity a whole.
        </p>
        <div className="mt-6 flex flex-col gap-4 text-paper-dim">
          <p>
            We write, we debate, we create, out loud and unpolished, mostly
            online, and sometimes in Amsterdam over prosecco gone slightly
            too flat.
          </p>
          <p>
            What we&rsquo;re creating here is a corner of the internet
            where you hear your own thoughts clearly, where you get a
            little more intentional, a little more curious, a little more
            yourself, one story at a time.
          </p>
          <p>
            Bring your own whimsy. Odassity gets a little bigger, and a
            little better, every time someone does.
          </p>
        </div>
        <Link
          href="/write"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          Join the community
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper">
            →
          </span>
        </Link>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-10">
        {authors.map((author) => {
          const pieces = articles.filter((a) => a.author === author.id);
          return (
            <AuthorCard key={author.id} author={author} pieces={pieces} />
          );
        })}
      </div>
    </div>
  );
}
