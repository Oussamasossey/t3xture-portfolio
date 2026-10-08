import type { LucideIcon } from "lucide-react";
import { Check, Code, Gauge, Layers, Palette, Store, Wrench } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import type { Service, ServiceIcon } from "@/data/services";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { services } from "@/data/services";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  code: Code,
  palette: Palette,
  store: Store,
  gauge: Gauge,
  layers: Layers,
  wrench: Wrench,
};

type ServicesDict = Dictionary["services"];

function ServiceCard({
  service,
  copy,
  index,
}: {
  service: Service;
  copy: ServicesDict["items"][Service["id"]];
  index: number;
}) {
  const Icon = ICONS[service.icon];

  return (
    <StaggerItem className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -end-14 -top-14 size-44 rounded-full bg-primary/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          0{index + 1}
        </span>
      </div>

      <h3 className="font-heading relative mt-5 text-lg font-semibold tracking-tight">
        {copy.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {copy.description}
      </p>

      <ul className="relative mt-5 flex flex-col gap-2 border-t border-border/70 pt-5">
        {copy.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-sm text-foreground/90"
          >
            <Check
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-primary"
            />
            {point}
          </li>
        ))}
      </ul>
    </StaggerItem>
  );
}

export function Services({ dict }: { dict: ServicesDict }) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-heading"
          index="03"
          label={dict.label}
          align="center"
          title={dict.title}
          description={dict.description}
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              copy={dict.items[service.id]}
              index={index}
            />
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {dict.footnote.before}
            <a
              href="#contact"
              className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              {dict.footnote.link}
            </a>
            {dict.footnote.after}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
