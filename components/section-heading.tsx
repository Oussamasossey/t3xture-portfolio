import { Reveal } from "@/components/motion";
import type { RichText } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  index: string;
  label: string;
  title: RichText;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  id,
  index,
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto max-w-2xl text-center")}>
      <Reveal>
        <p
          className={cn(
            "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground",
            centered && "justify-center",
          )}
        >
          <span className="font-mono text-primary">{index}</span>
          <span aria-hidden="true" className="h-px w-10 bg-border" />
          {label}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          id={id}
          className="font-heading mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {title.before}
          <span className="text-gradient">{title.highlight}</span>
          {title.after}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
