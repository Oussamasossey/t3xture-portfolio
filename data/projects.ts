export type ProjectIcon = "plane" | "utensils" | "languages" | "smartphone";

export type ProjectId = "travel-agency" | "restaurant" | "language-school" | "phone-store";

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
    demoUrl: "https://example.com/travel-agency",
    icon: "plane",
    gradient: "from-sky-500 via-cyan-400 to-teal-400",
  },
  {
    id: "restaurant",
    year: "2025",
    demoUrl: "https://example.com/restaurant",
    icon: "utensils",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    id: "language-school",
    year: "2024",
    demoUrl: "https://example.com/language-school",
    icon: "languages",
    gradient: "from-violet-500 via-indigo-500 to-blue-500",
  },
  {
    id: "phone-store",
    year: "2024",
    demoUrl: "https://example.com/phone-store",
    icon: "smartphone",
    gradient: "from-fuchsia-500 via-pink-500 to-purple-500",
  },
];
