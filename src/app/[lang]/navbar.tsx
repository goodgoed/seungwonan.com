'use client'

import Toggler from '@/components/language-toggler'
import { Locale } from '@/i18n-config'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar({
  lang,
  locales
}: {
  lang: Locale
  locales: any
}) {
  let pathname = usePathname().slice(3) || '/'
  const navItems = {
    '/': {
      name: 'home'
    },
    '/blog': {
      name: 'blog'
    },
    '/project': {
      name: 'project'
    }
  }

  if (pathname.includes('/blog')) {
    pathname = '/blog'
  }

  return (
    <nav
      className={clsx(
        'flex items-center sticky top-0 bg-white w-full py-4 text-sm',
        'md:text-base md:gap-2'
      )}
    >
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <Link
            key={path}
            href={`/${lang}/${path}`}
            className={clsx(
              'p-2',
              path === '/' && 'mr-auto',
              'hover:bg-gray-100 hover:rounded-md transition-all'
            )}
          >
            {locales['nav'][name]}
          </Link>
        )
      })}
      <Toggler />
    </nav>
  )
}
