'use client'

import { Locale } from '@/i18n-config'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CategoryNavbar({
  categories,
  lang
}: {
  categories: any[]
  lang: Locale
}) {
  let pathname = usePathname().slice(3)
  let navItems = {}
  categories.forEach((category) => {
    Object.defineProperty(
      navItems,
      category.slug ? `/blog/category/${category.slug}` : '/blog/category',
      {
        value: {
          name: category.name,
          count: category.count
        },
        enumerable: true
      }
    )
  })

  return (
    <ul className="flex flex-col border-[1px] border-gray-200 rounded-md p-3 mb-6 mx-2">
      {Object.entries(
        navItems as { path: { name: string; count: Number } }
      ).map(([path, { name, count }]) => {
        const isActive = path === pathname

        return (
          <li
            key={path}
            className={clsx(
              'flex',
              isActive && 'text-primary',
              'hover:text-primary transition-all'
            )}
          >
            <Link href={`/${lang}/${path}`} className="mr-auto">
              {name}
            </Link>
            <span>{count.valueOf()}</span>
          </li>
        )
      })}
    </ul>
  )
}
