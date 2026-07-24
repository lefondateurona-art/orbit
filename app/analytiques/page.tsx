"use client";

import { Icon } from "@/components/Icon";
import { money, mockMonthly, mockTopProducts, mockAnalytics } from "@/lib/mock-data";

/** Faithful port of the prototype ANALYTIQUES view (view-analytiques / renderAnalytiques). */
export default function AnalytiquesView() {
  const max = Math.max(...mockMonthly.map((m) => m.ca));
  return (
    <section id="view-analytiques">
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label"><Icon name="trending-up" /> Croissance des ventes</div>
          <div className="kpi-value">{mockAnalytics.growth} %</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><Icon name="basket" /> Panier moyen</div>
          <div className="kpi-value">{money(mockAnalytics.panier)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><Icon name="user-plus" /> Nouveaux clients (30j)</div>
          <div className="kpi-value">{mockAnalytics.newClients}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><Icon name="repeat" /> Taux de clients fidèles</div>
          <div className="kpi-value">{mockAnalytics.fidelite} %</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Ventes des 6 derniers mois</h3>
            <p className="desc">Comparez vos ventes et vos dépenses mois par mois.</p>
          </div>
        </div>
        <div className="bar-chart" style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 200, padding: "16px 8px" }}>
          {mockMonthly.map((m) => (
            <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 150 }}>
                <div title={`CA ${money(m.ca)}`} style={{ width: 16, height: `${(m.ca / max) * 100}%`, background: "var(--violet)", borderRadius: "4px 4px 0 0" }} />
                <div title={`Dépenses ${money(m.dep)}`} style={{ width: 16, height: `${(m.dep / max) * 100}%`, background: "var(--danger)", borderRadius: "4px 4px 0 0", opacity: 0.7 }} />
              </div>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Produits les plus rentables</h3>
            <p className="desc">Classement par chiffre d&apos;affaires généré.</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th style={{ textAlign: "right" }}>Qté vendue</th>
              <th style={{ textAlign: "right" }}>CA généré</th>
            </tr>
          </thead>
          <tbody>
            {mockTopProducts.map((p) => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td style={{ textAlign: "right" }}>{p.qty}</td>
                <td style={{ textAlign: "right" }}>{money(p.ca)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
