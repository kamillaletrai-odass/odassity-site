import Link from "next/link";
import Image from "next/image";
import type { ArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import { LENSES } from "@/lib/lenses";

export default function FeaturedStoryRow({ article }: { article: ArticleMeta }) {
  const author = AUTHORS[article.author];

  return (
    <Link
      href={`/stories/${article.slug}`}
      className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
    >
      {article.cover && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="80px"
            className="warm-grayscale object-cover"
          />
        </div>
      )}
      <div className="min-w-0">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-pink">
          {LENSES[article.lens].label}
        </span>
        <p className="mt-1 truncate font-display text-sm leading-snug text-paper">
          {article.title}
        </p>
        {author && (
          <p className="mt-1 text-xs text-paper-dim">
            {author.name} &middot;{" "}
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
