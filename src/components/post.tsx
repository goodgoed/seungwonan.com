import Link from "next/link";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import { Post } from "contentlayer/generated";

export default function Post({ post }: { post: Post }) {
  const { locale: lang, slug, title, date, tags } = post;

  return (
    <li>
      <Link href={`/${lang}/blog/${slug}`} className="flex items-center">
        <div className="mr-auto">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <ul className="flex gap-2">
            {tags &&
              tags.map((tag) => {
                return (
                  <li
                    key={tag}
                    className="border-[1px] rounded-md text-gray-500 border-gray-500 py-1 px-2 text-sm"
                  >
                    {tag}
                  </li>
                );
              })}
          </ul>
        </div>
        <time className="text-gray-500 text-sm">
          {format(parseISO(date), "MMM d, yyyy")}
        </time>
      </Link>
    </li>
  );
}
