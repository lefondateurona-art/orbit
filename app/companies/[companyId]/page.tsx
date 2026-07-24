"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mockCompanies, mockProducts, mockOrders, fmtFCFA } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

const TABS = [
  { id: "produits", label: "Produits" },
  { id: "analytique", label: "Analytique" },
  { id: "affiliation", label: "Affiliation" },
  { id: "clients", label: "Clients" },
  { id: "revenus", label: "Revenus" },
] as const;

export default function CompanyDetailPage() {
  const params = useParams<{ companyId: string }>();
  const company = mockCompanies.find((c) => c.id === params.companyId);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("produits");

  if (!company) {
    return <p className="empty-state">Entreprise introuvable.</p>;
  }

  const products = mockProducts.filter((p) => p.companyId === company.id);
  const orders = mockOrders.filter((o) => o.companyId === company.id);

  return (
    <div>
      <div className="topbar">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg2 bg-gradient-to-br from-violet to-gold-dark flex items-center justify-center font-display font-bold text-white text-lg">
            {company.logoInitial}
          </div>
          <div>
            <h1 className="text-[20px]">{company.name}</h1>
            <p className="text-[13px] text-text-muted">{company.sector}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/companies/${company.id}/products`} className="btn btn-ghost btn-sm">Gérer les produits</Link>
          <Link href={`/companies/${company.id}/shop-settings`} className="btn btn-primary btn-sm">Paramètres boutique</Link>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`chip ${tab === t.id ? "active" : ""}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "produits" && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px]">Produits ({products.length})</h3>
            <Link href={`/companies/${company.id}/products`} className="btn btn-primary btn-sm">
              <Icon name="plus" size={14} /> Ajouter
            </Link>
          </div>
          <div className="space-y-2">
            {products.length === 0 && <p className="empty-state">Aucun produit.</p>}
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-border-soft last:border-0">
                <div>
                  <p className="text-[13.5px] font-semibold">{p.name}</p>
                  <p className="text-[12px] text-text-muted">{p.description}</p>
                </div>
                <p className="text-[13.5px] font-bold">{fmtFCFA(p.price)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "analytique" && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Vues boutique (30j)</p><p className="font-display text-[22px] font-bold">4 210</p></div>
          <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Taux de conversion</p><p className="font-display text-[22px] font-bold">3.8%</p></div>
          <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Panier moyen</p><p className="font-display text-[22px] font-bold">{fmtFCFA(14200)}</p></div>
        </div>
      )}

      {tab === "affiliation" && (
        <div className="card p-5">
          <p className="text-[13.5px] text-text-dim">Voir la page <Link href="/affiliation" className="text-violet font-semibold">Affiliation</Link> pour générer un lien et suivre les commissions de cette entreprise.</p>
        </div>
      )}

      {tab === "clients" && (
        <div className="card p-5">
          <p className="text-[13.5px] text-text-dim">{company.customersCount} clients au total.</p>
        </div>
      )}

      {tab === "revenus" && (
        <div className="card p-5">
          <p className="font-display text-[26px] font-bold mb-2">{fmtFCFA(company.revenue)}</p>
          <p className="text-[13px] text-text-muted mb-4">Revenu cumulé</p>
          <div className="space-y-2">
            {orders.map((o) => (
              <div key={o.id} className="flex justify-between text-[13px] border-b border-border-soft py-2 last:border-0">
                <span>{o.productName}</span>
                <span className="font-semibold">{fmtFCFA(o.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
