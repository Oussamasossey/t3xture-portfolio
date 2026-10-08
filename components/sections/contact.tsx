import { Clock, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { siteConfig } from "@/lib/site";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-heading"
          index="04"
          label={dict.label}
          title={dict.title}
          description={dict.description}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="flex flex-col gap-5">
            <Reveal>
              <a
                href={`mailto:${siteConfig.email}`}
                className="glass group flex items-center gap-4 rounded-2xl p-5 outline-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Mail aria-hidden="true" className="size-5" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {dict.emailLabel}
                  </span>
                  <span dir="ltr" className="truncate text-start text-sm font-medium sm:text-base rtl:text-end">
                    {siteConfig.email}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ms-auto text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                >
                  →
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="grid grid-cols-2 gap-3">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium outline-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <social.icon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted-foreground"
                      />
                      <span className="truncate">{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-border/70 bg-card/50 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Clock aria-hidden="true" className="size-4 text-primary" />
                  {dict.availableTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {dict.availableText}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="h-full">
            <ContactForm dict={dict.form} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
