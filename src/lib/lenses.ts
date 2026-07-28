export type Lens = "mirror" | "raw" | "autopsy";

export const LENSES: Record<
  Lens,
  {
    label: string;
    tagline: string;
    description: string;
  }
> = {
  mirror: {
    label: "Mirror",
    tagline: "Seeing yourself through other people's eyes.",
    description:
      "Hidden blind spots, sharp reflections, and practical nudges toward showing up with more confidence in the image you project.",
  },
  raw: {
    label: "Raw",
    tagline: "Unfiltered thoughts from someone figuring it out.",
    description:
      "Essays, rants, and reflections from learning the ropes of being seen online — personal, messy, honest.",
  },
  autopsy: {
    label: "Autopsy",
    tagline: "Dissecting the art of influence.",
    description:
      "Breakdowns of brands, posts, and trends — a CSI for communication, decoding what works, what flops, and why.",
  },
};

export const LENS_ORDER: Lens[] = ["mirror", "raw", "autopsy"];
