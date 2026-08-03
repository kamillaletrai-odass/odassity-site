import { LENSES, type Lens } from "@/lib/lenses";
import clsx from "clsx";

export default function LensTag({
  lens,
  size = "sm",
}: {
  lens: Lens;
  size?: "sm" | "md";
}) {
  const meta = LENSES[lens];
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-yellow font-semibold uppercase tracking-[0.18em] text-ink",
        size === "sm" ? "px-2.5 py-1 text-[0.65rem]" : "px-3 py-1.5 text-xs",
      )}
    >
      {meta.label}
    </span>
  );
}
