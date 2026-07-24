"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { money, orbitProducts, mockPublicShop } from "@/lib/mock-data";

/** Faithful port of the prototype PUBLIC SHOP storefront (view-pubshop).
 *  This is the page a customer sees — and what appears in the Koraa catalogue.
 *  No auth required. Data is mock until wired to Supabase by slug. */
type Page = "home" | "products" | "collections" | "testimonials" | "about" | "privacy" | "terms";
const NAV: { id: Page; icon: string; label: string }[] = [
  { id: "home", icon: "smart-home", label: "Accueil" },
  { id: "products", icon: "shopping-cart", label: "Produits" },
  { id: "collections", icon: "layout-grid", label: "Collections" },
  { id: "testimonials", icon: "star", label: "Témoignages" },
  { id: "about", icon: "building-store", label: "À propos" },
  { id: "privacy", icon: "shield-lock", label: "Confidentialité" },
  { id: "terms", icon: "file-text", label: "CGV" },
];

export default function PublicShopView() {
  const [page, setPage] = useState<Page>("home");
  const s = mockPublicShop;

  const ProductGrid = ({ items }: { items: typeof orbitProducts }) => (
    <div className="pubshop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 }}>
      {items.map((p) => (
        <div key={p.id} className="pubshop-card" style={{ border: "1px solid var(--border-soft)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ height: 110, background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="photo" size={28} style={{ color: "var(--text-muted)" }} />
          </div>
          <div style={{ padding: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{p.category}</div>
            <div style={{ fontWeight: 700, marginTop: 4, color: "var(--violet)" }}>{money(p.price)}</div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 8, width: "100%" }} disabled={p.stock === 0}>
              <Icon name="shopping-cart" /> {p.stock === 0 ? "Épuisé" : "Ajouter"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="public-shop-overlay" style={{ position: "static", display: "block", padding: 24 }}>
      <div className="public-shop-box" id="pubshop-box" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="pubshop-header">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="pubshop-logo" style={{ width: 56, height: 56, borderRadius: 14, background: "var(--violet)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
              CF
            </div>
            <div>
              <span className="kaki-badge"><Icon name="shield-check" /> Boutique vérifiée</span>
              <h2 style={{ marginTop: 8 }}>{s.name}</h2>
              <p>Aperçu de ce que voient vos clients sur <span>{s.link}</span></p>
            </div>
          </div>
        </div>

        <nav className="pubshop-nav" style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "14px 0" }}>
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`pubshop-nav-btn ${page === n.id ? "active" : ""}`}
              onClick={() => setPage(n.id)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 999, border: "1px solid var(--border-soft)", fontSize: 12.5 }}
            >
              <Icon name={n.icon} /> {n.label}
            </button>
          ))}
        </nav>

        <div className="pubshop-body">
          {page === "home" && (
            <div className="pubshop-page active">
              <div className="pubshop-desc" style={{ marginBottom: 18 }}>{s.desc}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "22px 0 14px", flexWrap: "wrap", gap: 10 }}>
                <h3 style={{ fontSize: 16, margin: 0 }}>Nos produits</h3>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPage("products")}>
                  <Icon name="arrow-right" /> Voir tout le catalogue
                </button>
              </div>
              <ProductGrid items={orbitProducts.slice(0, 4)} />
            </div>
          )}

          {page === "products" && (
            <div className="pubshop-page active">
              <h3 style={{ fontSize: 16, marginBottom: 14 }}>Catalogue complet</h3>
              <ProductGrid items={orbitProducts} />
            </div>
          )}

          {page === "collections" && (
            <div className="pubshop-page active">
              <h3 style={{ fontSize: 16, marginBottom: 14 }}>Nos collections</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
                {s.collections.map((c) => (
                  <div key={c} style={{ height: 90, borderRadius: 12, background: "var(--violet-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === "testimonials" && (
            <div className="pubshop-page active">
              <h3 style={{ fontSize: 16, marginBottom: 14 }}>Ce que disent nos clients</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
                {s.testimonials.map((t, i) => (
                  <div key={i} style={{ border: "1px solid var(--border-soft)", borderRadius: 12, padding: 14 }}>
                    <div style={{ color: "var(--gold)" }}>{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                    <p style={{ fontSize: 13, margin: "8px 0" }}>{t.text}</p>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === "about" && (
            <div className="pubshop-page active">
              <h3 style={{ fontSize: 16, marginBottom: 8 }}>À propos</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>{s.about}</p>
            </div>
          )}

          {page === "privacy" && (
            <div className="pubshop-page active">
              <h3 style={{ fontSize: 16, marginBottom: 14 }}>Politique de confidentialité</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6 }}>
                Les données que vous fournissez (nom, téléphone, adresse) sont utilisées uniquement pour
                traiter votre commande et vous livrer. Elles ne sont jamais revendues à des tiers.
              </p>
            </div>
          )}

          {page === "terms" && (
            <div className="pubshop-page active">
              <h3 style={{ fontSize: 16, marginBottom: 14 }}>Conditions générales de vente</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6 }}>
                Toute commande passée sur cette boutique implique l&apos;acceptation des présentes CGV.
                Paiement sécurisé via Mobile Money ou carte. Livraison suivie. Retours acceptés sous 48h si
                le produit n&apos;est pas conforme.
              </p>
            </div>
          )}

          <div className="pubshop-footer" style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid var(--border-soft)" }}>
            <div className="pubshop-trust-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
              <div className="pubshop-trust-chip"><Icon name="shield-check" /> Paiement sécurisé</div>
              <div className="pubshop-trust-chip"><Icon name="truck-delivery" /> Livraison suivie</div>
              <div className="pubshop-trust-chip"><Icon name="headset" /> Support client</div>
              <div className="pubshop-trust-chip"><Icon name="rotate" /> Retours facilités</div>
            </div>
            <div className="pubshop-footer-brand" style={{ fontSize: 12, color: "var(--text-muted)" }}>
              <span className="orbit-mark"><Icon name="orbit" /> Boutique propulsée par ORBIT 🇧🇪 — société belge</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
