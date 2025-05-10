import { Metadata } from "next";

import { getDictionary, Locale } from "@/locales/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locales = await getDictionary(lang);
  return {
    title: locales["project"]["title"],
    description: locales["project"]["description"],
    openGraph: {
      description: locales["project"]["description"],
    },
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const locales = await getDictionary(lang);

  return (
    <section className="flex flex-auto justify-center items-center">
      <h1 className="text-center text-2xl font-bold">
        {locales["project"]["title"]}
      </h1>
    </section>
  );
}
