import Post from "@/components/post";
import { Locale } from "@/i18n-config";

import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = allPosts
    .filter((post) => post.locale === "en")
    .map((post) => ({ slug: post.categorySlug }));

  return slugs;
}

function getPostByCategory(slug: string, lang: Locale) {
  const posts = allPosts
    .filter((post) => post.locale === lang && post.categorySlug === slug)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  if (posts.length === 0) {
    notFound();
  }

  return posts;
}

export default async function Page({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale };
}) {
  const posts = getPostByCategory(slug, lang);

  return (
    <>
      <ul className="flex flex-col gap-6 px-2">
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </ul>
    </>
  );
}
