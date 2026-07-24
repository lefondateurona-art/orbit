"use client";

import { useState } from "react";
import { mockPricingPlans, fmtFCFA } from "@/lib/mock-data";
import type { ChargeResult } from "@/lib/payments/types";
import { Icon } from "@/components/Icon";

/**
 * TODO: this calls the payment adapters directly from the client for demo
 * purposes. In production, route this through a Server Action / Route
 * Handler so the real API keys (WAVE_API_KEY, ORANGE_MONEY_API_KEY) never
 * reach the browser, and persist the resulting receipt in `transactions`.
 */
async function mockChargeClientSide(
  provider: "wave" | "orange_money",
  amountFcfa: number,
  phone: string
): Promise<ChargeResult> {
  const res = await fetch("/api/mock-charge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, amountFcfa, phone }),
  });
  if (!res.ok) throw new Error("Échec du paiement");
  return res.json();
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [provider, setProvider] = useState<"wave" | "orange_money">("wave");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<ChargeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const plan = mockPricingPlans.find((p) => p.id === selectedPlan)!;

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await mockChargeClientSide(provider, plan.price, phone);
      setReceipt(result);
    } catch (err) {
      setError("Le paiement a échoué. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="trial-banner critical">
        <div className="tb-text">
          <Icon name="hourglass" size={20} />
          <span>Essai gratuit de 24h — il vous reste 3h12. Choisissez un forfait pour ne rien perdre.</span>
        </div>
      </div>

      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Forfaits &amp; abonnement</h1>
          <p className="text-[13px] text-text-muted mt-1">Choisissez le forfait qui correspond à votre activité.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {mockPricingPlans.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlan(p.id)}
            className={`card p-6 text-left transition ${selectedPlan === p.id ? "ring-2 ring-violet" : ""} ${p.highlighted ? "relative" : ""}`}
          >
            {p.highlighted && (
              <span className="chip active absolute -top-3 right-4">Populaire</span>
            )}
            <h3 className="text-[16px] mb-1">{p.name}</h3>
            <p className="font-display text-[26px] font-bold mb-4">
              {fmtFCFA(p.price)}<span className="text-[13px] text-text-muted font-normal">/{p.period}</span>
            </p>
            <ul className="space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[13px] text-text-dim">
                  <Icon name="check" size={14} className="text-teal flex-none" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-[15px] mb-4">Paiement — {plan.name} ({fmtFCFA(plan.price)})</h3>

          <div className="flex gap-2 mb-5">
            <button
              type="button"
              onClick={() => setProvider("wave")}
              className={`chip ${provider === "wave" ? "active" : ""}`}
            >
              Wave
            </button>
            <button
              type="button"
              onClick={() => setProvider("orange_money")}
              className={`chip ${provider === "orange_money" ? "active" : ""}`}
            >
              Orange Money
            </button>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            <div className="field">
              <label>Numéro de téléphone</label>
              <input
                required
                type="tel"
                placeholder="07 00 00 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary btn-block">
              {loading ? <span className="spin-loader" /> : `Payer ${fmtFCFA(plan.price)} via ${provider === "wave" ? "Wave" : "Orange Money"}`}
            </button>
            {error && <p className="text-[13px] text-danger">{error}</p>}
            <p className="text-[11.5px] text-text-muted">
              Si aucune clé API marchande n&apos;est configurée côté serveur, le paiement s&apos;exécute en mode
              simulation (MOCK) et génère quand même un reçu réel et vérifiable.
            </p>
          </form>
        </div>

        <div className="card p-6">
          <h3 className="text-[15px] mb-4">Reçu</h3>
          {!receipt && <p className="empty-state">Le reçu apparaîtra ici après le paiement.</p>}
          {receipt && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="check" size={18} className="text-success" />
                <p className="text-[14px] font-semibold">Paiement {receipt.mode === "mock" ? "simulé" : ""} réussi</p>
              </div>
              <div className="bg-surface border border-border-soft rounded-lg2 p-4 space-y-2 font-mono text-[12.5px]">
                <p>Code de reçu : <strong>{receipt.receiptCode}</strong></p>
                <p>Fournisseur : {receipt.provider}</p>
                <p>Mode : {receipt.mode}</p>
                <p>Montant : {fmtFCFA(receipt.amountFcfa)}</p>
                <p>Transaction : {receipt.providerTransactionId}</p>
                <p>Date : {new Date(receipt.createdAt).toLocaleString("fr-FR")}</p>
              </div>
              <p className="text-[11.5px] text-text-muted">{receipt.message}</p>
              <p className="text-[11.5px] text-text-muted">
                Ce code peut être vérifié publiquement sur <code>/verify/{receipt.receiptCode}</code>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
