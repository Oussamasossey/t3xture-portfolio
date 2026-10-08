import {
  SiDocker,
  SiFramer,
  SiGit,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Accessibility, Gauge, MessagesSquare, Sparkles } from "lucide-react";
import type { IconType } from "react-icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/i18n/dictionaries/en";

const STACK: { name: string; icon: IconType }[] = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
];

/** Icons only — titles and descriptions come from `dict.principles` (same order). */
const PRINCIPLE_ICONS = [Gauge, Accessibility, Sparkles, MessagesSquare];

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="about-heading"
          index="01"
          label={dict.label}
          title={dict.title}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <Reveal>
                <p>{dict.paragraphs[0]}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>{dict.paragraphs[1]}</p>
              </Reveal>
            </div>

            <div className="mt-10">
              <Reveal>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  {dict.stackTitle}
                </h3>
              </Reveal>
              <Stagger className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {STACK.map((tech) => (
                  <StaggerItem
                    key={tech.name}
                    className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border/70 bg-card/50 p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/10"
                  >
                    <tech.icon
                      aria-hidden="true"
                      className="size-7 text-foreground/70 transition-colors duration-300 group-hover:text-primary"
                    />
                    <span className="text-xs font-medium">{tech.name}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>

          <Reveal delay={0.12} className="h-full">
            <div className="glass flex h-full flex-col rounded-3xl p-7 shadow-xl shadow-black/5 sm:p-8">
              <h3 className="font-heading text-lg font-semibold tracking-tight">
                {dict.principlesTitle}
              </h3>

              <ul className="mt-6 flex flex-col gap-5">
                {dict.principles.map((principle, index) => {
                  const PrincipleIcon = PRINCIPLE_ICONS[index];
                  return (
                  <li key={principle.title} className="flex gap-4">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                      <PrincipleIcon aria-hidden="true" className="size-4.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{principle.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-8">
                <Reveal delay={0.2}>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-primary outline-none transition-colors hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {dict.cta}
                    <span aria-hidden="true" className="rtl:-scale-x-100">→</span>
                  </a>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
