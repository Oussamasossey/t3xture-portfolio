import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.en),
  fr: () => import("./dictionaries/fr").then((m) => m.fr),
  ary: () => import("./dictionaries/ary").then((m) => m.ary),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
