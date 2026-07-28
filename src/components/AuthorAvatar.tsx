import Image from "next/image";
import clsx from "clsx";
import type { Author } from "@/lib/authors";

const SIZES = { sm: 32, md: 44, lg: 96 };

export default function AuthorAvatar({
  author,
  size = "sm",
}: {
  author: Author;
  size?: "sm" | "md" | "lg";
}) {
  const px = SIZES[size];

  if (author.avatar) {
    return (
      <Image
        src={author.avatar}
        alt={author.name}
        width={px}
        height={px}
        className="rounded-full object-cover"
        style={{ width: px, height: px }}
      />
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-pink to-yellow font-display font-bold text-ink",
        size === "lg" ? "text-3xl" : "text-sm",
      )}
      style={{ width: px, height: px }}
    >
      {author.name.charAt(0)}
    </div>
  );
}
