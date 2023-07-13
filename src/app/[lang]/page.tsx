import Image from "next/image";

import { getLocales } from "@/lib/get-locale";
import { Locale } from "@/i18n-config";
import profile from "/public/profile.png";
import github from "/public/github.svg";
import Link from "next/link";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const locales = await getLocales(lang);

  return (
    <section className="my-16 flex flex-auto flex-col justify-center items-center">
      <Image
        src={profile}
        alt="Profile Image"
        width={300}
        height={300}
        className="mb-20"
      />
      <h1 className="uppercase text-center font-bold text-3xl pb-8">
        {locales["home"].hi}
      </h1>
      <p className="text-center pb-4">{locales["home"].description}</p>
      <Link href="https://github.com/goodgoed">
        <Image src={github} alt="Github account" width={30} height={30} />
      </Link>
    </section>
  );
}
