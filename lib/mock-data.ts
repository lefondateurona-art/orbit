/**
 * TEMPORARY MOCK DATA for Orbit — used only until Supabase is wired.
 * Shapes/formatters mirror the prototype (orbit-site (26).html) so views
 * render 1:1. Replace with real Supabase queries later.
 */

export function money(n: number): string {
  return Number(n || 0).toLocaleString("fr-FR") + " FCFA";
}
export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("fr-FR") +
    " " +
    d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  );
}

export type Sale = {
  id: string;
  description: string;
  client: string;
  amount: number;
  createdAt: string;
};
export type Expense = {
  id: string;
  category: string;
  description: string;
  amount: number;
  createdAt: string;
};
export type Segment = "actif" | "vip" | "perdu" | "inactif";
export type Client = {
  id: string;
  name: string;
  phone: string;
  totalSpent: number;
  totalOrders: number;
  segment: Segment;
  isBestClient?: boolean;
};
export const CLIENT_SEGMENT_LABELS: Record<Segment, string> = {
  actif: "Actif",
  vip: "VIP",
  perdu: "Perdu",
  inactif: "Inactif",
};
export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const today = new Date();
const iso = (daysAgo: number, h = 10) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
};

export const mockSales: Sale[] = [
  { id: "s1", description: "Robe wax — pièce unique", client: "Aminata Koné", amount: 25000, createdAt: iso(0, 9) },
  { id: "s2", description: "Lot écouteurs x3", client: "Serge Kouassi", amount: 37500, createdAt: iso(0, 14) },
  { id: "s3", description: "Beurre de karité (grossiste)", client: "Pharmacie Cocody", amount: 48000, createdAt: iso(1, 11) },
  { id: "s4", description: "Sneakers unisexe", client: "David Yao", amount: 22000, createdAt: iso(2, 16) },
  { id: "s5", description: "Ensemble pagne moderne", client: "Grace Bamba", amount: 22000, createdAt: iso(3, 10) },
  { id: "s6", description: "Montre connectée", client: "Ibrahim Touré", amount: 28000, createdAt: iso(5, 15) },
];
export const mockExpenses: Expense[] = [
  { id: "e1", category: "Approvisionnement", description: "Réassort tissu wax", amount: 40000, createdAt: iso(1, 8) },
  { id: "e2", category: "Logistique", description: "Transport livraison", amount: 6000, createdAt: iso(2, 18) },
  { id: "e3", category: "Frais bancaires", description: "Frais Mobile Money", amount: 2500, createdAt: iso(3, 12) },
];
export const mockClients: Client[] = [
  { id: "c1", name: "Aminata Koné", phone: "+225 07 01 02 03", totalSpent: 125000, totalOrders: 6, segment: "vip", isBestClient: true },
  { id: "c2", name: "Serge Kouassi", phone: "+225 05 44 55 66", totalSpent: 37500, totalOrders: 2, segment: "actif" },
  { id: "c3", name: "Pharmacie Cocody", phone: "+225 27 22 00 11", totalSpent: 96000, totalOrders: 4, segment: "vip" },
  { id: "c4", name: "David Yao", phone: "+225 01 88 99 00", totalSpent: 22000, totalOrders: 1, segment: "actif" },
  { id: "c5", name: "Grace Bamba", phone: "+225 07 33 22 11", totalSpent: 8000, totalOrders: 1, segment: "inactif" },
  { id: "c6", name: "Ibrahim Touré", phone: "+225 05 12 34 56", totalSpent: 28000, totalOrders: 1, segment: "perdu" },
];

/* ---- Suppliers ---- */
export type Supplier = { id: string; name: string; phone: string; products: string; note: string };
export const mockSuppliers: Supplier[] = [
  { id: "sup1", name: "Wax Import CI", phone: "+225 27 20 30 40", products: "Tissus wax, pagnes", note: "Délai 3j" },
  { id: "sup2", name: "TechGros Abidjan", phone: "+225 05 66 77 88", products: "Écouteurs, accessoires", note: "Grossiste" },
  { id: "sup3", name: "Karité Nature", phone: "+225 07 44 55 22", products: "Beurre de karité brut", note: "Bio certifié" },
];

/* ---- Products (catalogue / inventory) ---- */
export type OrbitProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  featured?: boolean;
};
export const orbitProducts: OrbitProduct[] = [
  { id: "op1", name: "Robe wax imprimée", category: "Mode femme", price: 15000, stock: 24, featured: true },
  { id: "op2", name: "Ensemble pagne moderne", category: "Mode femme", price: 22000, stock: 8 },
  { id: "op3", name: "Écouteurs sans fil", category: "Électronique", price: 12500, stock: 3 },
  { id: "op4", name: "Montre connectée", category: "Électronique", price: 28000, stock: 0 },
  { id: "op5", name: "Beurre de karité bio", category: "Cosmétiques", price: 4000, stock: 60, featured: true },
];
export function productAvailability(p: OrbitProduct): { key: "available" | "unavailable"; label: string } {
  return p.stock > 0 ? { key: "available", label: "Disponible" } : { key: "unavailable", label: "Non disponible" };
}
export function stockStatus(p: OrbitProduct): { key: "stock-ok" | "stock-low"; label: string } {
  return p.stock > 0 && p.stock <= 5 ? { key: "stock-low", label: "Stock faible" } : { key: "stock-ok", label: "" };
}

/* ---- Sale status (used by Ventes view) ---- */
export type SaleStatus = { validated: boolean; collected: boolean; delivered: boolean };
export const saleStatusOf: Record<string, SaleStatus> = {
  s1: { validated: true, collected: true, delivered: true },
  s2: { validated: true, collected: false, delivered: false },
  s3: { validated: true, collected: true, delivered: false },
  s4: { validated: false, collected: false, delivered: false },
  s5: { validated: true, collected: true, delivered: true },
  s6: { validated: false, collected: false, delivered: false },
};

export const totalCA = mockSales.reduce((s, x) => s + x.amount, 0);
export const totalDep = mockExpenses.reduce((s, x) => s + x.amount, 0);
export const totalBenef = totalCA - totalDep;

export const mockGoals = { daily: 60000, weekly: 300000, monthly: 1200000, yearly: 12000000 };

/* ---- Orders (lifecycle) ---- */
export const ORDER_STAGES = ["creee", "payee", "livraison", "livree", "encaissee"] as const;
export type OrderStage = (typeof ORDER_STAGES)[number];
export const ORDER_STAGE_LABELS: Record<OrderStage, string> = {
  creee: "Commande créée",
  payee: "Payée",
  livraison: "En livraison",
  livree: "Livrée",
  encaissee: "Encaissée",
};
export const ORDER_STAGE_ICONS: Record<OrderStage, string> = {
  creee: "clipboard-list",
  payee: "credit-card",
  livraison: "truck-delivery",
  livree: "package",
  encaissee: "cash",
};
export type OrbitOrder = {
  id: string;
  client: string;
  product: string;
  qty: number;
  total: number;
  stage: OrderStage;
  returned: boolean;
  cancelled: boolean;
  createdAt: string;
};
export const mockOrbitOrders: OrbitOrder[] = [
  { id: "ord_ab12cd", client: "Aminata Koné", product: "Robe wax imprimée", qty: 2, total: 30000, stage: "encaissee", returned: false, cancelled: false, createdAt: iso(0, 9) },
  { id: "ord_ef34gh", client: "Pharmacie Cocody", product: "Beurre de karité bio", qty: 12, total: 48000, stage: "livraison", returned: false, cancelled: false, createdAt: iso(1, 11) },
  { id: "ord_ij56kl", client: "David Yao", product: "Sneakers unisexe", qty: 1, total: 22000, stage: "payee", returned: false, cancelled: false, createdAt: iso(2, 16) },
  { id: "ord_mn78op", client: "Grace Bamba", product: "Ensemble pagne moderne", qty: 1, total: 22000, stage: "creee", returned: false, cancelled: false, createdAt: iso(3, 10) },
];

/* ---- Deliveries ---- */
export const DELIVERY_STAGES = ["attente", "cours", "livre"] as const;
export type DeliveryStage = (typeof DELIVERY_STAGES)[number];
export const DELIVERY_STATUS_LABELS: Record<DeliveryStage, string> = {
  attente: "À planifier",
  cours: "En cours",
  livre: "Livrée",
};
export type Delivery = {
  id: string;
  orderRef: string;
  client: string;
  address: string;
  date: string;
  status: DeliveryStage;
  failed: boolean;
  createdAt: string;
};
export const mockDeliveries: Delivery[] = [
  { id: "d1", orderRef: "#ef34gh", client: "Pharmacie Cocody", address: "Cocody, Riviera 3", date: "2026-07-25", status: "cours", failed: false, createdAt: iso(1, 12) },
  { id: "d2", orderRef: "#ij56kl", client: "David Yao", address: "Yopougon, Selmer", date: "2026-07-26", status: "attente", failed: false, createdAt: iso(2, 17) },
];

/* ---- Shop themes (Boutique config) ---- */
export type ShopTheme = { key: string; name: string; tag: string; free: boolean; desc: string };
export const SHOP_THEMES: ShopTheme[] = [
  { key: "flow", name: "Flow", tag: "Gratuit", free: true, desc: "Simple, coloré, rapide à mettre en place. Idéal pour démarrer." },
  { key: "premium", name: "Premium", tag: "Gratuit", free: true, desc: "Plus aéré, cartes arrondies, mise en avant produit soignée." },
  { key: "pro", name: "Pro", tag: "Payant", free: false, desc: "Design sombre et raffiné, typographie élégante, détails dorés." },
];
export const SHOP_FONTS: { value: string; label: string }[] = [
  { value: "grotesk", label: "Space Grotesk (moderne)" },
  { value: "inter", label: "Inter (neutre, très lisible)" },
  { value: "poppins", label: "Poppins (rond, chaleureux)" },
  { value: "montserrat", label: "Montserrat (élégant, pro)" },
  { value: "outfit", label: "Outfit (épuré, tendance)" },
  { value: "nunito", label: "Nunito (doux, accessible)" },
  { value: "playfair", label: "Playfair Display (luxe, haut de gamme)" },
  { value: "fraunces", label: "Fraunces (artisanal, chic)" },
  { value: "serif", label: "Serif classique" },
  { value: "mono", label: "Mono (technique)" },
];
export const mockChannels: [string, number][] = [
  ["WhatsApp", 42],
  ["Facebook", 18],
  ["Instagram", 27],
  ["TikTok", 11],
  ["Lien direct", 63],
];

/* ---- Analytics ---- */
export const mockMonthly: { month: string; ca: number; dep: number }[] = [
  { month: "Fév", ca: 640000, dep: 210000 },
  { month: "Mar", ca: 720000, dep: 245000 },
  { month: "Avr", ca: 810000, dep: 260000 },
  { month: "Mai", ca: 690000, dep: 230000 },
  { month: "Juin", ca: 940000, dep: 300000 },
  { month: "Juil", ca: 1120000, dep: 340000 },
];
export const mockTopProducts: { name: string; qty: number; ca: number }[] = [
  { name: "Robe wax imprimée", qty: 48, ca: 720000 },
  { name: "Beurre de karité bio", qty: 160, ca: 640000 },
  { name: "Montre connectée", qty: 18, ca: 504000 },
  { name: "Écouteurs sans fil", qty: 32, ca: 400000 },
];
export const mockAnalytics = { growth: 19, panier: 26400, newClients: 12, fidelite: 42 };

/* ---- Affiliation ---- */
export const mockAffiliateInfo = { code: "ORBIT-ELIJAH", count: 3, commission: 34500 };
export const mockReferrals: { name: string; date: string; plan: string; commission: number }[] = [
  { name: "Atelier Kadi", date: "2026-06-12", plan: "Pro", commission: 12000 },
  { name: "Chez Fatou", date: "2026-06-28", plan: "Pro", commission: 12000 },
  { name: "Nova Distribution", date: "2026-07-10", plan: "Découverte", commission: 10500 },
];

/* ---- Comptabilité (pockets / repartition / retraits) ---- */
export const mockPockets: { name: string; pct: number; allocated: number; withdrawn: number }[] = [
  { name: "Compte courant", pct: 35, allocated: 63875, withdrawn: 40000 },
  { name: "Réinvestissement", pct: 30, allocated: 54750, withdrawn: 0 },
  { name: "Épargne", pct: 20, allocated: 36500, withdrawn: 0 },
  { name: "Provision (impôts)", pct: 10, allocated: 18250, withdrawn: 0 },
  { name: "Réserve", pct: 5, allocated: 9125, withdrawn: 0 },
];
export const mockRetraits: { date: string; source: string; method: string; amount: number }[] = [
  { date: "2026-07-22", source: "Compte courant", method: "Wave", amount: 40000 },
];

/* ---- Messages IA (aichats) ---- */
export const mockAiChats: {
  client: string;
  phone: string;
  channel: string;
  last: string;
  date: string;
}[] = [
  { client: "Aminata Koné", phone: "+225 07 01 02 03", channel: "Après commande", last: "Merci, à quelle heure la livraison ?", date: "2026-07-24 14:12" },
  { client: "Visiteur boutique", phone: "—", channel: "Discussion libre", last: "Vous livrez à Bouaké ?", date: "2026-07-23 19:40" },
];

/* ---- Équipe ---- */
export const mockTeamMembers: { name: string; email: string; role: string }[] = [
  { name: "Elijah K.", email: "elijah@email.com", role: "Propriétaire" },
  { name: "Fatou S.", email: "fatou@email.com", role: "Vendeuse" },
];

/* ---- Moyens de paiement ---- */
export const mockPayMethods: { id: string; label: string; on: boolean }[] = [
  { id: "orange", label: "Orange Money", on: true },
  { id: "wave", label: "Wave", on: true },
  { id: "mtn", label: "MTN Money", on: false },
  { id: "moov", label: "Moov Money", on: false },
  { id: "card", label: "Carte bancaire", on: false },
];

/* ---- IA Business Coach feed ---- */
export const mockCoachFeed: { icon: string; tone: string; title: string; body: string }[] = [
  { icon: "trending-up", tone: "good", title: "Votre CA progresse", body: "Vos ventes ont augmenté de 19 % ce mois-ci. Continuez à mettre en avant la Robe wax, votre meilleure vente." },
  { icon: "alert-triangle", tone: "warn", title: "Stock à surveiller", body: "Les Écouteurs sans fil passent sous le seuil d'alerte (3 restants). Pensez à réapprovisionner chez TechGros." },
  { icon: "bulb", tone: "info", title: "Conseil marketing", body: "Vos clients VIP représentent 42 % du CA. Un message WhatsApp personnalisé pourrait déclencher un 2ᵉ achat." },
];

/* ---- Public shop (storefront) ---- */
export const mockPublicShop = {
  slug: "ma-boutique",
  name: "Chez Fatou",
  link: "orbit.app/s/ma-boutique",
  desc: "Chez Fatou, votre boutique de mode et beauté à Abidjan depuis 2019. Pièces wax, cosmétiques naturels et accessoires — livraison rapide dans toute la ville.",
  about: "Fondée en 2019 à Cocody, Chez Fatou met en avant l'artisanat et les produits locaux de Côte d'Ivoire. Notre mission : rendre la mode et la beauté made in CI accessibles, avec un service client de proximité.",
  testimonials: [
    { name: "Aminata K.", rating: 5, text: "Livraison rapide et produits de qualité. Je recommande à 100 % !" },
    { name: "Serge K.", rating: 5, text: "Très bon accueil sur WhatsApp, commande reçue en 24h." },
    { name: "Grace B.", rating: 4, text: "Belle boutique, les tissus wax sont superbes." },
  ],
  collections: ["Nouveautés", "Mode femme", "Cosmétiques", "Promotions"],
};

/* ---- Invoices ---- */
export type OrbitInvoice = { id: string; client: string; date: string; amount: number };
export const mockOrbitInvoices: OrbitInvoice[] = [
  { id: "FA-2026-001", client: "Pharmacie Cocody", date: "2026-07-18", amount: 48000 },
  { id: "FA-2026-002", client: "Aminata Koné", date: "2026-07-20", amount: 30000 },
];

/* ============================================================================
 * LEGACY COMPAT SHIM — the previous session created diverged routes
 * (orders, companies, invoices, reports, team, affiliation, ai-chats, audit,
 * milestones, pricing, s/[shopSlug]) that don't match the Orbit prototype.
 * They are no longer in the sidebar and are being replaced by the real
 * prototype views (ventes, produits, clients, comptabilite, boutique,
 * marketing-ia, messages-ia, automatisations, plus, parametres, public shop).
 * These loosely-typed stubs keep those orphaned pages compiling until removed.
 * Do NOT build new features on these.
 * ========================================================================== */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function fmtFCFA(n: number): string {
  return `${Number(n || 0).toLocaleString("fr-FR")} FCFA`;
}
export type MockOrder = any;
export type MockInvoice = any;
export type MockProduct = any;
export const mockCompanies: any[] = [
  { id: "c-adama", name: "Adama Mode", slug: "adama-mode", sector: "Mode", revenue: 1200000, products: 12, theme: "default", font: "Inter", presentationVideoUrl: "" },
];
export const mockProducts: any[] = [
  { id: "p1", companyId: "c-adama", name: "Robe wax imprimée", price: 15000, stock: 24, category: "Mode femme" },
];
export const mockOrders: any[] = [
  { id: "o1", company: "Adama Mode", client: "Aminata Koné", amount: 25000, status: "completed", date: "2026-07-20" },
];
export const mockInvoices: any[] = [
  { id: "INV-001", client: "Pharmacie Cocody", amount: 48000, status: "paid", date: "2026-07-18" },
];
export const mockTeam: any[] = [
  { id: "t1", name: "Elijah K.", email: "elijah@email.com", role: "Propriétaire" },
];
export const mockAffiliate: any = { code: "ORBIT-ELIJAH", clicks: 0, signups: 0, conversions: 0, commission: 0, earnings: 0, referrals: [] };
export const mockAuditLog: any[] = [];
export const mockMilestones: any[] = [];
export const mockPricingPlans: any[] = [
  { id: "decouverte", name: "Découverte", price: 0, features: ["Essai gratuit 24h"] },
  { id: "pro", name: "Pro", price: 9900, features: ["Comptabilité OHADA", "Multi-points de vente"] },
];
