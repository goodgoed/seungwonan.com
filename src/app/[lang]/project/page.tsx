import { getLocales } from "@/lib/get-locale";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project",
  description: "This is where I fully enjoy what I love to do.",
};

export default async function Project({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const locales = await getLocales(lang);

  return (
    <section className="flex flex-auto justify-center items-center text-2xl font-bold">
      {locales["project"].temp}
    </section>
  );
}
