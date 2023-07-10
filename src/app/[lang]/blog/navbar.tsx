"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";

import { Locale } from "@/i18n-config";

export default function Navbar({ lang }: { lang: Locale }) {
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
          className={clsx(
            "flex gap-4 mt-6 px-2",
            pathname.includes("/category") ? "mb-6" : "mb-10"
          )}
        >
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname;
            return (
              <li key={path}>
                <Link
                  href={`/${lang}/${path}`}
                  className={clsx(
                    "relative uppercase text-gray-400",
                    isActive && "text-gray-700",
                    "hover:text-gray-600 transition-all"
                  )}
                >
                  {name}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bg-gray-400 w-full h-[1px] from-transparent to-gray-400"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
