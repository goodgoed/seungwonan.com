import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const CustomImage = (props: any) => {
  const caption = props?.caption
  return (
    <div className="flex flex-col justify-center items-center gap-2 my-8">
      <Image alt={props.alt} className="rounded-md my-0" {...props} />
      {caption && <small className="text-gray-500">{caption}</small>}
    </div>
  )
}

const SideNote = (props: any) => {
  return (
    <div className="flex items-center gap-4 px-4 py-4 rounded-md border-[1px] border-primary text-sm">
      <span>🔈</span>
      {props.children}
    </div>
  )
}

const components = {
  a: CustomLink,
  Image: CustomImage,
  SideNote
}

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code)

  return (
    <article className="prose">
      <Component components={{ ...components }} />
    </article>
  )
}
