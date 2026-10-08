/**
 * Single source of truth for the supported languages.
 *
 * `ary` is Moroccan Darija (ISO 639-3). The URL segment uses that short code,
 * while the <html lang> attribute uses `ar-MA`, which browsers, screen readers
 * and search engines understand for font selection and pronunciation.
 */
export const locales = ["en", "fr", "ary"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie remembering an explicit language choice made with the switcher. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export type LocaleMeta = {
  /** Native name, shown in the language switcher. */
  label: string;
  /** Compact label for tight spaces (switcher button). */
  short: string;
  htmlLang: string;
  dir: "ltr" | "rtl";
  ogLocale: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { label: "English", short: "EN", htmlLang: "en", dir: "ltr", ogLocale: "en_US" },
  fr: { label: "Français", short: "FR", htmlLang: "fr", dir: "ltr", ogLocale: "fr_FR" },
  ary: { label: "الدارجة", short: "دارجة", htmlLang: "ar-MA", dir: "rtl", ogLocale: "ar_MA" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Maps a raw language tag (from Accept-Language or a cookie) to a supported locale. */
export function matchLocale(tag: string): Locale | null {
  const lower = tag.toLowerCase();
  if (hasLocale(lower)) return lower;
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("en")) return "en";
  // Moroccan Arabic, and Arabic in general, is served in Darija.
  if (lower === "ary" || lower.startsWith("ar")) return "ary";
  return null;
}
