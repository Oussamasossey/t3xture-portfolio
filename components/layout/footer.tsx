import type { Dictionary } from "@/i18n/dictionaries/en";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import logo from "@/assets/T3xture-Brand/Logo/Dark/T3xture_Logo_Horizontal_Dark.svg";
import { Separator } from "@/components/ui/separator";

export function Footer({ dict }: { dict: Dictionary }) {
  const { footer } = dict;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Image src={logo} alt={siteConfig.name} className="h-8 w-auto" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {dict.common.role} {footer.tagline}
            </p>
          </div>

          <nav aria-label={footer.navLabel} className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {footer.explore}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {dict.nav.items[item.id]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {footer.connect}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <social.icon aria-hidden="true" className="size-4" />
                      {social.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    dir="ltr"
                    className="inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col-reverse items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. {footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{footer.madeBy}</span>
            <span aria-hidden="true">·</span>
            <span>{footer.builtWith}</span>
            <a
              href="#top"
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
