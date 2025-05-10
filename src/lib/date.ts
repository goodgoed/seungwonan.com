import format from "date-fns/format";
import { parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { Locale } from "@/i18n-config";

export function formatDate(date: string, lang: Locale) {
  let formattedDate;
  switch (lang) {
    case "en":
      formattedDate = format(parseISO(date), "MMM d, yyyy");
      break;
    case "ko":
      formattedDate = format(parseISO(date), "PPP", { locale: ko });
      break;
  }

  return formattedDate;
}
