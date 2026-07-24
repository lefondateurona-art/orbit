"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import {
  mockDeliveries,
  DELIVERY_STAGES,
  DELIVERY_STATUS_LABELS,
  type Delivery,
} from "@/lib/mock-data";

/** Faithful port of the prototype LIVRAISONS view (view-livraisons / renderDeliveries). */
export default function LivraisonsView() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(() =>
    [...mockDeliveries].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  );
  const update = (id: string, patch: Partial<Delivery>) =>
    setDeliveries((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const advance = (d: Delivery) => {
    const i = DELIVERY_STAGES.indexOf(d.status);
    if (i < DELIVERY_STAGES.length - 1) update(d.id, { status: DELIVERY_STAGES[i + 1], failed: false });
  };

  return (
    <section id="view-livraisons">
      <div className="panel">
        <div className="panel-head">
          <h3>Livraisons</h3>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Nouvelle livraison</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Réf. commande</th>
              <th>Client</th>
              <th>Adresse</th>
              <th>Date prévue</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={6}>Aucune livraison planifiée.</td>
              </tr>
            ) : (
              deliveries.map((d) => {
                const i = DELIVERY_STAGES.indexOf(d.status);
                const next = !d.failed && i < DELIVERY_STAGES.length - 1 ? DELIVERY_STAGES[i + 1] : null;
                return (
                  <tr key={d.id}>
                    <td className="mono">{d.orderRef}</td>
                    <td>{d.client}</td>
                    <td>{d.address}</td>
                    <td>{d.date || "—"}</td>
                    <td>
                      <div className="order-cycle">
                        <span className={`status-pill ${d.failed ? "order-echec" : "order-" + d.status}`}>
                          {d.failed ? "Échec" : DELIVERY_STATUS_LABELS[d.status]}
                        </span>
                        {next && (
                          <button type="button" className="order-next-btn" onClick={() => advance(d)}>
                            <Icon name="arrow-right" /> {DELIVERY_STATUS_LABELS[next]}
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="report-actions" style={{ flexWrap: "wrap" }}>
                        <button
                          type="button"
                          className={`order-action-btn ${d.failed ? "on" : ""}`}
                          onClick={() => update(d.id, { failed: !d.failed })}
                        >
                          <Icon name="alert-triangle" /> {d.failed ? "Réactiver" : "Échec"}
                        </button>
                        <button className="icon-btn-sm" title="Télécharger le rapport" aria-label="Rapport">
                          <Icon name="file-download" />
                        </button>
                        <button className="icon-btn-sm whatsapp" title="Prévenir via WhatsApp" aria-label="WhatsApp">
                          <Icon name="brand-whatsapp" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
