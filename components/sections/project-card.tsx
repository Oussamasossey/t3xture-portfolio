"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  CarFront,
  Check,
  ChevronDown,
  ExternalLink,
  HeartPulse,
  Languages,
  Plane,
  Smartphone,
  Utensils,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hoverLift, transition, viewportOnce } from "@/lib/animations";
import type { Project, ProjectIcon } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils";

const ICONS: Record<ProjectIcon, LucideIcon> = {
  plane: Plane,
  utensils: Utensils,
  languages: Languages,
  smartphone: Smartphone,
  heartPulse: HeartPulse,
  car: CarFront,
};

type ProjectsDict = Dictionary["projects"];

export function ProjectCard({
  project,
  copy,
  labels,
  index,
}: {
  project: Project;
  copy: ProjectsDict["items"][Project["id"]];
  labels: Pick<ProjectsDict, "viewDemo" | "details" | "builtWith" | "demoBadge" | "liveBadge">;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const detailsId = `project-details-${project.id}`;
  const Icon = ICONS[project.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={transition(index * 0.07)}
      whileHover={reduceMotion ? undefined : hoverLift}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-lg shadow-black/5 backdrop-blur-xl transition-colors duration-300 hover:border-primary/40"
    >
      <div
        className={cn(
          "relative aspect-16/10 overflow-hidden bg-gradient-to-br",
          project.gradient,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
        <Icon
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-white/90 drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {!imageFailed && (
          <>
            <Image
              src={`/projects/${project.id}.png`}
              alt={`${copy.title} — ${copy.client}`}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              onError={() => setImageFailed(true)}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent"
            />
          </>
        )}
        <span className="absolute start-4 top-4 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {copy.category}
        </span>
        <span className="absolute end-4 top-4 rounded-full bg-black/25 px-3 py-1 font-mono text-xs text-white backdrop-blur-sm">
          {project.demo ? labels.demoBadge : labels.liveBadge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-heading text-xl font-semibold tracking-tight">
            {copy.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {copy.client} · {copy.category}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.description}
        </p>

        <ul
          className="flex flex-wrap gap-2"
          aria-label={`${copy.title} — ${labels.builtWith}`}
        >
          {copy.tags.map((tag) => (
            <li key={tag}>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/15"
              >
                {tag}
              </Badge>
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="details"
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {copy.details}
                </p>
                <ul className="mt-3.5 grid gap-2">
                  {copy.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-primary"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Button asChild size="sm" className="h-9 px-4">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {labels.viewDemo}
              <ExternalLink className="rtl:-scale-x-100" />
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 px-4"
            aria-expanded={expanded}
            aria-controls={expanded ? detailsId : undefined}
            onClick={() => setExpanded((value) => !value)}
          >
            {labels.details}
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "transition-transform duration-300",
                expanded && "rotate-180",
              )}
            />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
