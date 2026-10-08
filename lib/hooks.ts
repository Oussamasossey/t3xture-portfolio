"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in view using IntersectionObserver.
 * The observer only fires while the user scrolls, so there is no hydration cost.
 */
export function useActiveSection(ids: string[]): string | null {
  const key = ids.join(",");
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
