import { allPosts, Post } from 'contentlayer/generated'

import { Locale } from '@/i18n-config'
import PostCard from '@/components/post'
import { compareDesc } from 'date-fns'

function getAllPosts(lang: String) {
  const posts = allPosts
    .filter((post) => post.locale === lang)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return posts
}

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const posts: Post[] = getAllPosts(lang)

  return (
    <ul className="flex flex-col gap-6 px-2">
      {posts.map((post) => {
        return <PostCard key={post._id} post={post} />
      })}
    </ul>
  )
}
