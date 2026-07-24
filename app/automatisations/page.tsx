"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

/** Faithful port of the prototype AUTOMATISATIONS view (view-automatisations). */
const ROWS: { id: string; icon: string; title: string; sub: string; on: boolean }[] = [
  { id: "relance", icon: "bell-ringing", title: "Relance automatique des impayés", sub: "Envoie un rappel WhatsApp automatique à un client dont la facture n'est pas réglée après 48h.", on: false },
  { id: "stock", icon: "alert-triangle", title: "Alerte de rupture de stock", sub: "Notifie automatiquement quand un produit passe sous son seuil d'alerte.", on: true },
  { id: "report", icon: "file-invoice", title: "Rapport hebdomadaire automatique", sub: "Recevez chaque lundi un résumé de vos ventes, dépenses et bénéfices par e-mail.", on: false },
  { id: "welcome", icon: "message-circle", title: "Message de bienvenue automatique", sub: "Envoie un message WhatsApp de bienvenue à chaque nouveau client ajouté.", on: false },
];

export default function AutomatisationsView() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(ROWS.map((r) => [r.id, r.on]))
  );
  return (
    <section id="view-automatisations">
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="bolt" /> Automatisations disponibles</h3>
            <p className="desc">
              Activez ces automatisations pour gagner du temps — aucune configuration technique requise.
            </p>
          </div>
        </div>
        {ROWS.map((r) => (
          <div className="automation-row" key={r.id}>
            <div className="automation-info">
              <Icon name={r.icon} />
              <div>
                <h4>{r.title}</h4>
                <p>{r.sub}</p>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={state[r.id]}
                onChange={() => setState((s) => ({ ...s, [r.id]: !s[r.id] }))}
              />
              <span className="slider" />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
