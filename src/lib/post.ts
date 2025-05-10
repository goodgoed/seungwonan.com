import path from "path";
import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";

import { Locale } from "@/locales/dictionaries";

export type Post = {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  summary: string;
  locale: Locale;
};

const contentDir = path.join(process.cwd(), "src", "content");

export async function getAllPosts(): Promise<Post[]> {
  const noteDirs = await readdir(contentDir);

  const posts: Post[] = [];

  for (const noteDir of noteDirs) {
    const dirPath = path.join(contentDir, noteDir);
    const files = await readdir(dirPath);
    const entries = files.filter((f) => f.endsWith(".mdx"));

    for (const entry of entries) {
      const filePath = path.join(dirPath, entry);
      const _content = await readFile(filePath, "utf-8");
      const { data } = matter(_content);

      posts.push({
        ...data,
      } as Post);
    }
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
