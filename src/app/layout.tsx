import '@/globals.css'

import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import clsx from 'clsx'
import default_metadata from '@/locales/en/common.json'

export const metadata: Metadata = {
  metadataBase: new URL('https://seungwonan.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': 'en',
      'ko-KR': 'ko'
    }
  },
  description: default_metadata['home']['description'],
  openGraph: {
    title: default_metadata['general']['name'],
    description:  default_metadata['home']['description'],
    url: 'https://seungwonan.com',
    siteName: default_metadata['general']['name'],
    locale: 'en-US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

const raleway = Raleway({
  subsets: ['latin']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body
        className={clsx(
          'w-11/12 mb-40 flex flex-col mx-auto mt-4',
          'md:mt-8',
          'lg:w-1/2',
          raleway.className
        )}
      >
        <main
          className={clsx(
            'antialiased relative flex-auto min-w-0 flex flex-col',
            'md:px-0 md:py-8'
          )}
        >
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
