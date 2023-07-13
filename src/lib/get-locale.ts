import "server-only";
import type { Locale } from "../i18n-config";
import { i18n } from "../i18n-config";

const locales = {
  en: () => import("@/locales/en/common.json").then((module) => module.default),
  ko: () => import("@/locales/ko/common.json").then((module) => module.default),
};

export const getLocales = async (locale: Locale) =>
  locales[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]();
