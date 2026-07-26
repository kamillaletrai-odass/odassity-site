import Link from "next/link";
import clsx from "clsx";
import type { ArticleMeta } from "@/lib/articles";
import LensTag from "./LensTag";

const GRADIENTS: Record<string, string> = {
  mirror: "from-mirror/25 via-ink to-ink",
  raw: "from-raw/25 via-ink to-ink",
  autopsy: "from-autopsy/25 via-ink to-ink",
};

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
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-paper-faint/10 bg-gradient-to-br p-6 transition-transform duration-300 hover:-translate-y-1",
        GRADIENTS[article.lens],
        size === "lg" && "min-h-[26rem] p-8 sm:p-10",
        size === "md" && "min-h-[19rem]",
        size === "sm" && "min-h-[14rem]",
      )}
    >
      <div className="mb-4">
        <LensTag lens={article.lens} size={size === "lg" ? "md" : "sm"} />
      </div>
      <h3
        className={clsx(
          "font-display leading-tight text-paper transition-colors group-hover:text-paper/90",
          size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
        )}
      >
        {article.title}
      </h3>
      <p
        className={clsx(
          "mt-3 text-paper-dim",
          size === "lg" ? "max-w-lg text-base" : "text-sm",
        )}
      >
        {article.dek}
      </p>
    </Link>
  );
}
