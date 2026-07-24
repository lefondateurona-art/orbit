"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";

/** Faithful port of the prototype PLUS view (view-plus). Grid of secondary tools. */
const CARDS: { href: string; icon: string; title: string; sub: string }[] = [
  { href: "/commandes", icon: "clipboard-list", title: "Commandes", sub: "Suivre les commandes clients" },
  { href: "/livraisons", icon: "truck", title: "Livraisons", sub: "Planifier vos livraisons" },
  { href: "/fournisseurs", icon: "truck-delivery", title: "Fournisseurs", sub: "Gérer vos fournisseurs" },
  { href: "/depenses", icon: "wallet", title: "Dépenses", sub: "Historique des sorties d'argent" },
  { href: "/notifications", icon: "bell", title: "Notifications", sub: "Centre de notifications" },
  { href: "/equipe", icon: "users-group", title: "Équipe", sub: "Collaborateurs et rôles" },
  { href: "/rapports", icon: "report", title: "Rapports", sub: "Exports financiers, ventes, boutique" },
  { href: "/factures", icon: "file-invoice", title: "Factures", sub: "Facturation de vos grosses commandes" },
  { href: "/legal", icon: "file-text", title: "Documents & conditions", sub: "CGU et politique de relance" },
];

export default function PlusView() {
  return (
    <section id="view-plus">
      <div className="panel">
        <div className="panel-head">
          <h3>Autres outils de gestion</h3>
        </div>
        <div className="more-grid">
          {CARDS.map((c) => (
            <Link className="more-card" href={c.href} key={c.href}>
              <Icon name={c.icon} />
              <h4>{c.title}</h4>
              <p>{c.sub}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
