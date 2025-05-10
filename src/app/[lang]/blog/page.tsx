import { Locale } from "@/locales/dictionaries";
import Post from "./Post";
import { getAllPosts } from "@/lib/post";
import { List, ListItem } from "@mui/material";

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const posts = (await getAllPosts()).filter((post) => post.locale === lang);

  return (
    <List>
      {posts.map((post) => {
        return (
          <ListItem key={post.title} disablePadding sx={{ mb: 3 }}>
            <Post post={post} />
          </ListItem>
        );
      })}
    </List>
  );
}
