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
      className="group flex flex-1 items-center gap-5 rounded-xl p-2 transition-colors hover:bg-white/5"
    >
      {article.cover && (
        <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-36">
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="144px"
            className="warm-grayscale object-cover"
          />
        </div>
      )}
      <div className="min-w-0">
        <LensTag lens={article.lens} size="sm" />
        <p className="mt-2 font-display text-lg leading-snug text-paper sm:text-xl">
          {article.title}
        </p>
        {author && (
          <p className="mt-2 text-sm text-paper-dim">
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
