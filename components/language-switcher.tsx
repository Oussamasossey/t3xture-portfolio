"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE, localeMeta, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
  /** Accessible name of the control, e.g. "Language". */
  label: string;
  variant?: "menu" | "segmented";
  className?: string;
};

/** Id of the section currently in view, so the visitor lands on the same section after switching. */
function currentSectionId(): string | null {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
  let current: string | null = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = section.id;
  }
  return current;
}

function useSwitchLocale(current: Locale) {
  const pathname = usePathname();
  const router = useRouter();

  return (next: Locale) => {
    if (next === current) return;

    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;

    // Swap only the leading locale segment: /en/foo → /fr/foo
    const rest = pathname.replace(/^\/[^/]+/, "");
    const section = currentSectionId();
    const hash = section ? `#${section}` : "";
    router.push(`/${next}${rest}${hash}`);
  };
}

/**
 * Compact dropdown used in the header. Names are shown in their own language
 * (English / Français / الدارجة) so every visitor can recognise their option.
 */
function MenuSwitcher({ locale, label, className }: LanguageSwitcherProps) {
  const switchLocale = useSwitchLocale(locale);
  const { dir } = localeMeta[locale];

  return (
    <DropdownMenu.Root dir={dir}>
      <DropdownMenu.Trigger
        aria-label={label}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-full border border-border/70 px-3 text-sm font-medium text-muted-foreground outline-none transition-colors",
          "hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:border-primary/40 data-[state=open]:text-foreground",
          className,
        )}
      >
        <Languages aria-hidden="true" className="size-4" />
        <span translate="no">{localeMeta[locale].short}</span>
        <ChevronDown aria-hidden="true" className="size-3.5 opacity-70" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="glass-strong z-60 min-w-40 rounded-2xl p-1.5 shadow-xl shadow-black/30 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          <DropdownMenu.RadioGroup
            value={locale}
            onValueChange={(value) => switchLocale(value as Locale)}
          >
            {locales.map((code) => (
              <DropdownMenu.RadioItem
                key={code}
                value={code}
                lang={localeMeta[code].htmlLang}
                dir={localeMeta[code].dir}
                className="flex cursor-pointer items-center justify-between gap-6 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors data-highlighted:bg-primary/15 data-[state=checked]:text-foreground text-muted-foreground data-highlighted:text-foreground"
              >
                <span>{localeMeta[code].label}</span>
                <DropdownMenu.ItemIndicator>
                  <Check aria-hidden="true" className="size-4 text-primary" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/** Three large touch targets, used inside the mobile menu panel. */
function SegmentedSwitcher({ locale, label, className }: LanguageSwitcherProps) {
  const switchLocale = useSwitchLocale(locale);

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("grid grid-cols-3 gap-1.5 rounded-2xl border border-border/70 p-1.5", className)}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={localeMeta[code].htmlLang}
            aria-pressed={active}
            onClick={() => switchLocale(code)}
            className={cn(
              "min-h-11 rounded-xl px-2 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              active
                ? "bg-primary/15 text-foreground ring-1 ring-primary/30"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {localeMeta[code].label}
          </button>
        );
      })}
    </div>
  );
}

export function LanguageSwitcher(props: LanguageSwitcherProps) {
  return props.variant === "segmented" ? (
    <SegmentedSwitcher {...props} />
  ) : (
    <MenuSwitcher {...props} />
  );
}
