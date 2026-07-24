"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { money, initials, mockClients, CLIENT_SEGMENT_LABELS, type Segment } from "@/lib/mock-data";

/** Faithful port of the prototype CLIENTS view (view-clients / renderClients). */
const SEGMENTS: { id: "tous" | Segment; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "actif", label: "Actifs" },
  { id: "vip", label: "VIP" },
  { id: "perdu", label: "Perdus" },
  { id: "inactif", label: "Inactifs" },
];

export default function ClientsView() {
  const [seg, setSeg] = useState<"tous" | Segment>("tous");
  const filtered = seg === "tous" ? mockClients : mockClients.filter((c) => c.segment === seg);

  return (
    <section id="view-clients">
      <div className="panel">
        <div className="panel-head">
          <h3>Clients de cette activité</h3>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Ajouter un client</button>
        </div>
        <div className="perf-tabs">
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`perf-tab ${seg === s.id ? "active" : ""}`}
              onClick={() => setSeg(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Total dépensé</th>
              <th>Achats</th>
              <th>Segment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={7}>Aucun client dans ce segment.</td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="avatar-circle" style={{ width: 32, height: 32, fontSize: 12 }}>
                      {initials(c.name)}
                    </div>
                  </td>
                  <td>
                    {c.name}
                    {c.isBestClient && (
                      <>
                        {" "}
                        <Icon name="star" style={{ color: "var(--gold-dark)" }} />
                      </>
                    )}
                  </td>
                  <td className="td-phone">
                    {c.phone ? (
                      <>
                        <span>{c.phone}</span>{" "}
                        <a
                          className="icon-btn-sm whatsapp"
                          href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Contacter sur WhatsApp"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon name="brand-whatsapp" />
                        </a>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{money(c.totalSpent)}</td>
                  <td>{c.totalOrders}</td>
                  <td>
                    <span className={`status-pill segment-${c.segment} on`}>
                      {CLIENT_SEGMENT_LABELS[c.segment]}
                    </span>
                  </td>
                  <td>
                    <button className="icon-btn" title="Voir la fiche" aria-label="Voir la fiche">
                      <Icon name="user-search" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
