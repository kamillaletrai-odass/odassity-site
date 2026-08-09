import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const ARTICLE_SLUGS = fs
  .readdirSync(path.join(process.cwd(), "content/articles"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Every current article used to live at the site root under Framer
      // (e.g. /ai-vs-human-nuance) and now lives under /stories/.
      ...ARTICLE_SLUGS.map((slug) => ({
        source: `/${slug}`,
        destination: `/stories/${slug}`,
        permanent: true,
      })),

      // Renamed or retired Framer routes with no direct new-site
      // equivalent get sent to the closest sensible landing spot instead
      // of 404ing.
      { source: "/become-a-writer", destination: "/write", permanent: true },
      { source: "/writers/:path*", destination: "/stories", permanent: true },
      { source: "/old-pages/:path*", destination: "/stories", permanent: true },
      { source: "/old-pages", destination: "/stories", permanent: true },
      {
        source: "/maybe-we-re-asking-the-wrong-questions-about-celebrity-activism",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/5-habits-that-will-make-you-disgustingly-intelligent",
        destination: "/stories",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
