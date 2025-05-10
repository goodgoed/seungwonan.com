import Image from 'next/image'

import { getLocales } from '@/lib/get-locale'
import { Locale } from '@/i18n-config'
import profile from '/public/profile.png'
import Link from 'next/link'
import RSS from 'rss'
import path from 'path'
import fs from 'fs'
import { allPosts } from 'contentlayer/generated'

function RSSIcon() {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 44 44"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>RSS-color</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Color-"
          transform="translate(-800.000000, -760.000000)"
          fill="#FF9A00"
        >
          <path
            d="M800.000471,797.714286 C800.000471,794.243 802.81487,791.428571 806.286118,791.428571 C809.757367,791.428571 812.571765,794.243 812.571765,797.714286 C812.571765,801.185571 809.757367,804 806.286118,804 C802.81487,804 800.000471,801.185571 800.000471,797.714286 Z M844,804 L835.619661,804 C835.619661,784.358714 819.641547,768.380429 800.000471,768.380429 L800.000471,760 C824.261497,760 844,779.738714 844,804 Z M829.333543,804 L820.953204,804 C820.953204,792.446857 811.553019,783.048143 800,783.048143 L800,774.666143 C816.174541,774.666143 829.333543,787.825286 829.333543,804 Z"
            id="RSS"
          ></path>
        </g>
      </g>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="35px"
      height="35px"
    >
      {' '}
      <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z" />
    </svg>
  )
}

async function generateRss(lang: Locale) {
  let options = {
    title: 'Seungwon An (Harry)',
    description: '',
    feed_url: `https://seungwonan.com/rss_${lang}.xml`,
    site_url: `https://seungwonan.com/${lang}`,
    language: lang,
    pubDate: new Date()
  }
  switch (lang) {
    case 'en':
      options.description =
        'A computer science student who pursues high standards in software'
      break
    case 'ko':
      options.description =
        '소프트웨어의 높은 기준을 추구하는 컴퓨터 공학생입니다'
      break
  }
  const feed = new RSS(options)

  allPosts.forEach((post) => {
    if (post.locale === lang) {
      feed.item({
        title: post.title,
        description: post.summary,
        url: `https://seungwonan.com/${post.locale}/blog/${post.slug}`,
        date: post.date,
        author: 'Seungwon An (Harry)',
        categories: [post.category]
      })
    }
  })

  const fullFilePath = path.join(process.cwd(), 'public', `rss_${lang}.xml`)

  if (fs.existsSync(fullFilePath)) {
    await fs.promises.unlink(fullFilePath)
  }

  fs.writeFile(fullFilePath, feed.xml({ indent: true }), (err) => {
    if (err) {
      console.error('Error: ', err)
    }

    console.log('RSS feed successfully generated!')
  })
}

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  await generateRss(lang)
  const locales = await getLocales(lang)

  return (
    <section className="my-16 flex flex-auto flex-col justify-center items-center">
      <Image
        src={profile}
        alt="Profile Image"
        width={300}
        height={300}
        className="mb-20"
      />
      <h1 className="uppercase text-center font-bold text-3xl pb-8">
        {locales['home'].hi}
      </h1>
      <p className="text-center pb-4">{locales['home'].description}</p>
      <div className="flex gap-4 items-center">
        <a
          href="https://github.com/goodgoed"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
        <Link href={`/rss_${lang}.xml`}>
          <RSSIcon />
        </Link>
      </div>
    </section>
  )
}
