export type Lens = "mirror" | "wardrobe" | "autopsy" | "fitting-room";

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
  wardrobe: {
    label: "Wardrobe",
    tagline: "The identities we try on and take off.",
    description:
      "Personal style, self-presentation, and the quiet decisions behind how we choose to be seen — one outfit, one persona at a time.",
  },
  autopsy: {
    label: "Autopsy",
    tagline: "Dissecting the art of influence.",
    description:
      "Breakdowns of brands, posts, and trends — a CSI for communication, decoding what works, what flops, and why.",
  },
  "fitting-room": {
    label: "Fitting Room",
    tagline: "Unfiltered thoughts from someone figuring it out.",
    description:
      "Essays, rants, and reflections from learning the ropes of being seen online — personal, messy, honest, still being tried on for size.",
  },
};

export const LENS_ORDER: Lens[] = ["mirror", "wardrobe", "autopsy", "fitting-room"];
