export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
};

export const AUTHORS: Record<string, Author> = {
  kamilla: {
    id: "kamilla",
    name: "Kamilla",
    role: "Founder",
    bio: "Explores the gap between who we are and how we perform online. Obsessed with the neuroscience of why that gap keeps widening.",
    avatar: "/authors/kamilla.jpg",
  },
  serena: {
    id: "serena",
    name: "Serena",
    role: "Writer",
    bio: "Identity, modern life, and the beautiful chaos of existing online, reporting from Italy to Korea.",
    avatar: "/authors/serena.jpeg",
  },
  andra: {
    id: "andra",
    name: "Andra",
    role: "Writer",
    bio: "Culture, behavior, and why people get obsessed with things, filtered through seven years of a marketing brain.",
    avatar: "/authors/andra.jpeg",
  },
};
