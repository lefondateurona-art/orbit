"use client";

import { Icon } from "@/components/Icon";

/** Faithful port of the prototype RAPPORTS view (view-rapports / renderReportHistory). */
export default function RapportsView() {
  return (
    <section id="view-rapports">
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="report" /> Générer un rapport</h3>
            <p className="desc">Exportez vos données sur la période de votre choix, au format CSV (compatible Excel).</p>
          </div>
        </div>
        <div className="settings-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "end" }}>
          <div className="form-group">
            <label>Type de rapport</label>
            <select>
              <option value="financier">Rapport financier</option>
              <option value="ventes">Rapport de ventes</option>
              <option value="boutique">Rapport boutique (visiteurs)</option>
              <option value="publicitaire">Rapport publicitaire</option>
            </select>
          </div>
          <div className="form-group">
            <label>Du</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Au</label>
            <input type="date" />
          </div>
        </div>
        <button className="btn btn-primary btn-sm" style={{ marginTop: 6 }}>
          <Icon name="download" /> Télécharger le rapport (CSV)
        </button>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10 }}>
          Les rapports PDF et l&apos;envoi automatique planifié par e-mail seront disponibles avec la bascule
          vers l&apos;infrastructure serveur d&apos;ORBIT.
        </p>
      </div>
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Historique des rapports générés</h3>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Période</th>
              <th>Généré le</th>
            </tr>
          </thead>
          <tbody>
            <tr className="empty-row">
              <td colSpan={3}>Aucun rapport généré pour le moment.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
