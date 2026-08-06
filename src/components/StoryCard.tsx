import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { ArticleMeta } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import LensTag from "./LensTag";
import AuthorAvatar from "./AuthorAvatar";

export default function StoryCard({
  article,
  size = "md",
}: {
  article: ArticleMeta;
  size?: "lg" | "md" | "sm";
}) {
  const author = AUTHORS[article.author];

  return (
    <Link
      href={`/stories/${article.slug}`}
      className={clsx(
        "glass group relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1",
        size === "lg" && "min-h-[28rem] p-8 sm:p-10",
        size === "md" && "min-h-[22rem]",
        size === "sm" && "min-h-[16rem]",
      )}
    >
      {article.cover && (
        <Image
          src={article.cover}
          alt=""
          fill
          sizes={size === "lg" ? "100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={size === "lg"}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />

      <div className="relative mb-4">
        <LensTag lens={article.lens} size={size === "lg" ? "md" : "sm"} />
      </div>
      <h3
        className={clsx(
          "relative font-display leading-tight text-paper transition-colors group-hover:text-paper/90",
          size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
        )}
      >
        {article.title}
      </h3>
      <p
        className={clsx(
          "relative mt-3 text-paper-dim",
          size === "lg" ? "max-w-lg text-base" : "text-sm",
        )}
      >
        {article.dek}
      </p>
      {author && (
        <div className="relative mt-5 flex items-center gap-2">
          <AuthorAvatar author={author} size="sm" />
          <span className="text-xs text-paper-dim">{author.name}</span>
        </div>
      )}
    </Link>
  );
}
