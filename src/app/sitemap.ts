import { LOCALES } from "@/constant";
import { getAllPosts } from "@/lib/post";

export default async function sitemap() {
  const posts = (await getAllPosts()).map((post) => ({
    url: `https://seungwonan.com/${post.locale}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = LOCALES.map((locale) => {
    return ["", "blog", "project"].map((route) => ({
      url: `https://seungwonan.com/${locale}/${route}`,
      lastModified: new Date().toISOString(),
    }));
  });

  return [...routes.flat(), ...posts];
}
