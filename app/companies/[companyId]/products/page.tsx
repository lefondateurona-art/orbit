"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { mockCompanies, mockProducts, fmtFCFA, type MockProduct } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

export default function ProductsPage() {
  const params = useParams<{ companyId: string }>();
  const company = mockCompanies.find((c) => c.id === params.companyId);
  const [products, setProducts] = useState<MockProduct[]>(
    mockProducts.filter((p) => p.companyId === params.companyId)
  );
  const [editing, setEditing] = useState<MockProduct | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  function openNew() {
    setEditing({
      id: `prd-${Date.now()}`,
      companyId: params.companyId,
      name: "",
      description: "",
      price: 0,
      paymentButton: "both",
    });
    setShowAdvanced(false);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === editing.id);
      return exists ? prev.map((p) => (p.id === editing.id ? editing : p)) : [editing, ...prev];
    });
    setEditing(null);
  }

  function remove(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Produits — {company?.name ?? params.companyId}</h1>
          <p className="text-[13px] text-text-muted mt-1">Configurez vos produits et boutons de paiement.</p>
        </div>
        <button onClick={openNew} className="btn btn-primary"><Icon name="plus" size={16} /> Nouveau produit</button>
      </div>

      {editing && (
        <form onSubmit={save} className="card p-5 mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="field">
              <label>Nom du produit</label>
              <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div className="field">
              <label>Prix (FCFA)</label>
              <input required type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
            </div>
          </div>
          <div className="field">
            <label>Description</label>
            <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <div className="field">
            <label>Bouton de paiement</label>
            <select value={editing.paymentButton} onChange={(e) => setEditing({ ...editing, paymentButton: e.target.value as MockProduct["paymentButton"] })}>
              <option value="wave">Wave uniquement</option>
              <option value="orange_money">Orange Money uniquement</option>
              <option value="both">Wave + Orange Money</option>
            </select>
          </div>

          <button type="button" onClick={() => setShowAdvanced((v) => !v)} className="text-[12.5px] text-violet font-semibold">
            {showAdvanced ? "Masquer les options avancées" : "Afficher les options avancées"}
          </button>
          {showAdvanced && (
            <div className="grid md:grid-cols-2 gap-4 bg-surface rounded-lg2 p-4 border border-border-soft">
              <div className="field">
                <label>Stock limité (optionnel)</label>
                <input
                  type="number"
                  value={editing.advancedOptions?.limitedStock ?? ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      advancedOptions: { ...editing.advancedOptions, limitedStock: Number(e.target.value) || undefined },
                    })
                  }
                />
              </div>
              <label className="flex items-center gap-2 text-[13px] text-text-dim mt-6">
                <input
                  type="checkbox"
                  checked={editing.advancedOptions?.recurring ?? false}
                  onChange={(e) =>
                    setEditing({ ...editing, advancedOptions: { ...editing.advancedOptions, recurring: e.target.checked } })
                  }
                />
                Paiement récurrent (abonnement)
              </label>
            </div>
          )}

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>Annuler</button>
          </div>
        </form>
      )}

      <div className="card">
        {products.length === 0 && <p className="empty-state">Aucun produit pour cette entreprise.</p>}
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between px-5 py-4 border-b border-border-soft last:border-0">
            <div>
              <p className="text-[14px] font-semibold">{p.name}</p>
              <p className="text-[12px] text-text-muted">{p.description}</p>
              <span className="chip mt-1.5">{p.paymentButton === "both" ? "Wave + Orange Money" : p.paymentButton}</span>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-[14px] font-bold">{fmtFCFA(p.price)}</p>
              <button onClick={() => setEditing(p)} className="btn btn-ghost btn-sm">Modifier</button>
              <button onClick={() => remove(p.id)} className="btn btn-danger btn-sm">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
