import { Metadata } from "next";
import { getAllPosts } from "@/lib/post";
import { Locale } from "@/locales/dictionaries";
import MDXLoader from "./MDXLoader";
import { Box, Stack, Typography } from "@mui/material";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export const dynamicParams = false;

export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (await getAllPosts())
    .filter((post) => post.locale === lang)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata | undefined> {
  const { lang, slug } = await params;
  const { title, summary, date, tags } = (await getAllPosts()).find(
    (post) => post.locale === lang && post.slug === slug,
  )!;

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

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const { title, date } = (await getAllPosts()).find(
    (post) => post.locale === lang && post.slug === slug,
  )!;

  return (
    <Box component="article">
      <Stack
        component="section"
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mb: 6,
        }}
      >
        <Typography variant="h1" component="h1">
          {title}
        </Typography>
        <Box component="time" sx={{ fontSize: "14px", color: "grey.600" }}>
          {dayjs(date).format("YYYY-MM-DD")} | {dayjs(date).fromNow()}
        </Box>
      </Stack>
      <Box>
        <MDXLoader slug={slug} lang={lang} />
      </Box>
    </Box>
  );
}
