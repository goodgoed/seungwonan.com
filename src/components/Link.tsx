"use client";

import NextLink from "next/link";
import Link, { LinkProps as MuiLinkProps } from "@mui/material/Link";

type Props = MuiLinkProps & {
  href: string;
};

const isInternalLink = (href: string) => href.startsWith("/");

export default function CustomLink(props: Props) {
  const { href, ...rest } = props;

  return (
    <Link
      {...rest}
      underline="none"
      href={href}
      component={isInternalLink(href) ? NextLink : "a"}
      target={isInternalLink(href) ? undefined : "_blank"}
      rel={isInternalLink(href) ? undefined : "noopener noreferrer"}
    />
  );
}
