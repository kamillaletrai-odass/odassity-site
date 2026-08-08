export type Lens =
  | "all"
  | "outwards"
  | "inwards"
  | "autopsy"
  | "digicore"
  | "aesthetics";

export const LENSES: Record<
  Lens,
  {
    label: string;
    tagline: string;
    description: string;
  }
> = {
  all: {
    label: "All",
    tagline: "The full archive.",
    description: "Everything we've published, not yet sorted into a motif.",
  },
  outwards: {
    label: "Outwards",
    tagline: "Identity as a performative act.",
    description:
      "On conformity, belonging, and thinking for yourself before it's cool to.",
  },
  inwards: {
    label: "Inwards",
    tagline: "The self, alone with itself.",
    description:
      "Get to know who you are before the world hands you an answer.",
  },
  autopsy: {
    label: "Autopsy",
    tagline: "Trends, cut open.",
    description: "A live wrestling with ideologies, modern or ancient.",
  },
  digicore: {
    label: "Digicore",
    tagline: "AI, internet culture, the chronically online.",
    description: "Never anti-machine, always anti-autopilot.",
  },
  aesthetics: {
    label: "Aesthetics",
    tagline: "Beauty as the consequence of the thinking behind it.",
    description: "Rooted in neuroaesthetics.",
  },
};

export const LENS_ORDER: Lens[] = [
  "outwards",
  "inwards",
  "autopsy",
  "digicore",
  "aesthetics",
];
