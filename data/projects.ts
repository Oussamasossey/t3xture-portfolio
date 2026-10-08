export type ProjectIcon = "plane" | "utensils" | "languages" | "smartphone" | "heartPulse" | "car";

export type ProjectId = "travel-agency" | "restaurant" | "language-school" | "phone-store" | "kine" | "car-rental";

/**
 * Language-neutral project data. The visible copy (title, category,
 * description, details, features, tags) lives in the dictionaries under
 * `projects.items[id]`.
 */
export type Project = {
  id: ProjectId;
  year: string;
  /** Placeholder link — swap for the real deployment URL. */
  demoUrl: string;
  icon: ProjectIcon;
  /** Tailwind gradient utility classes (static strings so they are always generated). */
  gradient: string;
};

export const projects: Project[] = [
  {
    id: "travel-agency",
    year: "2025",
    demoUrl: "https://noursands.com",
    icon: "plane",
    gradient: "from-sky-500 via-cyan-400 to-teal-400",
  },
  {
    id: "restaurant",
    year: "2025",
    demoUrl: "https://restaurant.t3xture.dev",
    icon: "utensils",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    id: "language-school",
    year: "2024",
    demoUrl: "https://ecole.t3xture.dev",
    icon: "languages",
    gradient: "from-violet-500 via-indigo-500 to-blue-500",
  },
  {
    id: "phone-store",
    year: "2024",
    demoUrl: "https://phoneseller.t3xture.dev",
    icon: "smartphone",
    gradient: "from-fuchsia-500 via-pink-500 to-purple-500",
  },
  {
    id: "kine",
    year: "2026",
    demoUrl: "https://kine.t3xture.dev",
    icon: "heartPulse",
    gradient: "from-emerald-500 via-green-400 to-lime-400",
  },
  {
    id: "car-rental",
    year: "2026",
    demoUrl: "https://location.t3xture.dev",
    icon: "car",
    gradient: "from-slate-700 via-slate-500 to-sky-500",
  },
];
