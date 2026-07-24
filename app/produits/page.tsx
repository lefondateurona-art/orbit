"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { money, orbitProducts, productAvailability, stockStatus, type OrbitProduct } from "@/lib/mock-data";

/** Faithful port of the prototype PRODUITS view (view-produits / renderProducts). */
const FILTERS: { id: string; label: React.ReactNode }[] = [
  { id: "tous", label: "Tous" },
  { id: "disponible", label: (<><Icon name="circle-check" style={{ color: "var(--teal)" }} /> Disponible</>) },
  { id: "non-disponible", label: (<><Icon name="circle-x" style={{ color: "var(--danger)" }} /> Non disponible</>) },
  { id: "meilleure-vente", label: (<><Icon name="trophy" style={{ color: "var(--gold)" }} /> Meilleure vente</>) },
];

export default function ProduitsView() {
  const [filter, setFilter] = useState("tous");
  const [detail, setDetail] = useState<OrbitProduct | null>(null);
  const filtered = orbitProducts.filter((p) => {
    if (filter === "disponible") return productAvailability(p).key === "available";
    if (filter === "non-disponible") return productAvailability(p).key === "unavailable";
    if (filter === "meilleure-vente") return !!p.featured;
    return true;
  });
  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section id="view-produits">
      <div className="panel">
        <div className="panel-head">
          <h3>Catalogue produits &amp; inventaire</h3>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Ajouter un produit</button>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`btn btn-ghost btn-sm product-filter-tab ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "-6px 0 14px" }}>
          Cliquez sur une ligne pour ouvrir sa fiche produit complète (galerie, vidéo, variantes, avis
          clients, statistiques, SEO).
        </p>
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Catégorie</th>
              <th style={{ textAlign: "right" }}>Prix</th>
              <th style={{ textAlign: "right" }}>Stock</th>
              <th>État</th>
              <th>Fiche</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={6}>Aucun produit pour ce filtre.</td>
              </tr>
            ) : (
              sorted.map((p) => {
                const avail = productAvailability(p);
                const stock = stockStatus(p);
                return (
                  <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => setDetail(p)}>
                    <td>
                      {p.name}
                      {p.featured && (
                        <>
                          {" "}
                          <Icon name="trophy" style={{ color: "var(--gold)" }} />
                        </>
                      )}
                    </td>
                    <td>{p.category || "—"}</td>
                    <td style={{ textAlign: "right" }}>{money(p.price)}</td>
                    <td style={{ textAlign: "right" }}>{p.stock}</td>
                    <td>
                      <span className={`status-pill ${avail.key === "available" ? "stock-ok" : "stock-out"}`}>
                        {avail.label}
                      </span>{" "}
                      {stock.key === "stock-low" && <span className="status-pill stock-low">{stock.label}</span>}
                    </td>
                    <td>
                      <button type="button" className="icon-btn-sm" title="Voir la fiche produit" aria-label="Fiche produit">
                        <Icon name="file-search" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {detail && <ProductDetailModal product={detail} onClose={() => setDetail(null)} />}
    </section>
  );
}

/** Faithful port of the prototype product fiche (openProductDetail): gallery,
 *  variants, availability, rating, sales argument, characteristics, reviews, SEO. */
function ProductDetailModal({ product: p, onClose }: { product: OrbitProduct; onClose: () => void }) {
  const avail = productAvailability(p);
  const reviews = [
    { name: "Aminata K.", rating: 5, text: "Produit conforme, très satisfaite." },
    { name: "Serge K.", rating: 4, text: "Bon rapport qualité/prix." },
  ];
  return (
    <div className="modal-overlay show" style={{ display: "flex" }} onClick={onClose}>
      <div className="modal-box modal-box-lg" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fermer">
          <Icon name="x" />
        </button>

        <div className="pp2-media" style={{ marginBottom: 14 }}>
          <div className="pp2-media-main" style={{ height: 200, background: "var(--surface)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="photo" size={40} style={{ color: "var(--text-muted)" }} />
          </div>
          <div className="pp2-media-thumbs" style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 56, height: 56, background: "var(--surface)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="photo" size={18} style={{ color: "var(--text-muted)" }} />
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ marginBottom: 4 }}>{p.name}</h3>
        <div className="pp2-headline" style={{ color: "var(--text-muted)", marginBottom: 10 }}>{p.category}</div>

        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          {["S", "M", "L"].map((v) => (
            <span key={v} className="chip" style={{ padding: "6px 12px", border: "1px solid var(--border-soft)", borderRadius: 999, fontSize: 12.5 }}>
              {v}
            </span>
          ))}
        </div>

        <div style={{ marginBottom: 6 }}>
          <span className={`status-pill ${avail.key === "available" ? "stock-ok" : "stock-out"}`}>{avail.label}</span>
          <span style={{ marginLeft: 8, fontSize: 12.5, color: "var(--text-muted)" }}>Stock : {p.stock}</span>
        </div>
        <div style={{ color: "var(--gold)", marginBottom: 12 }}>★★★★☆ <span style={{ color: "var(--text-muted)", fontSize: 12.5 }}>(4,5 · {reviews.length} avis)</span></div>

        <div className="pp2-price-block" style={{ marginBottom: 16 }}>
          <span className="pp2-price" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: "var(--violet)" }}>
            {money(p.price)}
          </span>
        </div>

        <div className="pp2-section" style={{ marginBottom: 14 }}>
          <h5><Icon name="list-check" /> Caractéristiques</h5>
          <ul style={{ fontSize: 13, paddingLeft: 18 }}>
            <li>Catégorie : {p.category}</li>
            <li>Référence : {p.id.toUpperCase()}</li>
            <li>Disponibilité : {avail.label}</li>
          </ul>
        </div>

        <div className="pp2-section" style={{ marginBottom: 14 }}>
          <h5><Icon name="message-2" /> Avis clients</h5>
          {reviews.map((r, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--border-soft)", paddingTop: 8, marginTop: 8 }}>
              <div style={{ color: "var(--gold)" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p style={{ fontSize: 13, margin: "4px 0" }}>{r.text}</p>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{r.name}</div>
            </div>
          ))}
        </div>

        <div className="pp2-section">
          <h5><Icon name="search" /> Référencement (SEO)</h5>
          <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
            {p.name} — {p.category} de qualité, disponible chez votre boutique ORBIT. Livraison rapide à Abidjan.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Fermer</button>
          <button className="btn btn-primary btn-sm"><Icon name="pencil" /> Modifier la fiche</button>
        </div>
      </div>
    </div>
  );
}
