"use client";

import Toggler from "@/components/language-toggler";
import { Locale } from "@/i18n-config";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({
  lang,
  locales,
}: {
  lang: Locale;
  locales: any;
}) {
  let pathname = usePathname().slice(3) || "/";
  const navItems = {
    "/": {
      name: "home",
    },
    "/blog": {
      name: "blog",
    },
    "/project": {
      name: "project",
    },
  };

  if (pathname.includes("/blog")) {
    pathname = "/blog";
  }

  return (
    <nav className="flex items-center gap-4">
      {Object.entries(navItems).map(([path, { name }]) => {
        // const isActive = path === pathname;

        return (
          <Link
            key={path}
            href={`/${lang}/${path}`}
            className={clsx(path === "/" && "mr-auto")}
          >
            {locales["nav"][name]}
          </Link>
        );
      })}
      <Toggler />
    </nav>
  );
}
