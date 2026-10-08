"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Code, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/particles";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { containerStagger, fadeIn, itemStagger } from "@/lib/animations";
import { siteConfig } from "@/lib/site";
import portrait from "@/assets/portrait-cutout.png";
import symbol from "@/assets/T3xture-Brand/Symbol/Dark/T3xture_Symbol_Dark.svg";

type HeroDict = Dictionary["hero"];

function RotatingWords({
  headline,
  locale,
}: {
  headline: HeroDict["headline"];
  locale: string;
}) {
  const words = headline.words;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      2600,
    );
    return () => clearInterval(timer);
  }, [reduceMotion, words.length]);

  if (reduceMotion) {
    return <span className="text-gradient">{headline.fallback}</span>;
  }

  // "a, b, c and d" in the visitor's language.
  const spokenList = new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction",
  }).format(words);

  return (
    <>
      {/* Static phrase for assistive technology, animated copy for sighted users. */}
      <span className="sr-only">{spokenList}</span>
      {/* Every word occupies the same grid cell, so the box is as wide and tall as
          the longest word in the current language and never causes layout shift. */}
      <span aria-hidden="true" className="inline-grid align-bottom">
        {words.map((word) => (
          <span key={word} className="invisible col-start-1 row-start-1">
            {word}
          </span>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient col-start-1 row-start-1 text-start"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

/**
 * The official T3xture symbol (The Tile), seated behind the portrait in the
 * negative space beside his raised hand. Used as-is, in its single brand
 * colour; only its opacity is lowered so it reads as part of the background.
 */
function BrandMark() {
  return (
    <Image
      src={symbol}
      alt=""
      aria-hidden="true"
      className="absolute top-[3%] left-[2%] w-[40%] opacity-20"
    />
  );
}

/** Thin elliptical orbit with glowing nodes, drawn behind the portrait. */
function OrbitRing() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 400"
      className="h-auto w-full opacity-70 drop-shadow-[0_0_6px_rgba(167,139,250,0.8)]"
    >
      <defs>
        <linearGradient
          id="hero-orbit-ring"
          x1="40"
          y1="70"
          x2="360"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <g transform="rotate(-16 200 200)">
        <ellipse
          cx="200"
          cy="200"
          rx="186"
          ry="148"
          fill="none"
          stroke="url(#hero-orbit-ring)"
          strokeWidth="1.5"
        />
        <g fill="#c4b5fd" opacity="0.35">
          <circle cx="39" cy="126" r="9" />
          <circle cx="361" cy="126" r="9" />
          <circle cx="200" cy="348" r="9" />
        </g>
        <g fill="#f5f3ff">
          <circle cx="39" cy="126" r="3" />
          <circle cx="361" cy="126" r="3" />
          <circle cx="200" cy="348" r="3" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Short arc of the same orbit drawn in front of the subject so the ring
 * reads as passing around him instead of sitting flatly behind.
 */
function OrbitArc() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 400"
      className="h-auto w-full opacity-60 drop-shadow-[0_0_6px_rgba(167,139,250,0.8)]"
    >
      <defs>
        <linearGradient
          id="hero-orbit-arc"
          x1="40"
          y1="70"
          x2="360"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <g transform="rotate(-16 200 200)">
        <ellipse
          cx="200"
          cy="200"
          rx="186"
          ry="148"
          fill="none"
          stroke="url(#hero-orbit-arc)"
          strokeWidth="1.5"
          pathLength={100}
          strokeDasharray="13 87"
          strokeDashoffset={-56}
        />
        <circle cx="39" cy="126" r="3.5" fill="#f5f3ff" />
      </g>
    </svg>
  );
}

/** Handwritten brand relationship floating beside the portrait. */
function Signature() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-[2%] top-[1%] hidden w-40 rotate-[-5deg] lg:block"
    >
      <span className="block font-signature text-[1.9rem] leading-none font-semibold text-foreground/90">
        Oussama
      </span>
      <span className="mt-1 ml-7 block font-signature text-xl leading-none text-gradient">
        aka T3xture
      </span>
      <svg
        focusable="false"
        viewBox="0 0 64 52"
        className="-mt-1 ml-[-1.75rem] w-14 text-muted-foreground"
        fill="none"
      >
        <path
          d="M58 8C45 13 30 23 15 44"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M10 29L15 45L30 41"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Small glass detail card layering depth over the portrait. */
function TechBadge({ badge, dir }: { badge: HeroDict["badge"]; dir: "ltr" | "rtl" }) {
  return (
    <div
      aria-hidden="true"
      dir={dir}
      className="glass absolute right-[3%] top-[46%] hidden items-center gap-3 rounded-xl px-4 py-3 shadow-lg shadow-black/20 lg:flex"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
        <Code className="size-[1.05rem]" />
      </span>
      <div className="text-[0.7rem] leading-[1.55] text-muted-foreground">
        <p className="font-medium text-foreground">{badge.title}</p>
        {badge.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export function Hero({
  dict,
  aka,
  locale,
  dir,
}: {
  dict: HeroDict;
  aka: string;
  /** BCP-47 tag of the active language, e.g. "ar-MA". */
  locale: string;
  dir: "ltr" | "rtl";
}) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col overflow-hidden pb-12 pt-20 sm:pt-24 lg:pb-16 lg:pt-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Particles />
        <div className="bg-grid absolute inset-0" />
        <div className="animate-float absolute -left-40 top-0 size-[24rem] rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="animate-float-slow absolute -right-28 bottom-[-6rem] size-[34rem] rounded-full bg-violet-500/15 blur-[130px]" />
        <div className="noise absolute inset-0 opacity-[0.035]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerStagger}
          className="grid flex-1 items-center gap-y-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-8 lg:gap-x-10"
        >
          {/* ------------------------------------------------------------------
              Copy column — availability, brand line, headline, description, CTAs
          ------------------------------------------------------------------ */}
          <motion.div
            variants={containerStagger}
            className="z-20 flex max-w-[36rem] flex-col items-start"
          >
            <motion.div variants={itemStagger}>
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                {dict.availability}
              </span>
            </motion.div>

            <motion.p
              variants={itemStagger}
              className="mt-6 flex items-center gap-4 text-xs font-medium tracking-[0.38em] uppercase sm:text-sm"
            >
              <span className="text-muted-foreground">
                {siteConfig.realName} — {aka}{" "}
                <span className="text-foreground">{siteConfig.name}</span>
              </span>
              <span
                aria-hidden="true"
                className="hidden h-px w-12 bg-border sm:block"
              />
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={itemStagger}
              className="mt-4 font-heading text-[length:calc(clamp(2.1rem,4.6vw,3.6rem)*var(--hero-scale,1))] leading-[1.05] font-bold tracking-tight text-balance sm:mt-5"
            >
              <span className="block">{dict.headline.lead}</span>
              <span className="block">
                <RotatingWords headline={dict.headline} locale={locale} />
              </span>
              <span className="block">{dict.headline.tail}</span>
            </motion.h1>

            <motion.p
              variants={itemStagger}
              className="mt-5 max-w-[40ch] text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
            >
              {dict.description}
            </motion.p>

            <motion.div
              variants={itemStagger}
              className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8"
            >
              <Button asChild size="lg" className="group h-11 px-6 text-base">
                <a href="#projects">
                  {dict.primaryCta}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 px-6 text-base"
              >
                <a href="#contact">{dict.secondaryCta}</a>
              </Button>
              <div className="hidden sm:block">
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="h-11 px-4 text-base text-muted-foreground"
                >
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail />
                    <span dir="ltr">{siteConfig.email}</span>
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* ------------------------------------------------------------------
              Portrait composition — brand mark + orbit sit behind the cut-out,
              signature and detail card float above it. The whole zone bleeds
              toward the viewport edge on large screens.
          ------------------------------------------------------------------ */}
          <motion.div
            variants={fadeIn}
            className="relative flex justify-center md:justify-end"
          >
            <div dir="ltr" className="relative md:-me-4 lg:-me-6 xl:-me-[min(4vw,10rem)]">
              <BrandMark />

              <div className="hero-dissolve absolute top-[6%] left-1/2 w-[88%] -translate-x-1/2">
                <OrbitRing />
              </div>

              <Image
                src={portrait}
                alt={dict.portraitAlt}
                placeholder="blur"
                sizes="(min-width: 1024px) 38rem, (min-width: 768px) 26rem, 22rem"
                className="hero-dissolve relative w-[min(80vw,22rem)] max-w-full md:w-[min(46vw,26rem)] lg:w-[min(66svh,38rem)]"
              />

              <div className="hero-dissolve absolute top-[6%] left-1/2 w-[88%] -translate-x-1/2">
                <OrbitArc />
              </div>

              <Signature />
              <TechBadge badge={dict.badge} dir={dir} />
            </div>
          </motion.div>
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute end-8 bottom-0 hidden items-center gap-3 text-[0.65rem] font-medium tracking-[0.3em] text-muted-foreground uppercase lg:end-10 lg:flex"
        >
          <span>{dict.scroll}</span>
          <span className="h-px w-14 bg-border" />
          <ArrowDown className="size-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
