export type NavItem = { href: string; label: string; icon: string };

// Sidebar nav — ported 1:1 from the prototype's `.side-link` list
// (orbit-site (26).html app-shell). `icon` = Tabler name without the "ti-" prefix.
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Accueil", icon: "smart-home" },
  { href: "/ventes", label: "Ventes", icon: "receipt" },
  { href: "/produits", label: "Produits", icon: "package" },
  { href: "/clients", label: "Clients", icon: "users" },
  { href: "/comptabilite", label: "Revenus", icon: "currency-dollar" },
  { href: "/analytiques", label: "Analytiques", icon: "chart-histogram" },
  { href: "/boutique", label: "Boutique", icon: "building-store" },
  { href: "/marketing-ia", label: "Marketing IA", icon: "sparkles" },
  { href: "/messages-ia", label: "Messages IA", icon: "message-chatbot" },
  { href: "/affiliation", label: "Affiliation", icon: "affiliate" },
  { href: "/automatisations", label: "Automatisations", icon: "bolt" },
  { href: "/plus", label: "Plus", icon: "dots-circle-horizontal" },
  { href: "/parametres", label: "Paramètres", icon: "settings" },
];

// Compact set for the mobile bottom nav.
export const MOBILE_NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Accueil", icon: "smart-home" },
  { href: "/ventes", label: "Ventes", icon: "receipt" },
  { href: "/produits", label: "Produits", icon: "package" },
  { href: "/messages-ia", label: "Messages", icon: "message-chatbot" },
  { href: "/plus", label: "Plus", icon: "dots-circle-horizontal" },
];
