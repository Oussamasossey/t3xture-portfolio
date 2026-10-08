"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { useActiveSection } from "@/lib/hooks";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/T3xture-Brand/Logo/Dark/T3xture_Logo_Horizontal_Dark.svg";

const SECTION_IDS = siteConfig.nav.map((item) => item.href.slice(1));

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 16,
    () => false,
  );

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const toggleButton = toggleRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onMediaChange = () => {
      if (mediaQuery.matches) setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    mediaQuery.addEventListener("change", onMediaChange);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onMediaChange);
      toggleButton?.focus();
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-lg shadow-black/5"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label={`${siteConfig.name} — ${dict.backToTop}`}
          className="group flex items-center gap-2.5 rounded-lg py-1.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image
            src={logo}
            alt={siteConfig.name}
            priority
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <nav aria-label={dict.primaryLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 outline-none",
                      "focus-visible:ring-3 focus-visible:ring-ring/50",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{dict.items[item.id]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher locale={locale} label={dict.language} />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">{dict.cta}</a>
          </Button>
          <Button
            ref={toggleRef}
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 md:hidden"
            aria-expanded={open}
            aria-controls={open ? "mobile-nav" : undefined}
            aria-label={open ? dict.closeMenu : dict.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            key="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto md:hidden"
          >
            <nav aria-label={dict.mobileLabel} className="flex flex-col gap-8 px-5 py-8">
              <ul className="flex flex-col gap-1.5">
                {siteConfig.nav.map((item, index) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex items-baseline justify-between rounded-2xl px-4 py-4 text-2xl font-medium tracking-tight transition-colors",
                          "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                          isActive
                            ? "bg-primary/15 text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <span>{dict.items[item.id]}</span>
                        <span className="font-mono text-xs">
                          0{index + 1}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col gap-4 border-t border-border pt-6">
                <Button asChild size="lg" onClick={closeMenu}>
                  <a href="#contact">{dict.ctaMobile}</a>
                </Button>
                <LanguageSwitcher
                  variant="segmented"
                  locale={locale}
                  label={dict.language}
                />
                <div className="flex items-center gap-3">
                  {siteConfig.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      <social.icon aria-hidden="true" className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
