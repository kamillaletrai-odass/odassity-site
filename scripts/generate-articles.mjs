import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");
const OUT_FILE = path.join(process.cwd(), "src/lib/articles-data.json");

async function main() {
  const slugs = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.md`), "utf8");
      const { data, content } = matter(raw);
      const processed = await remark().use(remarkHtml).process(content);
      return { slug, ...data, html: processed.toString() };
    }),
  );

  fs.writeFileSync(OUT_FILE, JSON.stringify(articles, null, 2));
  console.log(`Wrote ${articles.length} articles to ${path.relative(process.cwd(), OUT_FILE)}`);
}

main();
