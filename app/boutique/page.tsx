"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import {
  money,
  SHOP_THEMES,
  SHOP_FONTS,
  mockChannels,
  orbitProducts,
} from "@/lib/mock-data";

/** Faithful port of the prototype BOUTIQUE view (view-boutique / renderShop +
 *  renderShopThemePicker). This is the connection point with Koraa: the public
 *  shop link is what appears in the Koraa catalogue. */
export default function BoutiqueView() {
  const [theme, setTheme] = useState("flow");
  const [proUnlocked, setProUnlocked] = useState(false);
  const shopLink = "https://orbit.app/s/ma-boutique";

  const pickTheme = (key: string) => {
    const def = SHOP_THEMES.find((t) => t.key === key)!;
    if (!def.free && !proUnlocked) {
      if (typeof window !== "undefined" && window.confirm('Le thème "Pro" est une option payante. Débloquer ce thème pour votre boutique maintenant ?')) {
        setProUnlocked(true);
        setTheme("pro");
      }
      return;
    }
    setTheme(key);
  };

  return (
    <section id="view-boutique">
      {/* ---- Configuration ---- */}
      <div className="panel" id="shop-config-panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="building-store" /> Configuration de la boutique</h3>
            <p className="desc">
              C&apos;est votre boutique : donnez-lui votre nom, votre logo, vos couleurs — construisez-la
              comme vous le souhaitez, sans thème imposé.
            </p>
          </div>
        </div>

        <div className="shop-identity-bar">
          <div style={{ position: "relative" }}>
            <label className="shop-identity-logo" title="Changer le logo">
              <span className="shop-identity-logo-empty"><Icon name="camera-plus" /></span>
            </label>
          </div>
          <div className="shop-identity-name">
            <label>
              Nom de votre boutique{" "}
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                (affiché en haut, à la place d&apos;un nom générique)
              </span>
            </label>
            <input type="text" placeholder="Ex : Gold Chicken, Atelier Kadi, Chez Fatou..." />
            <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
              <Icon name="info-circle" /> Logo recommandé : image carrée, au moins 300 × 300 px.
            </p>
          </div>
        </div>

        <div className="settings-grid" style={{ marginTop: 18 }}>
          <div className="form-group">
            <label>Photo de couverture</label>
            <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginBottom: 8 }}>
              <Icon name="info-circle" /> Format recommandé : ratio 3,5:1 (ex : 1400 × 400 px).
            </p>
            <input type="file" accept="image/*" style={{ flex: 1 }} />
          </div>
          <div className="form-group">
            <label>Couleur signature</label>
            <input type="color" defaultValue="#6C4CF0" style={{ height: 44, padding: 4 }} />
          </div>
          <div className="form-group">
            <label>Police</label>
            <select defaultValue="grotesk">
              {SHOP_FONTS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label>Vidéo de présentation (lien YouTube — affichée en haut de votre boutique)</label>
            <input type="text" placeholder="Ex : https://youtube.com/watch?v=..." />
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <label style={{ display: "block", marginBottom: 10 }}>Thème de la boutique</label>
          <div className="shop-theme-grid">
            {SHOP_THEMES.map((t) => {
              const unlocked = t.free || proUnlocked;
              return (
                <div
                  key={t.key}
                  className={`shop-theme-card ${theme === t.key ? "selected" : ""} ${unlocked ? "unlocked" : ""}`}
                  onClick={() => pickTheme(t.key)}
                >
                  <div className="shop-theme-selected-badge"><Icon name="check" /></div>
                  {!unlocked && <div className="shop-theme-lock"><Icon name="lock" /></div>}
                  <div className={`shop-theme-swatch swatch-${t.key}`}><div className="stc-chip" /></div>
                  <div className="shop-theme-body">
                    <h4>{t.name}</h4>
                    <p>{t.desc}</p>
                    <span className={`shop-theme-price ${t.free ? "free" : "paid"}`}>{t.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: 18 }}>
          <Icon name="device-floppy" /> Enregistrer la configuration
        </button>
      </div>

      {/* ---- Votre boutique en ligne + accès KORAA ---- */}
      <div className="panel">
        <div className="panel-head">
          <h3>Votre boutique en ligne</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-ghost btn-sm"><Icon name="copy" /> Copier le lien</button>
            <button className="btn btn-ghost btn-sm"><Icon name="share" /> Partager la boutique</button>
            <button className="btn btn-primary btn-sm"><Icon name="eye" /> Voir comme un client</button>
          </div>
        </div>
        <div className="koraa-access-bar">
          <div className="koraa-access-info">
            <Icon name="external-link" />
            <div>
              <strong>Application KORAA</strong>
              <p>
                Ouvrez l&apos;application KORAA pour vérifier que votre catalogue et vos informations
                s&apos;affichent correctement côté client.
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-sm"><Icon name="orbit" /> Ouvrir KORAA</button>
        </div>
        <div className="shop-link-box">
          <Icon name="link" /> <code>{shopLink}</code>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ width: 96, height: 96, background: "#fff", borderRadius: 10, padding: 8, border: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="qrcode" size={64} style={{ color: "#100E1F" }} />
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
            Partagez ce lien (ou faites scanner le QR code) à vos clients pour qu&apos;ils consultent vos
            produits, ajoutent au panier, réservent et paient en ligne (Orange Money, Wave, MTN Money,
            Moov Money, carte bancaire…).
          </p>
        </div>
        <div className="product-grid">
          {orbitProducts.map((p) => (
            <div className="product-card" key={p.id} style={{ padding: 12 }}>
              <div className="pc-name" style={{ fontWeight: 600 }}>{p.name}</div>
              <div className="pc-shop" style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.category}</div>
              <div className="pc-price" style={{ fontWeight: 700, marginTop: 4 }}>{money(p.price)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Traçabilité par canal ---- */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="chart-bar" /> Traçabilité par canal</h3>
            <p className="desc">
              Nombre de partages de votre lien boutique par réseau — pour savoir quel canal convertit le
              mieux.
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Canal</th>
              <th style={{ textAlign: "right" }}>Partages</th>
            </tr>
          </thead>
          <tbody>
            {mockChannels.map(([name, n]) => (
              <tr key={name}>
                <td>{name}</td>
                <td style={{ textAlign: "right" }}>{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Réseaux sociaux ---- */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="share-3" /> Réseaux sociaux de la boutique</h3>
            <p className="desc">Ces liens apparaissent en pied de page de votre boutique publique.</p>
          </div>
        </div>
        <div className="settings-grid">
          {[
            { icon: "brand-facebook", label: "Facebook", ph: "https://facebook.com/votrepage" },
            { icon: "brand-instagram", label: "Instagram", ph: "https://instagram.com/votrecompte" },
            { icon: "brand-tiktok", label: "TikTok", ph: "https://tiktok.com/@votrecompte" },
            { icon: "brand-whatsapp", label: "WhatsApp", ph: "Ex : 2250700000000" },
          ].map((s) => (
            <div className="form-group" key={s.label}>
              <label><Icon name={s.icon} /> {s.label}</label>
              <input type="text" placeholder={s.ph} />
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>
          <Icon name="device-floppy" /> Enregistrer les réseaux
        </button>
      </div>
    </section>
  );
}
