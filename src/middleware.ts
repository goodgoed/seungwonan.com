import { NextResponse, NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { LOCALES } from "./constant";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Given the browser default, figure out the locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    LOCALES
  );

  // Convert any locale to simple locale
  const locale = match(languages, LOCALES, LOCALES[0]);

  return locale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to default locale (en) when no locale is found in the pathname
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|content|favicon.ico|sitemap.xml|robots.txt|rss_en.xml|rss_ko.xml|icons|profile).*)",
  ],
};
