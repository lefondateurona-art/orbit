"use client";

import { Icon } from "@/components/Icon";
import { money, orbitProducts, mockCoachFeed } from "@/lib/mock-data";

/** Faithful port of the prototype MARKETING IA view (view-marketingia /
 *  renderMarketingIA + renderCoachFeed). The heuristic report is shown in its
 *  "results applied" state with representative content. */
export default function MarketingIaView() {
  return (
    <section id="view-marketingia">
      {/* ---- Panel 1: Recherche produit ---- */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="bulb" style={{ color: "var(--violet)" }} /> Recherche produit — de la photo à la publicité</h3>
            <p className="desc">
              Le point de départ, c&apos;est une simple photo. Déposez-la avant même de créer la fiche
              produit : l&apos;assistant construit tout le raisonnement marketing — problème, cible, 4P,
              budget de départ, rentabilité — pour décider si ce produit mérite d&apos;être lancé.
            </p>
          </div>
        </div>
        <div className="prm-intro">
          <Icon name="info-circle" /> Rapport heuristique généré à partir de la photo, du nom provisoire et
          des hypothèses de prix — une aide à la décision, pas une reconnaissance visuelle réelle.
        </div>

        <div className="prm-form-row">
          <label className="prm-upload">
            <span><Icon name="camera-plus" /></span>
          </label>
          <div className="prm-fields">
            <div className="form-group"><label>Nom provisoire du produit</label><input type="text" placeholder="Ex : Sac à main tissé" defaultValue="Sac à main tissé" /></div>
            <div className="form-group"><label>Catégorie / secteur</label><input type="text" placeholder="Ex : Artisanat" defaultValue="Artisanat" /></div>
            <div className="form-group"><label>Prix de vente envisagé (FCFA)</label><input type="number" placeholder="Ex : 15000" defaultValue={15000} /></div>
            <div className="form-group"><label>Coût de revient estimé (FCFA)</label><input type="number" placeholder="Ex : 5000" defaultValue={5000} /></div>
            <div className="form-group"><label>Volume mensuel visé (unités)</label><input type="number" placeholder="Ex : 30" defaultValue={30} /></div>
            <div className="form-group"><label>Stock de départ souhaité</label><input type="number" placeholder="Ex : 20" defaultValue={20} /></div>
            <div className="form-group span2"><label>Problème résolu (facultatif)</label><input type="text" placeholder="Ex : Difficile de trouver un sac pratique et local à prix correct" /></div>
          </div>
        </div>
        <button type="button" className="btn btn-primary" style={{ marginTop: 12 }}>
          <Icon name="wand" /> Relancer l&apos;analyse
        </button>

        <div className="prm-report" style={{ marginTop: 18 }}>
          <div className="prm-scenario-tag">
            <Icon name="circle-check" /> Résultats appliqués — générés à partir de votre photo et de vos hypothèses
          </div>

          <div className="prm-section">
            <h5><Icon name="alert-octagon" /> Problème</h5>
            <p>Les clientes peinent à trouver un sac à main pratique, solide et fabriqué localement à un prix accessible ; l&apos;offre existante est soit importée et chère, soit de faible qualité.</p>
          </div>
          <div className="prm-section">
            <h5><Icon name="bulb-filled" /> Solution</h5>
            <p>Un sac tissé artisanal, robuste et élégant, valorisant le savoir-faire local, positionné entre l&apos;import bas de gamme et le luxe importé.</p>
          </div>
          <div className="prm-section">
            <h5><Icon name="user-circle" /> Avatar client / cible</h5>
            <p>Femmes actives de 22 à 40 ans à Abidjan, sensibles au made in Côte d&apos;Ivoire, actives sur Instagram et TikTok, budget mode 10 000–25 000 FCFA.</p>
          </div>

          <div className="prm-section">
            <h5><Icon name="layout-grid" /> Marketing mix — les 4P</h5>
            <div className="prm-4p-grid">
              <div className="prm-4p-card"><h6><Icon name="package" /> Produit</h6><p>Sac tissé main, 3 coloris, finition cuir. Argument : durabilité + local.</p></div>
              <div className="prm-4p-card"><h6><Icon name="tag" /> Prix</h6><p>15 000 FCFA (marge ~67 %). Positionnement milieu de gamme accessible.</p></div>
              <div className="prm-4p-card"><h6><Icon name="map-pin" /> Place</h6><p>Boutique en ligne ORBIT + KORAA, livraison Abidjan 24–48h.</p></div>
              <div className="prm-4p-card"><h6><Icon name="speakerphone" /> Promotion</h6><p>Vidéos TikTok créateurs, offre de lancement -10 %, bouche-à-oreille WhatsApp.</p></div>
            </div>
          </div>

          <div className="prm-section">
            <h5><Icon name="building-bank" /> Capital d&apos;investissement de départ</h5>
            <div className="prm-fin-row">
              <div><strong>{money(100000)}</strong><span> Stock initial (20 × 5 000)</span></div>
              <div><strong>{money(40000)}</strong><span> Publicité de lancement</span></div>
              <div><strong>{money(140000)}</strong><span> Capital total estimé</span></div>
            </div>
            <p className="prm-formula">Capital = (stock × coût unitaire) + budget publicitaire = 100 000 + 40 000 = 140 000 FCFA</p>
          </div>

          <div className="prm-section">
            <h5><Icon name="chart-arrows" /> ROI &amp; TROI — 3 scénarios de rentabilité</h5>
            <div className="prm-scenario-grid">
              <div className="prm-4p-card"><h6>Pessimiste (15 ventes)</h6><p>CA 225 000 · Bénéfice 85 000 · ROI 61 %</p></div>
              <div className="prm-4p-card"><h6>Réaliste (30 ventes)</h6><p>CA 450 000 · Bénéfice 260 000 · ROI 186 %</p></div>
              <div className="prm-4p-card"><h6>Optimiste (50 ventes)</h6><p>CA 750 000 · Bénéfice 490 000 · ROI 350 %</p></div>
            </div>
          </div>

          <div className="prm-section">
            <h5><Icon name="heart-handshake" /> Système de conversion et de rentabilité</h5>
            <div className="prm-conv-grid">
              <div className="prm-conv-card new"><strong><Icon name="user-plus" /> Client new</strong>A acheté une fois. Objectif : le recontacter (WhatsApp) avant son 2ᵉ achat pour le fidéliser.</div>
              <div className="prm-conv-card ambassador"><strong><Icon name="crown" /> Client ambassadeur</strong>Achète régulièrement et recommande. À partir de 10 achats, ORBIT génère un cadeau de fidélité.</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
            <button type="button" className="btn btn-primary">
              <Icon name="package-import" /> Créer la fiche produit à partir de cette analyse
            </button>
          </div>
        </div>
      </div>

      {/* ---- Panel 2: Assistant IA Marketing ---- */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="sparkles" style={{ color: "var(--violet)" }} /> Assistant IA Marketing</h3>
            <p className="desc">
              Choisissez un produit : l&apos;assistant prépare une analyse, un angle publicitaire, des
              accroches, une plateforme recommandée et une prévision de budget/ROAS.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 6 }}>
          <div className="form-group" style={{ flex: 1, minWidth: 220, marginBottom: 0 }}>
            <label>Produit à analyser</label>
            <select>
              {orbitProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {money(p.price)}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary"><Icon name="wand" /> Générer le rapport</button>
        </div>

        <div className="mia-report" style={{ marginTop: 12 }}>
          <div className="mia-head">
            <div className="mh-thumb"><Icon name="photo" /></div>
            <div>
              <h4>Robe wax imprimée</h4>
              <p>Mode femme · 15 000 FCFA · stock 24</p>
            </div>
          </div>
          <div className="mia-grid">
            <div className="mia-card">
              <h5><Icon name="thumb-up" /> Points forts</h5>
              <ul className="mia-force">
                <li>Meilleure vente actuelle</li>
                <li>Marge confortable</li>
                <li>Fort potentiel visuel (contenu TikTok)</li>
              </ul>
            </div>
            <div className="mia-card">
              <h5><Icon name="alert-triangle" /> Points de vigilance</h5>
              <ul className="mia-weak">
                <li>Concurrence sur le wax</li>
                <li>Tailles limitées en stock</li>
              </ul>
            </div>
          </div>
          <div className="mia-card full" style={{ marginBottom: 16 }}>
            <h5><Icon name="trending-up" /> Potentiel de vente estimé</h5>
            <p>Élevé : 40 à 60 ventes/mois possibles avec une campagne TikTok bien ciblée.</p>
          </div>
          <div className="mia-grid">
            <div className="mia-card">
              <h5><Icon name="target-arrow" /> Audience cible &amp; angle</h5>
              <p>Femmes 20–35 ans, Abidjan. Angle : « Le wax qui se remarque, à ton budget. »</p>
            </div>
            <div className="mia-card">
              <h5><Icon name="brand-facebook" /> Plateforme recommandée</h5>
              <p>TikTok (créateurs KORAA) + Instagram Reels.</p>
            </div>
          </div>
          <div className="mia-card full">
            <h5><Icon name="report-money" /> Budget conseillé &amp; prévision</h5>
            <div className="mia-kpi-row">
              <div><strong>{money(30000)}</strong><span> Budget/mois</span></div>
              <div><strong>x3,5</strong><span> ROAS estimé</span></div>
              <div><strong>{money(105000)}</strong><span> CA prévisionnel</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Panel 3: IA Business Coach ---- */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="message-chatbot" style={{ color: "var(--violet)" }} /> IA Business Coach</h3>
            <p className="desc">Rapports, alertes et conseils générés à partir de vos données réelles.</p>
          </div>
          <button type="button" className="btn btn-ghost btn-sm"><Icon name="refresh" /> Actualiser</button>
        </div>
        <div className="coach-feed">
          {mockCoachFeed.map((c, i) => (
            <div
              key={i}
              className="coach-item"
              style={{ display: "flex", gap: 12, padding: "12px 14px", border: "1px solid var(--border-soft)", borderRadius: 12, marginBottom: 10 }}
            >
              <Icon name={c.icon} style={{ color: "var(--violet)" }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{c.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
