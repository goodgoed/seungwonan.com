import type { Locale } from "@/i18n-config";
import Navbar from "./navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read blog posts about both on dev-related and my personal stories.",
};

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <>
      <Navbar lang={lang} />
      {children}
    </>
  );
}
