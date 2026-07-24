/**
 * TEMPORARY MOCK DATA — used only until Supabase tables are wired up.
 * Replace every usage of these arrays with real Supabase queries once the
 * backend is live (see SETUP_REQUIRED.md). Nothing here is real user data.
 */

export type MockCompany = {
  id: string;
  name: string;
  sector: string;
  logoInitial: string;
  revenue: number;
  productsCount: number;
  customersCount: number;
  createdAt: string;
};

export const mockCompanies: MockCompany[] = [
  { id: "cmp-1", name: "Adama Digital", sector: "E-commerce mode", logoInitial: "A", revenue: 4_820_000, productsCount: 18, customersCount: 342, createdAt: "2025-11-02" },
  { id: "cmp-2", name: "TechHub CI", sector: "Électronique", logoInitial: "T", revenue: 12_450_000, productsCount: 54, customersCount: 890, createdAt: "2025-08-14" },
  { id: "cmp-3", name: "Beauté d'Ébène", sector: "Cosmétiques", logoInitial: "B", revenue: 2_140_000, productsCount: 27, customersCount: 210, createdAt: "2026-01-20" },
];

export type MockProduct = {
  id: string;
  companyId: string;
  name: string;
  description: string;
  price: number;
  paymentButton: "wave" | "orange_money" | "both";
  advancedOptions?: { limitedStock?: number; recurring?: boolean };
};

export const mockProducts: MockProduct[] = [
  { id: "prd-1", companyId: "cmp-1", name: "Coaching business 1:1", description: "Session de 45 min pour structurer votre offre.", price: 25000, paymentButton: "both" },
  { id: "prd-2", companyId: "cmp-1", name: "Pack visuel réseaux sociaux", description: "20 templates prêts à poster.", price: 12000, paymentButton: "wave" },
  { id: "prd-3", companyId: "cmp-2", name: "Écouteurs sans fil Pro", description: "Autonomie 30h, réduction de bruit active.", price: 18500, paymentButton: "orange_money" },
  { id: "prd-4", companyId: "cmp-3", name: "Beurre de karité bio 250g", description: "100% naturel, pressé à froid.", price: 4000, paymentButton: "both" },
];

export type MockOrder = {
  id: string;
  companyId: string;
  customerName: string;
  productName: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
};

export const mockOrders: MockOrder[] = [
  { id: "ord-1", companyId: "cmp-1", customerName: "Awa Diarra", productName: "Coaching business 1:1", amount: 25000, status: "completed", createdAt: "2026-07-20" },
  { id: "ord-2", companyId: "cmp-2", customerName: "Yao Koffi", productName: "Écouteurs sans fil Pro", amount: 18500, status: "processing", createdAt: "2026-07-21" },
  { id: "ord-3", companyId: "cmp-3", customerName: "Fatou N'Guessan", productName: "Beurre de karité bio 250g", amount: 4000, status: "pending", createdAt: "2026-07-22" },
  { id: "ord-4", companyId: "cmp-1", customerName: "Ibrahim Traoré", productName: "Pack visuel réseaux sociaux", amount: 12000, status: "completed", createdAt: "2026-07-18" },
];

export type MockInvoice = {
  id: string;
  number: string;
  companyId: string;
  clientName: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  issuedAt: string;
};

export const mockInvoices: MockInvoice[] = [
  { id: "inv-1", number: "ORB-2026-0041", companyId: "cmp-1", clientName: "Awa Diarra", amount: 25000, status: "paid", issuedAt: "2026-07-20" },
  { id: "inv-2", number: "ORB-2026-0042", companyId: "cmp-2", clientName: "Yao Koffi", amount: 18500, status: "sent", issuedAt: "2026-07-21" },
  { id: "inv-3", number: "ORB-2026-0043", companyId: "cmp-3", clientName: "Fatou N'Guessan", amount: 4000, status: "draft", issuedAt: "2026-07-22" },
];

export type MockAffiliate = {
  code: string;
  clicks: number;
  conversions: number;
  commission: number;
};

export const mockAffiliate: MockAffiliate = { code: "ORBIT-AWA24", clicks: 312, conversions: 24, commission: 96000 };

export type MockAiChat = {
  id: string;
  title: string;
  kind: "post_commande" | "coach";
  createdAt: string;
  orderId?: string;
};

export const mockAiChats: MockAiChat[] = [
  { id: "chat-1", title: "Suivi commande #ord-1", kind: "post_commande", createdAt: "2026-07-20", orderId: "ord-1" },
  { id: "chat-2", title: "Rapport marketing — Juillet", kind: "coach", createdAt: "2026-07-15" },
];

export type MockMilestone = {
  id: string;
  label: string;
  threshold: number;
  progress: number;
  sealed: boolean;
};

export const mockMilestones: MockMilestone[] = [
  { id: "ms-1", label: "100 ventes cumulées", threshold: 100, progress: 100, sealed: true },
  { id: "ms-2", label: "1 000 000 FCFA de revenu", threshold: 1_000_000, progress: 640000, sealed: false },
  { id: "ms-3", label: "500 abonnés boutique", threshold: 500, progress: 210, sealed: false },
];

export const mockTeam = [
  { id: "tm-1", name: "Awa Diarra", role: "owner", email: "awa@example.com" },
  { id: "tm-2", name: "Yao Koffi", role: "manager", email: "yao@example.com" },
];

export const mockAuditLog = [
  { id: "al-1", actor: "Awa Diarra", action: "created", entity: "Produit — Coaching business 1:1", at: "2026-07-19 14:02" },
  { id: "al-2", actor: "Yao Koffi", action: "updated", entity: "Commande #ord-2", at: "2026-07-21 09:41" },
];

export const mockPricingPlans = [
  { id: "starter", name: "Starter", price: 5000, period: "mois", features: ["1 boutique", "Jusqu'à 30 produits", "Support standard"] },
  { id: "pro", name: "Pro", price: 15000, period: "mois", features: ["3 boutiques", "Produits illimités", "Assistant IA", "Support prioritaire"], highlighted: true },
  { id: "scale", name: "Scale", price: 35000, period: "mois", features: ["Entreprises illimitées", "Équipe & rôles", "Rapports avancés", "Support dédié"] },
];

export function fmtFCFA(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function fmtCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}
