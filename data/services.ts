export type ServiceIcon =
  | "code"
  | "palette"
  | "store"
  | "gauge"
  | "layers"
  | "wrench";

export type ServiceId =
  | "web-development"
  | "frontend-engineering"
  | "ecommerce"
  | "performance-seo"
  | "integrations"
  | "support";

/** Language-neutral service data; copy lives in `services.items[id]` of each dictionary. */
export type Service = {
  id: ServiceId;
  icon: ServiceIcon;
};

export const services: Service[] = [
  { id: "web-development", icon: "code" },
  { id: "frontend-engineering", icon: "palette" },
  { id: "ecommerce", icon: "store" },
  { id: "performance-seo", icon: "gauge" },
  { id: "integrations", icon: "layers" },
  { id: "support", icon: "wrench" },
];
