/**
 * English is the reference dictionary: its shape defines `Dictionary`, and the
 * French and Darija files are type-checked against it, so a missing or extra
 * key fails the build instead of leaking untranslated text.
 */

/** A heading with one gradient-highlighted phrase: before + highlight + after. */
export type RichText = { before: string; highlight: string; after: string };

export const en = {
  meta: {
    title: "T3xture | Web Developer for Modern Websites & Web Apps",
    description:
      "Portfolio of T3xture, a web developer building fast, accessible and beautifully crafted websites and web applications with React, Next.js and TypeScript.",
    keywords: [
      "T3xture",
      "web developer",
      "front-end developer",
      "Next.js developer",
      "React developer",
      "freelance web developer",
      "portfolio",
    ],
    jobTitle: "Web Developer",
  },

  common: {
    role: "Web Developer",
    skipToContent: "Skip to content",
    aka: "aka",
  },

  nav: {
    items: {
      about: "About",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
    },
    primaryLabel: "Primary",
    mobileLabel: "Mobile",
    backToTop: "back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Let's talk",
    ctaMobile: "Start a project",
    language: "Language",
  },

  hero: {
    availability: "Available for freelance projects",
    headline: {
      lead: "I build",
      words: ["websites", "web apps", "online stores", "interfaces"],
      tail: "that feel premium.",
      fallback: "digital experiences",
    },
    description:
      "Web developer focused on clean code, thoughtful detail and measurable performance. I turn ideas into fast, accessible products people actually enjoy using.",
    primaryCta: "View my work",
    secondaryCta: "Get in touch",
    portraitAlt: "Cut-out portrait of Oussama, also known as T3xture",
    badge: {
      title: "Modern Web Apps",
      lines: ["Clean Code", "Better Experience"],
    },
    scroll: "Scroll",
  },

  about: {
    label: "About",
    title: {
      before: "Building the web with ",
      highlight: "care and craft",
      after: "",
    } satisfies RichText,
    paragraphs: [
      "I'm a web developer who cares about the details most people never notice: the timing of an animation, the rhythm of a type scale, the millisecond a button takes to respond.",
      "I build modern, performant web experiences with a focus on clean code, thoughtful design, and real-world usability.",
    ],
    stackTitle: "Tech stack",
    principlesTitle: "What I bring to a project",
    principles: [
      {
        title: "Performance first",
        description: "Core Web Vitals treated as a feature, not an afterthought.",
      },
      {
        title: "Accessible by default",
        description: "Semantic markup, keyboard support and real contrast ratios.",
      },
      {
        title: "Clean, typed code",
        description: "Components and patterns your team can extend with confidence.",
      },
      {
        title: "Clear communication",
        description: "Predictable delivery, honest timelines, no black boxes.",
      },
    ],
    cta: "Have a project in mind?",
  },

  projects: {
    label: "Projects",
    title: { before: "Selected ", highlight: "work", after: "" } satisfies RichText,
    description:
      "Four recent builds, each one designed, developed and shipped end to end.",
    counter: "case studies",
    viewDemo: "View Project",
    details: "Details",
    builtWith: "built with",
    items: {
      "travel-agency": {
        title: "Travel Agency",
        client: "Atlas Voyages",
        category: "Booking platform",
        description:
          "A destination-first booking experience with rich imagery, smart filters and a frictionless enquiry flow.",
        details:
          "Atlas Voyages needed a site that sells the feeling of travel before it sells the trip. I built a fast, image-led marketing site with a searchable destination catalogue, an itinerary builder and a multi-step enquiry form that qualifies leads before they reach the sales team.",
        features: [
          "Searchable destination catalogue with filters",
          "Multi-step enquiry and quote request flow",
          "SEO-optimised landing pages per destination",
          "Localised content ready for new markets",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      restaurant: {
        title: "Restaurant",
        client: "La Table d'Or",
        category: "Hospitality website",
        description:
          "An elegant, story-driven restaurant site with a digital menu, reservations and chef-led branding.",
        details:
          "La Table d'Or wanted a website that feels like the dining room itself: warm, calm and precise. The build pairs an animated menu with a reservation flow, opening-hours logic and gallery sections that keep the experience light on mobile data.",
        features: [
          "Digital menu with categories and daily specials",
          "Table reservation form with validation",
          "Gallery, story and chef sections",
          "Local business schema for map results",
        ],
        tags: ["React", "Tailwind CSS", "Framer Motion", "Forms"],
      },
      "language-school": {
        title: "Language School",
        client: "Lingua Nova",
        category: "Education platform",
        description:
          "A clear, friendly site for a language school: course catalogue, level test and teacher profiles.",
        details:
          "Lingua Nova needed one place to explain dozens of courses without overwhelming parents or students. I structured the content around levels and goals, added a lightweight placement test and designed lead capture that plugs straight into the school's CRM.",
        features: [
          "Course catalogue grouped by level and goal",
          "Interactive placement level test",
          "Teacher profiles and testimonial section",
          "Lead capture wired to a CRM endpoint",
        ],
        tags: ["Next.js", "TypeScript", "SEO", "CMS"],
      },
      "phone-store": {
        title: "Phone Store",
        client: "PixelPhone",
        category: "E-commerce storefront",
        description:
          "A conversion-focused storefront with product comparison, promo blocks and a smooth checkout path.",
        details:
          "PixelPhone sells devices where specs decide the sale. The storefront puts comparison, storage/colour variants and trade-in offers in front of the buyer, while keeping Core Web Vitals green on mid-range phones over mobile networks.",
        features: [
          "Product comparison across specs and prices",
          "Variant selection and stock states",
          "Promo and bundle sections for campaigns",
          "Checkout-ready cart structure",
        ],
        tags: ["Next.js", "E-commerce", "Tailwind CSS", "Performance"],
      },
    },
  },

  services: {
    label: "Services",
    title: { before: "How I can ", highlight: "help", after: "" } satisfies RichText,
    description:
      "From a single landing page to a full product build. Pick what you need, or combine them.",
    footnote: {
      before: "Not sure what you need? ",
      link: "Let's talk it through",
      after: ".",
    },
    items: {
      "web-development": {
        title: "Web Development",
        description:
          "Production-ready websites and web apps built with a modern, maintainable stack.",
        points: ["Marketing sites & landing pages", "Next.js & React apps", "Clean, typed code"],
      },
      "frontend-engineering": {
        title: "Front-End Engineering",
        description:
          "Pixel-accurate interfaces with reusable components, motion and rock-solid accessibility.",
        points: ["Design-to-code delivery", "Component libraries", "WCAG-minded markup"],
      },
      ecommerce: {
        title: "E-Commerce Builds",
        description:
          "Storefronts designed to sell: fast product pages, clear flows and frictionless checkout.",
        points: ["Product & category pages", "Cart and checkout flows", "Payment integrations"],
      },
      "performance-seo": {
        title: "Performance & SEO",
        description:
          "Speed and visibility engineered in from the start, not bolted on afterwards.",
        points: ["Core Web Vitals tuning", "Technical SEO & metadata", "Schema markup"],
      },
      integrations: {
        title: "API & CMS Integration",
        description:
          "Connect your site to the tools you already use, so content stays easy to manage.",
        points: ["Headless CMS setup", "REST & GraphQL APIs", "Third-party services"],
      },
      support: {
        title: "Ongoing Support",
        description:
          "After launch I keep things healthy: updates, monitoring and steady improvements.",
        points: ["Maintenance & updates", "Bug fixes & monitoring", "Iterative improvements"],
      },
    },
  },

  contact: {
    label: "Contact",
    title: { before: "Let's ", highlight: "work together", after: "" } satisfies RichText,
    description:
      "Tell me about your project and I'll reply within 24 hours with next steps, questions and a clear timeline.",
    emailLabel: "Email",
    availableTitle: "Currently available",
    availableText:
      "Working remotely across time zones. Typical reply time is under 24 hours, Monday to Friday.",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@company.com",
      messagePlaceholder: "Tell me about your project, timeline and budget…",
      errors: {
        name: "Please enter your name.",
        emailRequired: "Please enter your email address.",
        emailInvalid: "That email address doesn’t look right.",
        messageRequired: "Please tell me a little about your project.",
        messageShort: "A few more details would help (10 characters minimum).",
      },
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Message sent",
      successText: "Thanks for reaching out. I'll get back to you within 24 hours.",
      sendAnother: "Send another message",
    },
  },

  footer: {
    tagline:
      "building fast, accessible and polished digital products, from the first pixel to production.",
    explore: "Explore",
    connect: "Connect",
    navLabel: "Footer",
    rights: "All rights reserved.",
    madeBy: "Made by T3xture",
    builtWith: "Built with Next.js & Tailwind CSS",
    backToTop: "Back to top",
  },

  notFound: {
    title: "Page not found",
    text: "The page you’re looking for doesn’t exist or has moved.",
    cta: "Back to home",
  },
};

export type Dictionary = typeof en;
