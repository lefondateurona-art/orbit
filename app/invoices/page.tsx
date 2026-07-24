"use client";

import { useState } from "react";
import { mockInvoices, fmtFCFA, type MockInvoice } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

const STATUS_LABEL: Record<MockInvoice["status"], string> = {
  draft: "Brouillon",
  sent: "Envoyée",
  paid: "Payée",
  overdue: "En retard",
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [creating, setCreating] = useState(false);
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState(0);

  function create(e: React.FormEvent) {
    e.preventDefault();
    setInvoices((prev) => [
      {
        id: `inv-${Date.now()}`,
        number: `ORB-2026-${String(prev.length + 44).padStart(4, "0")}`,
        companyId: "cmp-1",
        clientName,
        amount,
        status: "draft",
        issuedAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setClientName("");
    setAmount(0);
    setCreating(false);
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Factures</h1>
          <p className="text-[13px] text-text-muted mt-1">Création et suivi des factures clients.</p>
        </div>
        <button onClick={() => setCreating((v) => !v)} className="btn btn-primary"><Icon name="plus" size={16} /> Nouvelle facture</button>
      </div>

      {creating && (
        <form onSubmit={create} className="card p-5 mb-6 grid md:grid-cols-3 gap-4 items-end">
          <div className="field"><label>Client</label><input required value={clientName} onChange={(e) => setClientName(e.target.value)} /></div>
          <div className="field"><label>Montant (FCFA)</label><input required type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
          <button type="submit" className="btn btn-primary">Créer</button>
        </form>
      )}

      <div className="card overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-text-muted border-b border-border-soft">
              <th className="px-5 py-3 font-medium">N°</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Montant</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Émise le</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-border-soft last:border-0">
                <td className="px-5 py-3 font-mono text-[12px]">{inv.number}</td>
                <td className="px-5 py-3">{inv.clientName}</td>
                <td className="px-5 py-3 font-bold">{fmtFCFA(inv.amount)}</td>
                <td className="px-5 py-3"><span className="chip">{STATUS_LABEL[inv.status]}</span></td>
                <td className="px-5 py-3 text-text-muted">{inv.issuedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
