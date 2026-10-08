import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale, locales, matchLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

/** Picks the visitor's language: saved choice → browser preference → default. */
function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => {
        const [tag, ...params] = part.trim().split(";");
        const q = params.find((param) => param.trim().startsWith("q="));
        return { tag: tag.trim(), q: q ? Number.parseFloat(q.trim().slice(2)) : 1 };
      })
      .filter((entry) => entry.tag && entry.tag !== "*" && !Number.isNaN(entry.q))
      .sort((a, b) => b.q - a.q);

    for (const { tag } of preferred) {
      const match = matchLocale(tag);
      if (match) return match;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (favicon, images, OG image…).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
