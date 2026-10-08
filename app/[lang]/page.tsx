import { notFound } from "next/navigation";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { hasLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { htmlLang, dir } = localeMeta[lang];

  return (
    <main id="main-content" className="relative">
      <Hero dict={dict.hero} aka={dict.common.aka} locale={htmlLang} dir={dir} />
      <About dict={dict.about} />
      <Projects dict={dict.projects} />
      <Services dict={dict.services} />
      <Contact dict={dict.contact} />
    </main>
  );
}
