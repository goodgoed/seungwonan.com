import { allPosts } from "contentlayer/generated";

import CategoryNavbar from "@/app/[lang]/blog/category/navbar";
import { Locale } from "@/i18n-config";

function getAllCategories(lang: Locale) {
  const categories: { [key: string]: any } = {};
  categories.all = { name: "All", slug: "", count: 0 };

  allPosts.forEach((post) => {
    if (post.locale === lang) {
      categories["all"].count += 1;
      if (post.category in categories) {
        categories[post.category].count += 1;
      } else {
        categories[post.category] = {
          name: post.category,
          slug: post.categorySlug,
          count: 1,
        };
      }
    }
  });

  return Object.values(categories).sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA === "ALL") return 1;
    if (nameB === "ALL") return 1;

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const categories = getAllCategories(lang);

  return (
    <>
      <CategoryNavbar categories={categories} lang={lang} />
      {children}
    </>
  );
}
