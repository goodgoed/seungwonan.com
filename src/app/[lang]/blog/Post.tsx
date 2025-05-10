import Link from "@/components/Link";
import { Post as PostMetadata } from "@/lib/post";
import { Box, Typography, Chip, Stack } from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export default function Post({ post }: { post: PostMetadata }) {
  dayjs.extend(localizedFormat);
  const { locale, slug, title, date, tags } = post;
  dayjs.locale(locale);

  return (
    <Stack
      component={Link}
      href={`/${locale}/blog/${slug}`}
      sx={{ color: "inherit", width: "100%", gap: 1 }}
    >
      <Typography variant="h6" component="h3" sx={{ fontSize: "16px" }}>
        {title}
      </Typography>
      <Stack direction="row" useFlexGap spacing={1}>
        <Typography
          component="time"
          sx={{ mr: "auto", fontSize: "14px", color: "grey.600" }}
        >
          {dayjs(date).format("LL")}
        </Typography>
        {tags && (
          <Stack direction="row" spacing={1}>
            {tags.map((tag) => (
              <Typography
                key={tag}
                component="span"
                sx={{
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  backgroundColor: "transparent",
                }}
              >
                #{tag}
              </Typography>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
