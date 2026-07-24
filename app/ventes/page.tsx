"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { money, fmtDate, mockSales, mockClients, saleStatusOf, type SaleStatus } from "@/lib/mock-data";

/** Faithful port of the prototype VENTES view (view-ventes / renderVentes). */
export default function VentesView() {
  const [status, setStatus] = useState<Record<string, SaleStatus>>(() =>
    JSON.parse(JSON.stringify(saleStatusOf))
  );
  const sales = [...mockSales].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  const toggle = (id: string, key: keyof SaleStatus) =>
    setStatus((prev) => ({ ...prev, [id]: { ...prev[id], [key]: !prev[id][key] } }));

  const clientName = (c: string) => mockClients.find((x) => x.name === c)?.name ?? c;

  return (
    <section id="view-ventes">
      <div className="panel">
        <div className="panel-head">
          <h3>Historique des ventes</h3>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Nouvelle vente</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Client</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Montant</th>
              <th>Statuts</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => {
              const st = status[s.id] ?? { validated: false, collected: false, delivered: false };
              return (
                <tr key={s.id}>
                  <td>{s.description || "—"}</td>
                  <td>{clientName(s.client)}</td>
                  <td>{fmtDate(s.createdAt)}</td>
                  <td style={{ textAlign: "right" }} className="tag-pos">
                    {money(s.amount)}
                  </td>
                  <td>
                    <div className="status-pills">
                      <button
                        type="button"
                        className={`status-pill ${st.validated ? "on" : ""}`}
                        onClick={() => toggle(s.id, "validated")}
                      >
                        <Icon name="check" /> {st.validated ? "Validée" : "Non validée"}
                      </button>
                      <button
                        type="button"
                        className={`status-pill ${st.collected ? "on" : ""}`}
                        onClick={() => toggle(s.id, "collected")}
                      >
                        <Icon name="cash" /> {st.collected ? "Encaissée" : "Non encaissée"}
                      </button>
                      <button
                        type="button"
                        className={`status-pill ${st.delivered ? "on" : ""}`}
                        onClick={() => toggle(s.id, "delivered")}
                      >
                        <Icon name="truck-delivery" /> {st.delivered ? "Livrée" : "Non livrée"}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="report-actions">
                      <button className="icon-btn-sm" title="Télécharger le rapport de vente" aria-label="Rapport">
                        <Icon name="file-download" />
                      </button>
                      <button className="icon-btn-sm whatsapp" title="Encaisser via WhatsApp" aria-label="WhatsApp">
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
