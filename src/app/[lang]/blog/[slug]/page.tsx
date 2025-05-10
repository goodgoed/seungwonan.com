import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { formatDate } from '@/lib/date'
import Mdx from '@/components/mdx'
import { Locale } from '@/i18n-config'
import { getLocales } from '@/lib/get-locale'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export async function generateStaticParams() {
  const slugs = allPosts
    .filter((post) => post.locale === 'en')
    .map((post) => ({ slug: post.slug }))

  return slugs
}

export async function generateMetadata({
  params: { lang, slug }
}: {
  params: { lang: Locale; slug: string }
}): Promise<Metadata | undefined> {
  const post = allPosts.find(
    (post) => post.locale === lang && post.slug === slug
  )

  if (!post) return
  const { title, summary, date, tags } = post

  return {
    title,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      tags,
      publishedTime: date,
      url: `https://seungwonan.com/${lang}/blog/${slug}`,
      images: [
        {
          url: `https://seungwonan.com/og?title=${title}`
        }
      ]
    }
  }
}

function dateFromToday(date: string, lang: Locale) {
  const d = new Date(date)

  return formatDistanceToNow(d, {
    addSuffix: true,
    locale: lang === 'ko' ? ko : undefined
  })
}

function getPostBySlug(lang: Locale, slug: string) {
  const post = allPosts.find(
    (post) => post.locale === lang && post.slug === slug
  )

  if (!post) notFound()

  return post
}

export default async function Page({
  params: { lang, slug }
}: {
  params: { lang: Locale; slug: string }
}) {
  const post = getPostBySlug(lang, slug)
  const locales = await getLocales(lang)

  return (
    <section className="my-16">
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(post.structuredData)}
      </script>
      <div className="mb-8 flex flex-col gap-2 justify-center items-center">
        <div className="mb-2">
          <span className="py-1 px-2 border-2 border-black font-semibold">
            {post.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-center break-keep">
          {post.title}
        </h1>
        <div className="flex text-sm font-light">
          <time>
            {formatDate(post.date, lang)} | {dateFromToday(post.date, lang)}
          </time>
        </div>
      </div>
      <Mdx code={post.body.code} />
      <div className="mt-8">
        <Link href={`/${lang}/blog`} className="text-primary">
          <span className="pb-4">&#8592;</span> {locales['blog'].back}
        </Link>
      </div>
    </section>
  )
}
