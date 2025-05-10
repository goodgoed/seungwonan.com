import "server-only";

export type Locale = "en" | "ko";

const dictionaries = {
  en: () => import("./en/common.json").then((module) => module.default),
  ko: () => import("./ko/common.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
