import { Post, allPosts } from 'contentlayer/generated'

import type { Locale } from '@/i18n-config'
import PostCard from '@/components/post'
import { compareDesc } from 'date-fns'

function getAllPostsByCategory(lang: Locale) {
  let posts: { [key: string]: any } = {}

  allPosts.forEach((post) => {
    if (post.locale === lang) {
      if (post.category in posts) {
        posts[post.category].push(post)
      } else {
        posts[post.category] = [post]
      }
    }
  })

  posts = Object.keys(posts)
    .sort()
    .reduce((obj, key) => {
      obj[key as keyof Object] = posts[key].sort((a: Post, b: Post) =>
        compareDesc(new Date(a.date), new Date(b.date))
      )
      return obj
    }, {})

  return posts
}

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const postsByCategory = getAllPostsByCategory(lang)

  return (
    <>
      {Object.entries(postsByCategory).map(([category, posts]) => {
        return (
          <div className="mb-6 px-2" key={category}>
            <h3 className="text-xl font-semibold lg:text-2xl pb-1 mb-2 border-b-[1px] border-gray-300">
              {category}
            </h3>
            <ul className="flex flex-col gap-6">
              {posts.map((post: Post) => {
                return <PostCard key={post._id} post={post} />
              })}
            </ul>
          </div>
        )
      })}
    </>
  )
}
