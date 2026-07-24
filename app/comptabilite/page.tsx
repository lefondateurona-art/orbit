"use client";

import { Icon } from "@/components/Icon";
import {
  money,
  totalCA,
  totalDep,
  mockExpenses,
  mockTopProducts,
  mockMonthly,
  mockPockets,
  mockRetraits,
} from "@/lib/mock-data";

/** Faithful port of the prototype COMPTABILITÉ view (view-comptabilite / renderComptabilite). */
export default function ComptabiliteView() {
  const marge = totalCA > 0 ? Math.round(((totalCA - totalDep) / totalCA) * 100) : 0;
  const panier = 26400;

  const byCat = mockExpenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const maxCat = Math.max(...Object.values(byCat));

  return (
    <section id="view-comptabilite">
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label"><Icon name="cash" /> Chiffre d&apos;affaires</div>
          <div className="kpi-value">{money(totalCA)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><Icon name="arrow-down-circle" /> Dépenses</div>
          <div className="kpi-value">{money(totalDep)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><Icon name="chart-line" /> Marge nette</div>
          <div className="kpi-value">{marge} %</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><Icon name="basket" /> Panier moyen</div>
          <div className="kpi-value">{money(panier)}</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Dépenses par catégorie</h3>
            <p className="desc">Répartition de vos sorties d&apos;argent sur l&apos;ensemble de l&apos;activité.</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(byCat).map(([cat, amt]) => (
            <div key={cat}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span>{cat}</span>
                <span className="tag-neg">{money(amt)}</span>
              </div>
              <div style={{ height: 8, background: "var(--surface)", borderRadius: 999 }}>
                <div style={{ width: `${(amt / maxCat) * 100}%`, height: "100%", background: "var(--danger)", borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Meilleurs produits</h3>
            <p className="desc">Classés par chiffre d&apos;affaires généré via les commandes.</p>
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

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Résumé mensuel</h3>
            <p className="desc">Ventes et dépenses des 6 derniers mois.</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Mois</th>
              <th style={{ textAlign: "right" }}>Ventes</th>
              <th style={{ textAlign: "right" }}>Dépenses</th>
              <th style={{ textAlign: "right" }}>Bénéfice</th>
            </tr>
          </thead>
          <tbody>
            {mockMonthly.map((m) => (
              <tr key={m.month}>
                <td>{m.month}</td>
                <td style={{ textAlign: "right" }} className="tag-pos">{money(m.ca)}</td>
                <td style={{ textAlign: "right" }} className="tag-neg">{money(m.dep)}</td>
                <td style={{ textAlign: "right" }}>{money(m.ca - m.dep)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="wallet" style={{ color: "var(--violet)" }} /> Poches de répartition</h3>
            <p className="desc">
              Chaque vente est automatiquement ventilée selon les pourcentages définis. Solde disponible =
              montant alloué depuis le début − retraits déjà effectués.
            </p>
          </div>
        </div>
        <div className="pocket-grid">
          {mockPockets.map((p) => (
            <div className="pocket-card" key={p.name} style={{ border: "1px solid var(--border-soft)", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>{p.pct} % des ventes</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700 }}>
                {money(p.allocated - p.withdrawn)}
              </div>
              <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                Alloué {money(p.allocated)} · Retiré {money(p.withdrawn)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="arrow-up-right-circle" style={{ color: "var(--violet)" }} /> Retraits</h3>
            <p className="desc">Historique des retraits par poche, avec le moyen utilisé.</p>
          </div>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Nouveau retrait</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Compte source</th>
              <th>Moyen de retrait</th>
              <th style={{ textAlign: "right" }}>Montant</th>
            </tr>
          </thead>
          <tbody>
            {mockRetraits.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.source}</td>
                <td>{r.method}</td>
                <td style={{ textAlign: "right" }}>{money(r.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
