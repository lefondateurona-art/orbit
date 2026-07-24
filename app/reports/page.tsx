import { mockCompanies, mockOrders, fmtFCFA } from "@/lib/mock-data";

export default function ReportsPage() {
  const totalRevenue = mockOrders.reduce((s, o) => s + (o.status === "completed" ? o.amount : 0), 0);
  const pendingRevenue = mockOrders.reduce((s, o) => s + (o.status !== "completed" ? o.amount : 0), 0);

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Rapports financiers</h1>
          <p className="text-[13px] text-text-muted mt-1">Vue consolidée de toutes vos entreprises.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Revenu encaissé</p><p className="font-display text-[22px] font-bold">{fmtFCFA(totalRevenue)}</p></div>
        <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Revenu en attente</p><p className="font-display text-[22px] font-bold">{fmtFCFA(pendingRevenue)}</p></div>
        <div className="kpi-card"><p className="text-[12.5px] text-text-muted mb-2">Entreprises actives</p><p className="font-display text-[22px] font-bold">{mockCompanies.length}</p></div>
      </div>

      <div className="card p-5">
        <h3 className="text-[15px] mb-4">Revenu par entreprise</h3>
        <div className="space-y-3">
          {mockCompanies.map((c) => (
            <div key={c.id}>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="font-semibold">{c.name}</span>
                <span>{fmtFCFA(c.revenue)}</span>
              </div>
              <div className="h-2 rounded-full bg-border-soft overflow-hidden">
                <div
                  className="h-full bg-violet rounded-full"
                  style={{ width: `${Math.min(100, (c.revenue / Math.max(...mockCompanies.map((x) => x.revenue))) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
