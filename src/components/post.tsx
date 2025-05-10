import Link from 'next/link'
import { Post } from 'contentlayer/generated'

import { formatDate } from '@/lib/date'
import type { Locale } from '@/i18n-config'
import clsx from 'clsx'

export default async function Post({ post }: { post: Post }) {
  const { locale: lang, slug, title, date, tags, category } = post

  return (
    <li className="relative">
      <Link href={`/${lang}/blog/${slug}`}>
        <div className="justify-between items-center mb-2">
          <h3 className={clsx('text-md pr-4 break-keep')}>{title}</h3>
        </div>
        <div className="flex items-center">
          <time
            className={clsx(
              'text-gray-500 text-xs text-end break-keep mr-auto',
              'lg:text-sm'
            )}
          >
            {formatDate(date, lang as Locale)}
          </time>
          <ul className="flex gap-2">
            {tags &&
              tags.map((tag) => {
                return (
                  <li key={tag} className="text-gray-500 text-xs">
                    #{tag}
                  </li>
                )
              })}
          </ul>
        </div>
      </Link>
    </li>
  )
}
