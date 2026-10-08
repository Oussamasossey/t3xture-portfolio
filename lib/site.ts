import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

export type Social = {
  label: string;
  href: string;
  icon: IconType;
};

export type NavId = "about" | "projects" | "services" | "contact";

export type NavItem = {
  id: NavId;
  href: string;
};

/**
 * Language-neutral site facts. Everything a visitor reads (titles, labels,
 * descriptions…) lives in `i18n/dictionaries/*` instead.
 */
export const siteConfig = {
  name: "T3xture",
  realName: "Oussama",
  url: "https://t3xture-portfolio.example.com",
  email: "hello@t3xture.dev",
  author: "T3xture",
  nav: [
    { id: "about", href: "#about" },
    { id: "projects", href: "#projects" },
    { id: "services", href: "#services" },
    { id: "contact", href: "#contact" },
  ] satisfies NavItem[],
  socials: [
    { label: "GitHub", href: "https://github.com/Oussamasossey", icon: FaGithub },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/oussamasossey/", icon: FaLinkedinIn },
    { label: "Instagram", href: "https://www.instagram.com/oussama.sossey/", icon: FaInstagram },
    // Replace YOUR_PHONE_NUMBER: digits only, with country code (e.g. 212612345678)
    { label: "WhatsApp", href: "https://wa.me/+212676738411", icon: FaWhatsapp },
  ] satisfies Social[],
};
