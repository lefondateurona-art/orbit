"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { money } from "@/lib/mock-data";

/** Faithful port of the prototype PAYWALL / subscription flow (renderPaywall):
 *  trial ended → choose a plan → confirm → pay (Mobile Money) → verifiable
 *  receipt. Mirrors the brief: 24h free trial + Wave/Orange payment + receipt
 *  saved to a transactions table (stubbed here, wired to Supabase later). */

type Plan = { key: string; name: string; price: number; tagline: string; featured?: boolean; features: [boolean, string][] };
const PLANS: Plan[] = [
  {
    key: "decouverte",
    name: "Découverte",
    price: 0,
    tagline: "Pour démarrer et tester ORBIT sur votre activité, sans risque.",
    features: [
      [true, "1 point de vente"],
      [true, "Facturation (jusqu'à 10 / mois)"],
      [true, "Suivi des ventes de base"],
      [true, "Application mobile"],
      [false, "Boutique en ligne"],
      [false, "Multi-points de vente"],
      [false, "Assistant IA"],
    ],
  },
  {
    key: "standard",
    name: "Standard",
    price: 10000,
    tagline: "Pour structurer une activité qui grandit et professionnaliser votre gestion.",
    features: [
      [true, "Tout Découverte, en illimité"],
      [true, "Boutique en ligne incluse"],
      [true, "Jusqu'à 5 utilisateurs"],
      [true, "Comptabilité OHADA (Grand Livre, Balance)"],
      [true, "Support prioritaire"],
      [false, "Création de filiales"],
      [false, "Business Intelligence"],
    ],
  },
  {
    key: "premium",
    name: "Premium",
    price: 50000,
    tagline: "Pour piloter un réseau : plusieurs points de vente, filiales et équipes.",
    featured: true,
    features: [
      [true, "Tout Standard, sans limite"],
      [true, "Utilisateurs illimités"],
      [true, "Multi-points de vente illimités"],
      [true, "Création et gestion de filiales"],
      [true, "Comptabilité OHADA complète"],
      [true, "Assistant IA (finance, ventes, prévisions)"],
      [true, "Business Intelligence + API"],
    ],
  },
];

const PAY_METHODS: { key: string; label: string; icon: string }[] = [
  { key: "orange", label: "Orange Money", icon: "device-mobile" },
  { key: "wave", label: "Wave", icon: "wave-sine" },
  { key: "mtn", label: "MTN Money", icon: "device-mobile" },
  { key: "moov", label: "Moov Money", icon: "device-mobile" },
  { key: "card", label: "Carte bancaire", icon: "credit-card" },
];

function makeReceiptCode() {
  const rnd = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORB-${rnd()}-${rnd()}`;
}

export default function PricingPaywall() {
  const [step, setStep] = useState<"choose" | "confirm" | "pay" | "receipt">("choose");
  const [selected, setSelected] = useState<Plan>(PLANS[2]);
  const [receipt, setReceipt] = useState<{ code: string; method: string; date: string } | null>(null);

  const pay = (method: string) => {
    setReceipt({ code: makeReceiptCode(), method, date: new Date().toLocaleString("fr-FR") });
    setStep("receipt");
  };

  return (
    <section id="view-pricing">
      <div className="paywall-box" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="trial-banner" style={{ marginBottom: 18 }}>
          <div className="tb-text">
            <Icon name="hourglass-high" /> <span>Votre essai gratuit de 24h est terminé — vos données sont conservées.</span>
          </div>
        </div>

        <h2 id="paywall-title">
          {step === "receipt" ? "Paiement enregistré" : "Choisissez votre abonnement ORBIT"}
        </h2>
        <p id="paywall-sub" className="desc" style={{ marginBottom: 18 }}>
          Comparez les offres et changez de formule à tout moment. Vos données sont conservées.
        </p>

        {step === "choose" && (
          <>
            <div className="paywall-plans" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {PLANS.map((p) => (
                <div
                  key={p.key}
                  className={`paywall-plan ${p.featured ? "featured" : ""} ${selected.key === p.key ? "selected" : ""}`}
                  onClick={() => setSelected(p)}
                  style={{ cursor: "pointer" }}
                >
                  <h3>{p.name}</h3>
                  <div className="pp-price">{money(p.price)}<span> / mois</span></div>
                  <ul className="pp-features" style={{ listStyle: "none", textAlign: "left", fontSize: 12.5, display: "flex", flexDirection: "column", gap: 6 }}>
                    {p.features.map(([ok, label], i) => (
                      <li key={i} style={{ color: ok ? "var(--text)" : "var(--text-muted)" }}>
                        <Icon name={ok ? "circle-check" : "lock"} /> {label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={() => setStep("confirm")}>
              <Icon name="arrow-right" /> Valider mon choix et continuer
            </button>
          </>
        )}

        {step === "confirm" && (
          <div id="paywall-confirm-step">
            <div className="paywall-plan selected" style={{ maxWidth: 360, margin: "0 auto" }}>
              <h3>{selected.name}</h3>
              <div className="pp-price">{money(selected.price)}<span> / mois</span></div>
              <p className="desc">{selected.tagline}</p>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setStep("choose")}>
                <Icon name="arrow-left" /> Modifier mon choix
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setStep("pay")}>
                Payer l&apos;offre {selected.name} — {money(selected.price)}
              </button>
            </div>
          </div>
        )}

        {step === "pay" && (
          <div id="paywall-pay-section">
            <p className="desc" style={{ textAlign: "center", marginBottom: 14 }}>
              Choisissez votre moyen de paiement pour l&apos;offre <strong>{selected.name}</strong> ({money(selected.price)}).
            </p>
            <div className="paywall-pay-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12 }}>
              {PAY_METHODS.map((m) => (
                <button key={m.key} className="paywall-pay-btn active" onClick={() => pay(m.label)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 16, border: "1px solid var(--border-soft)", borderRadius: 12 }}>
                  <Icon name={m.icon} size={22} />
                  <span>{m.label}</span>
                  <em className="pm-active-tag" style={{ fontSize: 11, color: "var(--teal)" }}>Disponible</em>
                </button>
              ))}
            </div>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => setStep("confirm")}>
              <Icon name="arrow-left" /> Retour
            </button>
          </div>
        )}

        {step === "receipt" && receipt && (
          <div className="paywall-receipt" style={{ maxWidth: 460, margin: "0 auto", textAlign: "center", border: "1px solid var(--border-soft)", borderRadius: 16, padding: 24 }}>
            <Icon name="circle-check" size={48} style={{ color: "var(--teal)" }} />
            <h3 style={{ marginTop: 10 }}>Reçu de paiement</h3>
            <p className="desc">
              Votre paiement pour l&apos;offre <strong>{selected.name}</strong> est en cours de vérification.
              L&apos;accès s&apos;active automatiquement dès confirmation.
            </p>
            <div style={{ textAlign: "left", marginTop: 16, display: "flex", flexDirection: "column", gap: 8, fontSize: 13.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span className="desc">Offre</span><strong>{selected.name}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span className="desc">Montant</span><strong>{money(selected.price)}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span className="desc">Moyen</span><strong>{receipt.method}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span className="desc">Date</span><strong>{receipt.date}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="desc">Code de vérification</span>
                <strong className="mono">{receipt.code}</strong>
              </div>
            </div>
            <p style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 14 }}>
              <Icon name="info-circle" /> Ce reçu est vérifiable via son code et sera enregistré dans la table
              des transactions (à brancher sur Supabase).
            </p>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => { setStep("choose"); setReceipt(null); }}>
              Retour aux offres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
