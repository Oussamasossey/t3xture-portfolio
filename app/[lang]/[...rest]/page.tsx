import { notFound } from "next/navigation";

/**
 * Any unknown path below a valid language renders the localized, dark-themed
 * `not-found.tsx` (inside the root layout) instead of Next's default 404.
 */
export default function CatchAll() {
  notFound();
}
