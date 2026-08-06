import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { ArticleMeta } from "@/lib/articles";
import LensTag from "./LensTag";

export default function StoryCard({
  article,
  size = "md",
}: {
  article: ArticleMeta;
  size?: "lg" | "md" | "sm";
}) {
  return (
    <Link
      href={`/stories/${article.slug}`}
      className={clsx(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02]",
        size === "lg" && "min-h-[28rem]",
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
          className="warm-grayscale object-cover"
          priority={size === "lg"}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

      <div
        className={clsx(
          "glass relative m-4 rounded-xl sm:m-5",
          size === "lg" ? "p-6 sm:p-7" : "p-4 sm:p-5",
        )}
      >
        <LensTag lens={article.lens} size={size === "lg" ? "md" : "sm"} />
        <h3
          className={clsx(
            "mt-3 font-display leading-tight text-paper transition-colors group-hover:text-paper/90",
            size === "lg" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          {article.title}
        </h3>
        {size === "lg" && (
          <p className="mt-3 max-w-lg text-base text-paper-dim">
            {article.dek}
          </p>
        )}
        <p className="mt-3 text-xs text-paper-dim">
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
