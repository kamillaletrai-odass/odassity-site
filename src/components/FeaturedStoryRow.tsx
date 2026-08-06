import Link from "next/link";
import Image from "next/image";
import type { ArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import LensTag from "./LensTag";

export default function FeaturedStoryRow({ article }: { article: ArticleMeta }) {
  const author = AUTHORS[article.author];

  return (
    <Link
      href={`/stories/${article.slug}`}
      className="glass group flex flex-1 items-center gap-4 rounded-xl p-3 transition-transform duration-300 hover:scale-[1.02]"
    >
      {article.cover && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="96px"
            className="warm-grayscale object-cover"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <LensTag lens={article.lens} size="sm" />
        <p className="mt-2 truncate font-display text-base leading-snug text-paper">
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
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        →
      </span>
    </Link>
  );
}
