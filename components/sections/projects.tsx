import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function Projects({ dict }: { dict: Dictionary["projects"] }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/50 to-background"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="projects-heading"
            index="02"
            label={dict.label}
            title={dict.title}
            description={dict.description}
          />
          <Reveal delay={0.2} className="md:pb-2">
            <p className="font-mono text-sm text-muted-foreground">
              {String(projects.length).padStart(2, "0")} / {dict.counter}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              copy={dict.items[project.id]}
              labels={dict}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
