import Mdx from "@/components/mdx";
import { Locale } from "@/i18n-config";
import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}): Promise<Metadata | undefined> {
  const post = allPosts.find(
    (post) => post.locale === lang && post.slug === slug
  );

  if (!post) return;
  const { title, summary, date, tags } = post;

  return {
    title,
    openGraph: {
      title,
      description: summary,
      type: "article",
      tags,
      publishedTime: date,
      url: `https://seungwonan.com/${lang}/blog/${slug}`,
      images: [
        {
          url: `https://seungwonan.com/og?title=${title}`,
        },
      ],
    },
  };
}

function getPostBySlug(lang: Locale, slug: string) {
  const post = allPosts.find(
    (post) => post.locale === lang && post.slug === slug
  );

  if (!post) notFound();

  return post;
}

export default function Page({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const post = getPostBySlug(lang, slug);

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
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time className=" text-sm font-light">
          {format(parseISO(post.date), "MMM d, yyyy")}
        </time>
      </div>
      <Mdx code={post.body.code} />
      <div className="mt-8">
        <Link href={`/${lang}/blog`} className="text-primary">
          &#8592; Back to blog
        </Link>
      </div>
    </section>
  );
}
