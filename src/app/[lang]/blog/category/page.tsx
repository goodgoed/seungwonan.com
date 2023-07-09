import { Post, allPosts } from "contentlayer/generated";

import type { Locale } from "@/i18n-config";
import PostCard from "@/components/post";

function getAllPostsByCategory(lang: Locale) {
  const posts: { [key: string]: any } = {};

  allPosts.forEach((post) => {
    if (post.locale === lang) {
      if (post.category in posts) {
        posts[post.category].push(post);
      } else {
        posts[post.category] = [post];
      }
    }
  });

  return posts;
}

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const postsByCategory = getAllPostsByCategory(lang);

  return (
    <div>
      {Object.entries(postsByCategory).map(([category, posts]) => {
        return (
          <>
            <h3 className="text-3xl font-bold mb-4 pb-1 border-b-2 border-gray-200">
              {category}
            </h3>
            <ul>
              {posts.map((post: Post) => {
                return <PostCard key={post._id} post={post} />;
              })}
            </ul>
          </>
        );
      })}
    </div>
  );
}
