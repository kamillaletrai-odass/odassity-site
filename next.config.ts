import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

function slugsFrom(dir: string) {
  return fs
    .readdirSync(path.join(process.cwd(), dir))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

const ARTICLE_SLUGS = slugsFrom("content/articles");
const ARCHIVED_SLUGS = slugsFrom("content/archived-articles");

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

      // Archived articles' old Framer root URLs still get a redirect
      // (to the stories index, since the article itself no longer
      // exists) instead of 404ing outright.
      ...ARCHIVED_SLUGS.map((slug) => ({
        source: `/${slug}`,
        destination: "/stories",
        permanent: true,
      })),

      // Renamed or retired Framer routes with no direct new-site
      // equivalent get sent to the closest sensible landing spot instead
      // of 404ing.
      { source: "/become-a-writer", destination: "/write", permanent: true },
      { source: "/writers/:path*", destination: "/stories", permanent: true },
      { source: "/old-pages/:path*", destination: "/stories", permanent: true },
      { source: "/old-pages", destination: "/stories", permanent: true },
    ];
  },
};

export default nextConfig;
