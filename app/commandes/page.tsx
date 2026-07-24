"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import {
  money,
  mockOrbitOrders,
  ORDER_STAGES,
  ORDER_STAGE_LABELS,
  ORDER_STAGE_ICONS,
  type OrbitOrder,
} from "@/lib/mock-data";

/** Faithful port of the prototype COMMANDES view (view-commandes / renderOrders). */
export default function CommandesView() {
  const [orders, setOrders] = useState<OrbitOrder[]>(() =>
    [...mockOrbitOrders].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  );

  const update = (id: string, patch: Partial<OrbitOrder>) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const advance = (o: OrbitOrder) => {
    const i = ORDER_STAGES.indexOf(o.stage);
    if (i < ORDER_STAGES.length - 1) update(o.id, { stage: ORDER_STAGES[i + 1] });
  };

  return (
    <section id="view-commandes">
      <div className="panel">
        <div className="panel-head">
          <h3>Commandes clients</h3>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Nouvelle commande</button>
        </div>
        <p style={{ fontSize: "12.5px", color: "var(--text-muted)", margin: "-6px 0 14px" }}>
          Cliquez sur « Étape suivante » pour faire avancer une commande dans son cycle de vie. Retour et
          annulation restent possibles à tout moment.
        </p>
        <table>
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Client</th>
              <th>Produit</th>
              <th>Qté</th>
              <th style={{ textAlign: "right" }}>Total</th>
              <th>Cycle de la commande</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const i = ORDER_STAGES.indexOf(o.stage);
              const next = !o.cancelled && i < ORDER_STAGES.length - 1 ? ORDER_STAGES[i + 1] : null;
              return (
                <tr key={o.id}>
                  <td className="mono">#{o.id.slice(4, 10)}</td>
                  <td>{o.client}</td>
                  <td>{o.product}</td>
                  <td>{o.qty}</td>
                  <td style={{ textAlign: "right" }}>{money(o.total)}</td>
                  <td>
                    <div className="order-cycle">
                      <span className={`order-stage-pill stage-${o.cancelled ? "annulee" : o.stage}`}>
                        <Icon name={o.cancelled ? "ban" : ORDER_STAGE_ICONS[o.stage]} />{" "}
                        {o.cancelled ? "Annulée" : ORDER_STAGE_LABELS[o.stage]}
                      </span>
                      {next && (
                        <button type="button" className="order-next-btn" onClick={() => advance(o)}>
                          <Icon name="arrow-right" /> Étape suivante : {ORDER_STAGE_LABELS[next]}
                        </button>
                      )}
                      {(o.returned || o.cancelled) && (
                        <div className="order-flags">
                          {o.returned && (
                            <span className="order-flag-tag">
                              <Icon name="rotate" /> Retournée
                            </span>
                          )}
                          {o.cancelled && (
                            <span className="order-flag-tag">
                              <Icon name="ban" /> Annulée
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="report-actions" style={{ flexWrap: "wrap" }}>
                      <button
                        type="button"
                        className={`order-action-btn ${o.returned ? "on" : ""}`}
                        onClick={() => update(o.id, { returned: !o.returned })}
                      >
                        <Icon name="rotate" /> Retour
                      </button>
                      <button
                        type="button"
                        className={`order-action-btn ${o.cancelled ? "on" : ""}`}
                        onClick={() => update(o.id, { cancelled: !o.cancelled })}
                      >
                        <Icon name="ban" /> {o.cancelled ? "Réactiver" : "Annuler"}
                      </button>
                      <button className="icon-btn-sm" title="Télécharger le rapport" aria-label="Rapport">
                        <Icon name="file-download" />
                      </button>
                      <button className="icon-btn-sm whatsapp" title="Relancer via WhatsApp" aria-label="WhatsApp">
                        <Icon name="brand-whatsapp" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
