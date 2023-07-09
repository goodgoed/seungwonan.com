import { allPosts } from "contentlayer/generated";

import CategoryNavbar from "@/components/category-navbar";
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
          count: 1,
          slug: post.categorySlug,
          name: post.category,
        };
      }
    }
  });

  return Object.values(categories);
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
