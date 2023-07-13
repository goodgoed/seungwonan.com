"use client";

import { incrementView } from "@/action";
import { Locale } from "@/i18n-config";
import { useEffect } from "react";

export default function View({
  lang,
  allViews,
  slug,
  track,
}: {
  lang: Locale;
  allViews: { slug: string; count: number }[];
  slug: string;
  track?: boolean;
}) {
  const views = allViews.find((post) => post.slug === slug)?.count || 0;

  let output;
  switch (lang) {
    case "en":
      output = `${views} Views`;
      break;
    case "ko":
      output = `조회수 ${views} 회`;
      break;
  }

  useEffect(() => {
    if (track) {
      incrementView(slug);
    }
  }, []);

  return <div>{output}</div>;
}
