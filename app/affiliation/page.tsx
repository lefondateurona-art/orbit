"use client";

import { useState } from "react";
import { mockAffiliate, fmtFCFA } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

export default function AffiliationPage() {
  const [copied, setCopied] = useState(false);
  const link = `https://orbit.app/r/${mockAffiliate.code}`;

  function copy() {
    navigator.clipboard?.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const rate = mockAffiliate.clicks > 0 ? ((mockAffiliate.conversions / mockAffiliate.clicks) * 100).toFixed(1) : "0";

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Affiliation</h1>
          <p className="text-[13px] text-text-muted mt-1">Générez votre lien de parrainage et suivez vos commissions.</p>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <h3 className="text-[14px] mb-3">Votre lien d&apos;affiliation</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <code className="flex-1 min-w-[220px] bg-surface border border-border-soft rounded-lg2 px-4 py-3 text-[13px]">{link}</code>
          <button onClick={copy} className="btn btn-primary btn-sm">{copied ? "Copié !" : "Copier"}</button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Clics</p><p className="font-display text-[22px] font-bold">{mockAffiliate.clicks}</p></div>
        <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Conversions</p><p className="font-display text-[22px] font-bold">{mockAffiliate.conversions}</p></div>
        <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Taux de conversion</p><p className="font-display text-[22px] font-bold">{rate}%</p></div>
        <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Commission gagnée</p><p className="font-display text-[22px] font-bold">{fmtFCFA(mockAffiliate.commission)}</p></div>
      </div>

      <div className="card p-5">
        <h3 className="text-[15px] mb-3 flex items-center gap-2"><Icon name="affiliate" size={16} /> Comment ça marche</h3>
        <ol className="list-decimal pl-5 space-y-1.5 text-[13px] text-text-dim">
          <li>Partagez votre lien avec votre audience.</li>
          <li>Chaque clic est suivi via <code>affiliate_clicks</code>.</li>
          <li>Une conversion (souscription payée) déclenche une commission dans <code>transactions</code>.</li>
        </ol>
      </div>
    </div>
  );
}
