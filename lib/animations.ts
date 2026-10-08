import type { Variants, Transition } from "framer-motion";

export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];

export const transition = (delay = 0): Transition => ({
  duration: 0.7,
  delay,
  ease: EASE_OUT,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition() },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition() },
};

export const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const itemStagger: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition() },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;

export const hoverLift = {
  y: -8,
  transition: { duration: 0.35, ease: EASE_OUT },
};
