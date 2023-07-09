"use client";

import type { Locale } from "@/i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  let pathname = usePathname().slice(3);
  const navItems = {
    "/blog": {
      name: "all",
    },
    "/blog/category": {
      name: "category",
    },
  };
  const shouldRender = !(
    pathname.split("/").length > 2 && !pathname.includes("category")
  );

  if (pathname.includes("/category")) {
    pathname = "/blog/category";
  }

  return (
    <>
      {shouldRender && (
        <ul
          className={`flex gap-4 mt-6 ${
            pathname.includes("/category") ? "mb-6" : "mb-10"
          }`}
        >
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname;
            return (
              <Link
                key={path}
                href={`/${lang}/${path}`}
                className={clsx("uppercase text-gray-400", {
                  "text-gray-700 border-b-[1px] border-gray-500": isActive,
                })}
              >
                {name}
              </Link>
            );
          })}
        </ul>
      )}
      {children}
    </>
  );
}
