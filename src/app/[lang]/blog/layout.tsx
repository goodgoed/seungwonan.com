import type { Locale } from '@/i18n-config'
import Navbar from './navbar'
import { Metadata } from 'next'
import { getLocales } from '@/lib/get-locale'

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const locales = await getLocales(lang)
  return {
    title: locales['blog']['title'],
    description: locales['blog']['description'],
    openGraph: {
      description: locales['blog']['description'],
      locale: lang
    }
  }
}

export default function Layout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <>
      <Navbar lang={lang} />
      {children}
    </>
  )
}
