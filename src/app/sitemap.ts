import { allPosts } from "contentlayer/generated";
import { i18n } from "../i18n-config";

export default async function sitemap() {
  const posts = allPosts.map((post) => ({
    url: `https://seungwonan.com/${post.locale}/blog/${post.slug}`,
    lastModified: post.date,
  }));
  const categories = allPosts.map((post) => ({
    url: `https://seungwonan.com/${post.locale}/blog/category/${post.categorySlug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const locales = i18n.locales;

  const routes = locales.map((locale) => {
    return ["", "blog", "blog/category", "project"].map((route) => ({
      url: `https://seungwonan.com/${locale}/${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }));
  });

  return [...routes.flat(), ...categories, ...posts];
}
