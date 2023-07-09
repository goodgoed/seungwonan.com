import { allPosts, Post } from "contentlayer/generated";
import { Metadata } from "next";

import { Locale } from "@/i18n-config";
import PostCard from "@/components/post";
import { compareDesc } from "date-fns";

export const metadata: Metadata = {
  title: "Blog",
  description: "I write stuff.",
};

function getAllPosts(lang: String) {
  const posts = allPosts
    .filter((post) => post.locale === lang)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return posts;
}

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const posts: Post[] = getAllPosts(lang);

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
    </ul>
  );
}
