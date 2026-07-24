"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { mockPayMethods } from "@/lib/mock-data";

/** Faithful port of the prototype PARAMÈTRES view (view-parametres / renderSettings). */
export default function ParametresView() {
  const [pay, setPay] = useState(mockPayMethods);
  const toggle = (id: string) =>
    setPay((prev) => prev.map((m) => (m.id === id ? { ...m, on: !m.on } : m)));

  return (
    <section id="view-parametres">
      <div className="panel">
        <div className="panel-head">
          <div>
            <h3><Icon name="crown" /> Abonnement</h3>
            <p className="desc">Consultez votre formule actuelle et changez d&apos;abonnement à tout moment.</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Formule actuelle</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700 }}>
              Essai gratuit (24h)
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-sm btn-cta-attention">
            <Icon name="arrows-exchange" /> Revoir / changer l&apos;abonnement
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Informations de l&apos;entreprise</h3>
        </div>
        <div className="settings-grid">
          <div className="form-group">
            <label>Nom de l&apos;entreprise</label>
            <input type="text" defaultValue="Ma boutique" />
          </div>
          <div className="form-group">
            <label>Devise</label>
            <select defaultValue="FCFA">
              <option value="FCFA">FCFA</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="MAD">MAD</option>
            </select>
          </div>
          <div className="form-group">
            <label>Secteur d&apos;activité</label>
            <select>
              <option>Commerce / Boutique</option>
              <option>Restauration</option>
              <option>Artisanat</option>
              <option>Services</option>
              <option>Autre</option>
            </select>
          </div>
          <div className="form-group">
            <label>Domaine personnalisé</label>
            <input type="text" placeholder="ex : maboutique.com" />
          </div>
          <div className="form-group">
            <label>Numéro WhatsApp Business</label>
            <input type="tel" placeholder="ex : 07 00 00 00 00" />
          </div>
          <div className="form-group" style={{ gridColumn: "1/-1" }}>
            <label>Description de la boutique (visible par vos clients)</label>
            <textarea placeholder="Ex : Chez Fatou, votre boutique de mode à Abidjan depuis 2019." />
          </div>
        </div>
        <button type="button" className="btn btn-primary" style={{ marginTop: 6 }}>
          <Icon name="device-floppy" /> Enregistrer les paramètres
        </button>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Moyens de paiement</h3>
            <p className="desc">
              Activez les plateformes que vos clients pourront utiliser sur la boutique et les liens de
              paiement.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pay.map((m) => (
            <div className="automation-row" key={m.id}>
              <div className="automation-info">
                <Icon name="credit-card" />
                <div>
                  <h4>{m.label}</h4>
                </div>
              </div>
              <label className="switch">
                <input type="checkbox" checked={m.on} onChange={() => toggle(m.id)} />
                <span className="slider" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
