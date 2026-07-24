"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockOrders, fmtFCFA, type MockOrder } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

const STATUS_LABEL: Record<MockOrder["status"], string> = {
  pending: "En attente",
  processing: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(mockOrders);
  const [filter, setFilter] = useState<"all" | MockOrder["status"]>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  /**
   * TODO: no real AI backend yet. Completing an order should call a real
   * endpoint that creates an `ai_chats` row (post-commande assistant) via
   * Supabase, then redirect to /ai-chats/[chatId]. For now this is a stub:
   * it flips the order to "completed" and generates a mock AI chat entry
   * client-side before navigating to /ai-chats.
   */
  function completeOrder(order: MockOrder) {
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: "completed" } : o)));
    // Mock response generator — replace with a real AI call.
    const mockAiSummary = `Commande "${order.productName}" livrée à ${order.customerName}. Suggestion : proposer une vente additionnelle liée à ce produit.`;
    window.sessionStorage.setItem(`orbit-ai-stub-${order.id}`, mockAiSummary);
    router.push("/ai-chats");
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Commandes</h1>
          <p className="text-[13px] text-text-muted mt-1">Toutes les entreprises confondues.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto">
        {(["all", "pending", "processing", "completed", "cancelled"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`chip ${filter === s ? "active" : ""}`}>
            {s === "all" ? "Toutes" : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-text-muted border-b border-border-soft">
              <th className="px-5 py-3 font-medium">Produit</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Montant</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-border-soft last:border-0">
                <td className="px-5 py-3 font-semibold">{o.productName}</td>
                <td className="px-5 py-3">{o.customerName}</td>
                <td className="px-5 py-3 font-bold">{fmtFCFA(o.amount)}</td>
                <td className="px-5 py-3"><span className="chip">{STATUS_LABEL[o.status]}</span></td>
                <td className="px-5 py-3 text-text-muted">{o.createdAt}</td>
                <td className="px-5 py-3">
                  {o.status !== "completed" && (
                    <button onClick={() => completeOrder(o)} className="btn btn-primary btn-sm">
                      <Icon name="check" size={14} /> Terminer + Assistant IA
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
