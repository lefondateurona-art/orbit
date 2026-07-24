"use client";

import { useState } from "react";
import { mockAiChats } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

/**
 * TODO(real-AI): no real AI backend is wired up yet. `generateMockAiReport`
 * stands in for a call to an LLM endpoint. Replace with a real request
 * (e.g. a Supabase Edge Function or a route handler calling an LLM API)
 * that reads recent orders/sales for the company and returns structured
 * insights, then persist the exchange into `ai_chats` / `ai_messages`.
 */
function generateMockAiReport(kind: "post_commande" | "coach") {
  if (kind === "post_commande") {
    return {
      summary: "Commande livrée avec succès. Client satisfait selon l'historique d'achat.",
      recommendations: [
        "Proposer un produit complémentaire par message privé",
        "Demander un avis client 48h après livraison",
        "Ajouter ce client à votre segment fidélité",
      ],
    };
  }
  return {
    summary: "Vos ventes ont progressé de 12% ce mois-ci, portées par 2 produits phares.",
    recommendations: [
      "Concentrer le budget pub sur les produits les plus rentables",
      "Lancer une offre groupée pour augmenter le panier moyen",
      "Relancer les clients inactifs depuis 30 jours",
    ],
  };
}

export default function AiChatsPage() {
  const [selected, setSelected] = useState(mockAiChats[0]?.id ?? null);
  const chat = mockAiChats.find((c) => c.id === selected);
  const report = chat ? generateMockAiReport(chat.kind) : null;

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Assistant IA</h1>
          <p className="text-[13px] text-text-muted mt-1">Rapports post-commande et coach business/marketing.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        <div className="card p-3">
          {mockAiChats.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg2 mb-1 ${selected === c.id ? "bg-violet-soft text-violet" : "hover:bg-surface"}`}
            >
              <p className="text-[13px] font-semibold">{c.title}</p>
              <p className="text-[11px] text-text-muted">{c.createdAt}</p>
            </button>
          ))}
        </div>

        <div className="card p-6">
          {!chat && <p className="empty-state">Sélectionnez une conversation.</p>}
          {chat && report && (
            <>
              <div className="mia-head">
                <div className="mh-thumb"><Icon name="aichat" size={24} /></div>
                <div>
                  <h4>{chat.title}</h4>
                  <p>{chat.kind === "post_commande" ? "Rapport post-commande" : "Coach business & marketing"}</p>
                </div>
              </div>

              <div className="mia-grid">
                <div className="mia-card full">
                  <h5><Icon name="check" size={15} /> Résumé</h5>
                  <p>{report.summary}</p>
                </div>
                <div className="mia-card full">
                  <h5><Icon name="arrow" size={15} /> Recommandations</h5>
                  <ul>
                    {report.recommendations.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </div>
              </div>
              <p className="text-[11px] text-text-muted mt-2">
                TODO : ce rapport est généré par un mock local (lib/mock-data / generateMockAiReport).
                À remplacer par un vrai appel IA une fois le backend branché.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
