import Link from "next/link";
import { mockCompanies, mockOrders, fmtFCFA, fmtCompact } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

export default function OverviewPage() {
  const totalRevenue = mockCompanies.reduce((s, c) => s + c.revenue, 0);
  const totalProducts = mockCompanies.reduce((s, c) => s + c.productsCount, 0);
  const totalCustomers = mockCompanies.reduce((s, c) => s + c.customersCount, 0);
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div>
      <div className="trial-banner critical">
        <div className="tb-text">
          <Icon name="hourglass" size={20} />
          <span>Essai gratuit — il vous reste 3h12 avant l&apos;expiration. Passez à un forfait pour continuer.</span>
        </div>
        <Link href="/pricing" className="btn btn-primary btn-sm">Voir les forfaits</Link>
      </div>

      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Tableau de bord</h1>
          <p className="text-[13px] text-text-muted mt-1">Vue globale sur toutes vos entreprises Orbit.</p>
        </div>
        <Link href="/companies" className="btn btn-primary">
          <Icon name="plus" size={16} /> Nouvelle entreprise
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="kpi-card">
          <p className="text-[12.5px] text-text-muted font-semibold mb-2">Revenu total</p>
          <p className="font-display text-[24px] font-bold">{fmtCompact(totalRevenue)} FCFA</p>
        </div>
        <div className="kpi-card">
          <p className="text-[12.5px] text-text-muted font-semibold mb-2">Entreprises</p>
          <p className="font-display text-[24px] font-bold">{mockCompanies.length}</p>
        </div>
        <div className="kpi-card">
          <p className="text-[12.5px] text-text-muted font-semibold mb-2">Produits</p>
          <p className="font-display text-[24px] font-bold">{totalProducts}</p>
        </div>
        <div className="kpi-card">
          <p className="text-[12.5px] text-text-muted font-semibold mb-2">Clients</p>
          <p className="font-display text-[24px] font-bold">{totalCustomers}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        <div className="card p-5">
          <h3 className="text-[15px] mb-4">Commandes récentes</h3>
          <div className="space-y-2">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2.5 border-b border-border-soft last:border-0">
                <div>
                  <p className="text-[13.5px] font-semibold">{o.productName}</p>
                  <p className="text-[12px] text-text-muted">{o.customerName} · {o.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13.5px] font-bold">{fmtFCFA(o.amount)}</p>
                  <span className={`chip ${o.status === "completed" ? "active" : ""}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/orders" className="btn btn-ghost btn-sm mt-4">Voir toutes les commandes <Icon name="arrow" size={14} /></Link>
        </div>

        <div className="card p-5">
          <h3 className="text-[15px] mb-4">Vos entreprises</h3>
          <div className="space-y-3">
            {mockCompanies.map((c) => (
              <Link key={c.id} href={`/companies/${c.id}`} className="flex items-center gap-3 hover:bg-surface -mx-2 px-2 py-1.5 rounded-lg2">
                <div className="w-10 h-10 rounded-lg2 bg-gradient-to-br from-violet to-gold-dark flex items-center justify-center font-display font-bold text-white flex-none">
                  {c.logoInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate">{c.name}</p>
                  <p className="text-[11.5px] text-text-muted">{c.sector}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
