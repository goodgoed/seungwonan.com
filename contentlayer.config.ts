import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    locale: { type: "string", required: true },
    category: { type: "string", required: true, default: "Uncategorized" },
    categorySlug: { type: "string", require: true, default: "uncategorized" },
    tags: { type: "list", of: { type: "string" }, required: true },
    summary: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.slice(0, -3),
    },
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.date,
        description: doc.summary,
        image: `https://seungwonan.com/og?title=${doc.title}`,
        url: `https://seungwonan.com/${doc.locale}blog/${doc.slug}`,
        author: {
          "@type": "Person",
          name: "Seungwon An (Harry)",
        },
      }),
    },
  },
}));

const rehypePrettyCodeOptions = {
  theme: "nord",
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});
