"use client";

import { Icon } from "@/components/Icon";

/** Faithful port of the prototype NOTIFICATIONS view (view-notifications). */
const NOTIFS: { icon: string; text: string; time: string }[] = [
  { icon: "shopping-cart", text: "Nouvelle commande #ef34gh de Pharmacie Cocody (48 000 FCFA).", time: "il y a 2 h" },
  { icon: "alert-triangle", text: "Stock faible : Écouteurs sans fil (3 restants).", time: "il y a 5 h" },
  { icon: "user-plus", text: "Nouveau client ajouté : David Yao.", time: "hier" },
];

export default function NotificationsView() {
  return (
    <section id="view-notifications">
      <div className="panel">
        <div className="panel-head">
          <h3>Centre de notifications</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {NOTIFS.map((n, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                border: "1px solid var(--border-soft)",
                borderRadius: 12,
              }}
            >
              <Icon name={n.icon} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5 }}>{n.text}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
