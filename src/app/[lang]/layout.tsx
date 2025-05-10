import { Metadata } from "next";

import { getDictionary, Locale } from "@/locales/dictionaries";
import Navbar from "./Navbar";
import { Box, Grid, Stack } from "@mui/material";
import { LOCALES } from "@/constant";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locales = await getDictionary(lang);
  return {
    title: {
      default: locales["general"]["name"],
      template: "%s" + " | " + locales["general"]["name"],
    },
    description: locales["home"]["description"],
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  // FIXME:
  // I want to be able to control the layout in the upper component.
  return (
    <>
      <Stack component="main" sx={{ height: "100%", width: 1 / 2 }}>
        <Box sx={{ flex: "0 0 10%", display: "flex", alignItems: "flex-end" }}>
          <Navbar lang={lang} dictionary={dictionary} />
        </Box>
        {children}
      </Stack>
    </>
  );
}
