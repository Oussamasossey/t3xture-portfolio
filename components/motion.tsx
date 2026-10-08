"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import {
  containerStagger,
  itemStagger,
  transition,
  viewportOnce,
} from "@/lib/animations";

const INSTANT_CONTAINER: Variants = { hidden: {}, visible: {} };
const INSTANT_ITEM: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: React.ReactNode;
  delay?: number;
  y?: number;
};

/** Fades and slides children in the first time they enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={transition(delay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: React.ReactNode;
};

/** Parent container that releases `StaggerItem` children one after another. */
export function Stagger({ children, ...props }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduceMotion ? INSTANT_CONTAINER : containerStagger}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Child of `Stagger`. */
export function StaggerItem({ children, ...props }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? INSTANT_ITEM : itemStagger}
      {...props}
    >
      {children}
    </motion.div>
  );
}
