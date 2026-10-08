import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import {
  Caveat,
  Geist,
  Geist_Mono,
  IBM_Plex_Sans_Arabic,
  Space_Grotesk,
} from "next/font/google";
import "../globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { hasLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

/* Handwritten accent used for the hero signature. */
const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

/* Used for Darija (Arabic script); wired up in globals.css for `dir="rtl"`. */
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const { meta } = await getDictionary(lang);
  const { ogLocale } = localeMeta[lang];

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "ar-MA": "/ary",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locales
        .filter((locale) => locale !== lang)
        .map((locale) => localeMeta[locale].ogLocale),
      url: `${siteConfig.url}/${lang}`,
      siteName: siteConfig.name,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* The portfolio is dark-only. */
export const viewport: Viewport = {
  themeColor: "#0d0d14",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { htmlLang, dir } = localeMeta[lang];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.realName,
    jobTitle: dict.meta.jobTitle,
    description: dict.meta.description,
    inLanguage: htmlLang,
    url: `${siteConfig.url}/${lang}`,
    email: `mailto:${siteConfig.email}`,
    sameAs: siteConfig.socials.map((social) => social.href),
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Front-End Engineering",
      "Web Performance",
    ],
  };

  return (
    <html
      lang={htmlLang}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${caveat.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
        >
          {dict.common.skipToContent}
        </a>
        <Navbar locale={lang} dict={dict.nav} />
        {children}
        <Footer dict={dict} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
