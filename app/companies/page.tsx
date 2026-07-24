"use client";

import { useState } from "react";
import Link from "next/link";
import { mockCompanies, fmtFCFA } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setCompanies((prev) => [
      {
        id: `cmp-${prev.length + 1}`,
        name,
        sector: "Non renseigné",
        logoInitial: name[0]?.toUpperCase() ?? "?",
        revenue: 0,
        productsCount: 0,
        customersCount: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setName("");
    setCreating(false);
  }

  function handleDelete(id: string) {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Entreprises</h1>
          <p className="text-[13px] text-text-muted mt-1">Gérez toutes vos entités business Orbit.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setCreating((v) => !v)}>
          <Icon name="plus" size={16} /> Nouvelle entreprise
        </button>
      </div>

      {creating && (
        <form onSubmit={handleCreate} className="card p-5 mb-6 flex items-end gap-3 flex-wrap">
          <div className="field flex-1 min-w-[220px]">
            <label>Nom de l&apos;entreprise</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Adama Digital" />
          </div>
          <button type="submit" className="btn btn-primary">Créer</button>
          <button type="button" className="btn btn-ghost" onClick={() => setCreating(false)}>Annuler</button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.length === 0 && <p className="empty-state col-span-full">Aucune entreprise pour le moment.</p>}
        {companies.map((c) => (
          <div key={c.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-lg2 bg-gradient-to-br from-violet to-gold-dark flex items-center justify-center font-display font-bold text-white">
                {c.logoInitial}
              </div>
              <button onClick={() => handleDelete(c.id)} className="text-text-muted hover:text-danger text-[12px]">Supprimer</button>
            </div>
            <Link href={`/companies/${c.id}`}>
              <h3 className="text-[15px] mb-0.5">{c.name}</h3>
              <p className="text-[12px] text-text-muted mb-3">{c.sector}</p>
            </Link>
            <div className="flex justify-between text-[12px] text-text-dim border-t border-border-soft pt-3">
              <span>{fmtFCFA(c.revenue)}</span>
              <span>{c.productsCount} produits</span>
              <span>{c.customersCount} clients</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
