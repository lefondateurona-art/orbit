import { mockCompanies, mockProducts, fmtFCFA } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

/**
 * PUBLIC shop page — no auth required. Reads the shop by `slug`.
 * TODO: replace the mock lookup below with a real Supabase query:
 *   supabase.from("shops").select("*, companies(*)").eq("slug", params.shopSlug).single()
 */
export default function PublicShopPage({ params }: { params: { shopSlug: string } }) {
  // Mock resolution: match a company whose slugified name equals the param,
  // falling back to the first company so the page always renders something.
  const company =
    mockCompanies.find((c) => c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === params.shopSlug) ??
    mockCompanies[0];
  const products = mockProducts.filter((p) => p.companyId === company.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="pubshop-box theme-default">
        <div className="pubshop-header flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg2 bg-gradient-to-br from-violet to-gold-dark flex items-center justify-center font-display font-bold text-white text-2xl flex-none">
            {company.logoInitial}
          </div>
          <div>
            <h2 className="text-[22px]">{company.name}</h2>
            <p className="text-[13px] text-text-dim">{company.sector}</p>
          </div>
        </div>

        <div className="pubshop-body">
          <h3 className="text-[15px] mb-4">Produits</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {products.length === 0 && <p className="empty-state col-span-full">Aucun produit publié pour le moment.</p>}
            {products.map((p) => (
              <div key={p.id} className="card p-4">
                <p className="text-[13.5px] font-semibold mb-1">{p.name}</p>
                <p className="text-[12px] text-text-muted mb-3">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold">{fmtFCFA(p.price)}</span>
                  <button className="btn btn-primary btn-sm"><Icon name="card" size={14} /> Commander</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border-soft flex items-center justify-between flex-wrap gap-2">
            <p className="text-[11.5px] text-text-muted">Propulsé par Orbit · connecté à Koraa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
