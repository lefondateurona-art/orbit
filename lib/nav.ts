export type NavItem = { href: string; label: string; icon: string };

// Top-level nav, migrated from the prototype's sidebar (`.side-link`).
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Tableau de bord", icon: "dashboard" },
  { href: "/companies", label: "Entreprises", icon: "building" },
  { href: "/orders", label: "Commandes", icon: "package" },
  { href: "/invoices", label: "Factures", icon: "invoice" },
  { href: "/reports", label: "Rapports", icon: "reports" },
  { href: "/affiliation", label: "Affiliation", icon: "affiliate" },
  { href: "/loyalty", label: "Fidélité", icon: "gift" },
  { href: "/milestones", label: "Paliers", icon: "flag" },
  { href: "/ai-chats", label: "Assistant IA", icon: "aichat" },
  { href: "/messages", label: "Messages", icon: "chat" },
  { href: "/team", label: "Équipe", icon: "team" },
  { href: "/audit", label: "Journal d'audit", icon: "audit" },
  { href: "/support", label: "Support", icon: "headset" },
  { href: "/settings", label: "Paramètres", icon: "settings" },
];

// Compact set for the mobile bottom nav.
export const MOBILE_NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Accueil", icon: "dashboard" },
  { href: "/companies", label: "Entreprises", icon: "building" },
  { href: "/orders", label: "Commandes", icon: "package" },
  { href: "/ai-chats", label: "Assistant", icon: "aichat" },
  { href: "/settings", label: "Réglages", icon: "settings" },
];
