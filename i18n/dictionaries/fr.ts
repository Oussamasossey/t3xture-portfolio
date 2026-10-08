import type { Dictionary } from "./en";

/*   = espace insécable : évite qu'un « ? », « : » ou « » » se retrouve seul en début de ligne. */
export const fr: Dictionary = {
  meta: {
    title: "T3xture | Développeur web, sites et applications web modernes",
    description:
      "Portfolio de T3xture, développeur web qui conçoit des sites et des applications web rapides, accessibles et soignés avec React, Next.js et TypeScript.",
    keywords: [
      "T3xture",
      "développeur web",
      "développeur front-end",
      "développeur Next.js",
      "développeur React",
      "développeur web freelance",
      "portfolio",
    ],
    jobTitle: "Développeur web",
  },

  common: {
    role: "Développeur web",
    skipToContent: "Aller au contenu",
    aka: "alias",
  },

  nav: {
    items: {
      about: "À propos",
      projects: "Projets",
      services: "Services",
      contact: "Contact",
    },
    primaryLabel: "Principale",
    mobileLabel: "Mobile",
    backToTop: "retour en haut",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    cta: "Discutons",
    ctaMobile: "Lancer un projet",
    language: "Langue",
  },

  hero: {
    availability: "Disponible pour des missions freelance",
    headline: {
      lead: "Je conçois",
      words: ["des sites web", "des applications web", "des boutiques en ligne", "des interfaces"],
      tail: "au rendu haut de gamme.",
      fallback: "des expériences numériques",
    },
    description:
      "Développeur web attaché au code propre, au détail soigné et à la performance mesurable. Je transforme vos idées en produits rapides et accessibles que les gens ont vraiment plaisir à utiliser.",
    primaryCta: "Voir mes réalisations",
    secondaryCta: "Me contacter",
    portraitAlt: "Portrait détouré d'Oussama, alias T3xture",
    badge: {
      title: "Apps web modernes",
      lines: ["Code propre", "Meilleure expérience"],
    },
    scroll: "Défiler",
  },

  about: {
    label: "À propos",
    title: {
      before: "Je construis le web avec ",
      highlight: "soin et savoir-faire",
      after: "",
    },
    paragraphs: [
      "Je suis développeur web et je m'attache aux détails que la plupart des gens ne remarquent pas : le timing d'une animation, le rythme d'une échelle typographique, la milliseconde que met un bouton à répondre.",
      "Je conçois des expériences web modernes et performantes, avec un souci du code propre, du design réfléchi et de l'usage réel.",
    ],
    stackTitle: "Stack technique",
    principlesTitle: "Ce que j'apporte à un projet",
    principles: [
      {
        title: "La performance d'abord",
        description:
          "Les Core Web Vitals sont traités comme une fonctionnalité, pas comme un détail de dernière minute.",
      },
      {
        title: "Accessible par défaut",
        description:
          "Balisage sémantique, navigation au clavier et vrais ratios de contraste.",
      },
      {
        title: "Code propre et typé",
        description:
          "Des composants et des patterns que votre équipe peut faire évoluer en toute confiance.",
      },
      {
        title: "Communication claire",
        description: "Livraisons prévisibles, délais honnêtes, zéro boîte noire.",
      },
    ],
    cta: "Un projet en tête ?",
  },

  projects: {
    label: "Projets",
    title: { before: "Réalisations ", highlight: "sélectionnées", after: "" },
    description:
      "Six réalisations récentes, chacune conçue, développée et livrée de A à Z.",
    counter: "études de cas",
    viewDemo: "Voir le projet",
    details: "Détails",
    builtWith: "réalisé avec",
    items: {
      "travel-agency": {
        title: "Agence de voyages",
        client: "Atlas Voyages",
        category: "Plateforme de réservation",
        description:
          "Une expérience de réservation centrée sur la destination, avec de belles images, des filtres intelligents et un parcours de demande fluide.",
        details:
          "Atlas Voyages voulait un site qui vend l'envie de voyager avant de vendre le voyage. J'ai conçu un site vitrine rapide, porté par l'image, avec un catalogue de destinations consultable, un créateur d'itinéraires et un formulaire de demande en plusieurs étapes qui qualifie les prospects avant qu'ils n'arrivent à l'équipe commerciale.",
        features: [
          "Catalogue de destinations avec recherche et filtres",
          "Demande de devis en plusieurs étapes",
          "Pages d'atterrissage optimisées SEO par destination",
          "Contenu localisé, prêt pour de nouveaux marchés",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      restaurant: {
        title: "Restaurant",
        client: "La Table d'Or",
        category: "Site pour la restauration",
        description:
          "Un site de restaurant élégant, qui raconte une histoire, avec menu numérique, réservations et identité portée par le chef.",
        details:
          "La Table d'Or voulait un site à l'image de sa salle : chaleureux, calme et précis. Le projet associe un menu animé à un parcours de réservation, une logique d'horaires d'ouverture et des galeries pensées pour rester légères sur les données mobiles.",
        features: [
          "Menu numérique par catégories avec plats du jour",
          "Formulaire de réservation avec validation",
          "Galerie, histoire et présentation du chef",
          "Balisage « local business » pour les résultats cartographiques",
        ],
        tags: ["React", "Tailwind CSS", "Framer Motion", "Formulaires"],
      },
      "language-school": {
        title: "École de langues",
        client: "Lingua Nova",
        category: "Plateforme éducative",
        description:
          "Un site clair et accueillant pour une école de langues : catalogue de cours, test de niveau et profils des enseignants.",
        details:
          "Lingua Nova avait besoin d'un seul endroit pour présenter des dizaines de cours sans dérouter parents ni élèves. J'ai structuré le contenu par niveaux et par objectifs, ajouté un test de niveau léger et conçu une capture de contacts qui se branche directement sur le CRM de l'école.",
        features: [
          "Catalogue de cours classés par niveau et par objectif",
          "Test de niveau interactif",
          "Profils des enseignants et témoignages",
          "Capture de contacts reliée à un endpoint CRM",
        ],
        tags: ["Next.js", "TypeScript", "SEO", "CMS"],
      },
      "phone-store": {
        title: "Boutique de téléphones",
        client: "PixelPhone",
        category: "Boutique e-commerce",
        description:
          "Une boutique orientée conversion, avec comparateur de produits, blocs promo et tunnel de commande fluide.",
        details:
          "PixelPhone vend des appareils dont les caractéristiques décident de l'achat. La boutique place la comparaison, les variantes de stockage et de couleur et les offres de reprise sous les yeux de l'acheteur, tout en gardant des Core Web Vitals au vert sur des mobiles milieu de gamme, en réseau mobile.",
        features: [
          "Comparateur de produits : caractéristiques et prix",
          "Choix des variantes et états du stock",
          "Sections promo et packs pour les campagnes",
          "Panier prêt pour le paiement",
        ],
        tags: ["Next.js", "E-commerce", "Tailwind CSS", "Performance"],
      },
      kine: {
        title: "Cabinet de kinésithérapie",
        client: "Cabinet Équilibre",
        category: "Site de santé",
        description:
          "Un site de cabinet apaisant et rassurant, avec des pages de soins, une présentation de l'équipe et une prise de rendez-vous simple.",
        details:
          "Cabinet Équilibre voulait que les patients comprennent leurs soins avant même d'appeler. J'ai conçu un site épuré, pensé mobile d'abord, qui explique chaque soin avec des mots simples, présente les thérapeutes et transforme les visites en demandes de rendez-vous grâce à un court formulaire guidé.",
        features: [
          "Pages de soins expliquées simplement",
          "Formulaire de demande de rendez-vous avec validation",
          "Équipe, horaires d'ouverture et carte",
          "Données structurées d'entreprise locale pour la recherche",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
      },
      "car-rental": {
        title: "Location de voitures",
        client: "Safar Cars",
        category: "Site de réservation",
        description:
          "Un site de location rapide, avec un catalogue de véhicules clair, une recherche par dates et une demande de réservation express.",
        details:
          "Safar Cars voulait que les clients trouvent la bonne voiture en quelques secondes. Le site présente la flotte avec des caractéristiques claires et les tarifs journaliers, filtre par catégorie et par dates, et envoie la demande de réservation directement à l'agence, avec un contact WhatsApp à portée de pouce sur mobile.",
        features: [
          "Catalogue de véhicules avec filtres de catégorie et de prix",
          "Recherche par dates de prise en charge et de retour",
          "Demande de réservation avec contact WhatsApp immédiat",
          "Pages rapides, pensées mobile d'abord",
        ],
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Formulaires"],
      },
    },
  },

  services: {
    label: "Services",
    title: { before: "Comment je peux ", highlight: "vous aider", after: "" },
    description:
      "D'une simple page d'atterrissage à la création complète d'un produit : choisissez ce dont vous avez besoin, ou combinez les services.",
    footnote: {
      before: "Vous hésitez sur vos besoins ? ",
      link: "Discutons-en",
      after: ".",
    },
    items: {
      "web-development": {
        title: "Développement web",
        description:
          "Des sites et applications web prêts pour la production, bâtis sur une stack moderne et maintenable.",
        points: [
          "Sites vitrines et pages d'atterrissage",
          "Applications Next.js et React",
          "Code propre et typé",
        ],
      },
      "frontend-engineering": {
        title: "Ingénierie front-end",
        description:
          "Des interfaces au pixel près, avec composants réutilisables, animations et accessibilité irréprochable.",
        points: ["Du design au code", "Bibliothèques de composants", "Balisage conforme WCAG"],
      },
      ecommerce: {
        title: "Boutiques e-commerce",
        description:
          "Des boutiques conçues pour vendre : pages produit rapides, parcours clairs et paiement sans friction.",
        points: [
          "Pages produit et catégories",
          "Panier et tunnel de commande",
          "Intégrations de paiement",
        ],
      },
      "performance-seo": {
        title: "Performance et SEO",
        description:
          "Vitesse et visibilité intégrées dès le départ, pas ajoutées après coup.",
        points: [
          "Optimisation des Core Web Vitals",
          "SEO technique et métadonnées",
          "Balisage Schema",
        ],
      },
      integrations: {
        title: "Intégration d'API et de CMS",
        description:
          "Connectez votre site aux outils que vous utilisez déjà, pour que le contenu reste simple à gérer.",
        points: ["Mise en place d'un CMS headless", "API REST et GraphQL", "Services tiers"],
      },
      support: {
        title: "Suivi et maintenance",
        description:
          "Après le lancement, je veille à la santé du projet : mises à jour, supervision et améliorations continues.",
        points: [
          "Maintenance et mises à jour",
          "Correction de bugs et supervision",
          "Améliorations itératives",
        ],
      },
    },
  },

  contact: {
    label: "Contact",
    title: { before: "Travaillons ", highlight: "ensemble", after: "" },
    description:
      "Parlez-moi de votre projet et je vous réponds sous 24 heures avec les prochaines étapes, mes questions et un calendrier clair.",
    emailLabel: "E-mail",
    availableTitle: "Actuellement disponible",
    availableText:
      "Je travaille à distance, sur tous les fuseaux horaires. Délai de réponse habituel : moins de 24 heures, du lundi au vendredi.",
    form: {
      name: "Nom",
      email: "E-mail",
      message: "Message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "vous@entreprise.com",
      phone: "WhatsApp / Téléphone",
      phoneOptional: "facultatif",
      phonePlaceholder: "+212 6 00 00 00 00",
      phoneHint: "Indiquez l'indicatif de votre pays et je peux vous répondre sur WhatsApp.",
      messagePlaceholder: "Parlez-moi de votre projet, de votre calendrier et de votre budget…",
      errors: {
        name: "Veuillez saisir votre nom.",
        emailRequired: "Veuillez saisir votre adresse e-mail.",
        emailInvalid: "Cette adresse e-mail ne semble pas valide.",
        phoneInvalid: "Entrez un numéro valide avec l'indicatif, par exemple +212 6 00 00 00 00.",
        messageRequired: "Dites-m’en un peu plus sur votre projet.",
        messageShort: "Quelques détails de plus m’aideraient (10 caractères minimum).",
      },
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      successTitle: "Message envoyé",
      successText: "Merci de m'avoir contacté. Je reviens vers vous sous 24 heures.",
      sendAnother: "Envoyer un autre message",
      sendError: "Une erreur est survenue. Réessayez ou écrivez à hello@t3xture.dev.",
    },
  },

  footer: {
    tagline:
      "qui conçoit des produits numériques rapides, accessibles et soignés, du premier pixel à la mise en production.",
    explore: "Explorer",
    connect: "Me suivre",
    navLabel: "Pied de page",
    rights: "Tous droits réservés.",
    madeBy: "Réalisé par T3xture",
    builtWith: "Conçu avec Next.js et Tailwind CSS",
    backToTop: "Haut de page",
  },

  notFound: {
    title: "Page introuvable",
    text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
  },
};
