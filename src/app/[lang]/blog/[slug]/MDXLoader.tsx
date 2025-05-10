"use client";

import { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "@/mdx-component";

export default function MDXLoader({
  slug,
  lang,
}: {
  slug: string;
  lang: string;
}) {
  const [Post, setPost] = useState<React.ComponentType | null>(null);
  const components = useMDXComponents({});

  useEffect(() => {
    import(`@/content/${slug}/${slug}_${lang}.mdx`)
      .then((module) => {
        setPost(() => module.default);
      })
      .catch((error) => {
        console.error("Error loading MDX:", error);
      });
  }, [slug, lang]);

  if (!Post) {
    return <div>Loading...</div>;
  }

  return (
    <MDXProvider components={components}>
      <Post />
    </MDXProvider>
  );
}
