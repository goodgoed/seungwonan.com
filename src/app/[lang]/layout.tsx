import '@/globals.css'
import Navbar from '@/app/[lang]/navbar'

import { getLocales } from '@/lib/get-locale'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }]
}

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const locales = await getLocales(lang)
  return {
    title: {
      default: locales["general"]["name"],
      template: '%s' + ' | ' + locales["general"]["name"]
    },
    description: locales["home"]["description"]
  }
}

export default async function Layout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const locales = await getLocales(lang)

  return (
    <>
      <Navbar lang={lang} locales={locales} />
      {children}
    </>
  )
}
