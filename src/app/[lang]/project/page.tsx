import { getLocales } from '@/lib/get-locale'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'

export async function generateMetadata({
  params: { lang }
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const locales = await getLocales(lang)
  return {
    title: locales["project"]["title"],
    description: locales['project']["description"],
    openGraph: {
      description: locales['project']["description"]
    }
  }
}

export default async function Project({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const locales = await getLocales(lang)

  return (
    <section className="flex flex-auto justify-center items-center">
      <h1 className="text-center text-2xl font-bold">
        {locales['project']["title"]}
      </h1>
    </section>
  )
}
