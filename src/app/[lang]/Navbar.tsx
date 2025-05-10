"use client";

import { usePathname } from "next/navigation";
import { Stack } from "@mui/material";

import Toggler from "./LanguageToggler";
import { Locale } from "@/locales/dictionaries";
import Link from "@/components/Link";

export default function Navbar({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: any;
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
    <Stack
      component="nav"
      direction="row"
      useFlexGap
      spacing={{ md: 2 }}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        width: "100%",
        "& .nav-item": {
          p: 1,
          "&:hover": {
            backgroundColor: "grey.200",
            borderRadius: 1,
            transition: "background-color 0.2s ease",
          },
        },
      }}
    >
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <Link
            key={path}
            className="nav-item"
            href={`/${lang}/${path}`}
            sx={{
              marginRight: path === "/" ? "auto" : "inherit",
              gap: 3,
            }}
          >
            {dictionary["nav"][name]}
          </Link>
        );
      })}
      <Toggler className="nav-item" />
    </Stack>
  );
}
