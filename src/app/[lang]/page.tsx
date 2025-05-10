import Image from "next/image";
import Link from "next/link";

import { getDictionary, Locale } from "@/locales/dictionaries";
import { Stack, Typography } from "@mui/material";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const locales = await getDictionary(lang);

  return (
    <Stack
      component="section"
      sx={{
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Image src="/profile.png" alt="Profile Image" width={300} height={300} />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        {locales["home"]["hi"]}
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        {locales["home"]["description"]}
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <a
          href="https://github.com/goodgoed"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/github.svg"
            alt="github icon"
            width={35}
            height={35}
          />
        </a>
        <Link href={`/rss_${lang}.xml`}>
          <Image src="/icons/rss.svg" alt="rss icon" width={35} height={35} />
        </Link>
      </Stack>
    </Stack>
  );
}
