import "@/globals.css";
import Navbar from "@/app/[lang]/navbar";

import { getLocales } from "@/lib/get-locale";
import { Locale } from "@/i18n-config";

// export async function generateStaticParams() {
//   return [{ lang: "en" }, { lang: "ko" }];
// }

export default async function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const locales = await getLocales(lang);

  return (
    <>
      <Navbar lang={lang} locales={locales} />
      {children}
    </>
  );
}
