"use client";

import { Icon } from "@/components/Icon";
import { money, mockAffiliateInfo, mockReferrals } from "@/lib/mock-data";

/** Faithful port of the prototype AFFILIATION view (view-affiliation / renderAffiliation). */
export default function AffiliationView() {
  const link = `https://orbit.app/r/${mockAffiliateInfo.code}`;
  return (
    <section id="view-affiliation">
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="affiliate" /> Votre programme d&apos;affiliation</h3>
            <p className="desc">
              Partagez votre lien personnel : chaque nouvelle entreprise inscrite via ce lien vous fait
              gagner une commission sur son abonnement.
            </p>
          </div>
        </div>
        <div className="shop-link-box">
          <Icon name="link" /> <code>{link}</code>
          <button className="icon-btn" title="Copier" aria-label="Copier"><Icon name="copy" /></button>
          <button className="icon-btn" title="Partager" aria-label="Partager"><Icon name="share" /></button>
        </div>
        <div className="kpi-grid" style={{ marginTop: 18 }}>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="users" /> Filleuls inscrits</div>
            <div className="kpi-value">{mockAffiliateInfo.count}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="percentage" /> Taux de commission</div>
            <div className="kpi-value">10 %</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label"><Icon name="cash" /> Commissions cumulées</div>
            <div className="kpi-value">{money(mockAffiliateInfo.commission)}</div>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head">
          <h3>Historique des filleuls</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Entreprise filleule</th>
              <th>Date d&apos;inscription</th>
              <th>Offre choisie</th>
              <th style={{ textAlign: "right" }}>Commission</th>
            </tr>
          </thead>
          <tbody>
            {mockReferrals.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{r.date}</td>
                <td>{r.plan}</td>
                <td style={{ textAlign: "right" }}>{money(r.commission)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
