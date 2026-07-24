"use client";

import { Icon } from "@/components/Icon";
import { mockTeamMembers } from "@/lib/mock-data";

/** Faithful port of the prototype ÉQUIPE view (view-equipe / renderCollab). */
const ROLES: [string, string, string][] = [
  ["role-directeur", "Directeur", "Accès complet à l'ensemble des modules"],
  ["role-manager", "Manager", "Supervision opérationnelle, ventes, stock, équipe"],
  ["role-commercial", "Commercial", "Ventes, clients, relance"],
  ["role-livreur", "Livreur", "Commandes à livrer, statuts de livraison"],
  ["role-comptable", "Comptable", "Revenus, retraits, rapports financiers"],
  ["role-marketing", "Marketing", "Boutique, campagnes, réseaux sociaux, promotions"],
  ["role-support", "Support", "Fiches client, tickets, historique d'échange"],
];

export default function EquipeView() {
  return (
    <section id="view-equipe">
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="users-group" /> Collaborateurs</h3>
            <p className="desc">
              Invitez des membres de votre équipe et donnez à chacun un rôle précis. Chaque rôle limite
              l&apos;accès aux modules pertinents.
            </p>
          </div>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Inviter un collaborateur</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>E-mail</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockTeamMembers.map((m) => (
              <tr key={m.email}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.role}</td>
                <td><span className="status-pill on">Actif</span></td>
                <td>
                  <button className="icon-btn-sm" title="Gérer" aria-label="Gérer">
                    <Icon name="settings" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Rôles disponibles</h3>
            <p className="desc">Le périmètre d&apos;accès type de chaque rôle.</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Rôle</th>
              <th>Périmètre d&apos;accès typique</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map(([cls, name, scope]) => (
              <tr key={cls}>
                <td><span className={`role-pill ${cls}`}>{name}</span></td>
                <td>{scope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
