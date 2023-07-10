import Link from "next/link";
import { Post } from "contentlayer/generated";

import { formatDate } from "@/lib/date";
import type { Locale } from "@/i18n-config";

export default function Post({ post }: { post: Post }) {
  const { locale: lang, slug, title, date, tags } = post;

  return (
    <li className="relative p-4 hover:shadow-lg transition-all border-[1px] border-gray-200 rounded-md">
      <Link href={`/${lang}/blog/${slug}`} className="hover: ">
        <div className="flex flex-initial justify-between items-center mb-2">
          <h3 className="text-lg font-bold lg:text-xl pr-4 break-keep">
            {title}
          </h3>
          <time className="text-gray-500 text-sm text-end break-keep">
            {formatDate(date, lang as Locale)}
          </time>
        </div>
        <ul className="flex gap-2">
          {tags &&
            tags.map((tag) => {
              return (
                <li
                  key={tag}
                  className="border-[1px] rounded-md text-gray-500 border-gray-200 py-1 px-2 text-xs"
                >
                  {tag}
                </li>
              );
            })}
        </ul>
      </Link>
    </li>
  );
}
