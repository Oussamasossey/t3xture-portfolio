"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { ary } from "@/i18n/dictionaries/ary";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";

/*
 * `not-found` receives no route params, and reading request headers here would
 * force every language page to render dynamically. The language is therefore
 * taken from the URL on the client; this boundary only loads on a 404, so
 * importing the (small) dictionaries here costs nothing for normal visits.
 */
const copy = { en: en.notFound, fr: fr.notFound, ary: ary.notFound };

export default function NotFound() {
  const segment = usePathname().split("/")[1] ?? "";
  const lang = hasLocale(segment) ? segment : defaultLocale;
  const text = copy[lang];

  return (
    <main className="relative grid flex-1 place-items-center px-4 py-32 text-center">
      <div className="max-w-md">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="font-heading mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {text.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{text.text}</p>
        <Button asChild className="mt-8">
          <a href={`/${lang}`}>
            <ArrowLeft aria-hidden="true" className="rtl:rotate-180" />
            {text.cta}
          </a>
        </Button>
      </div>
    </main>
  );
}
