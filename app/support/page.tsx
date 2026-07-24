"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

const FAQ = [
  { q: "Comment créer une entreprise ?", a: "Allez dans « Entreprises » puis cliquez sur « Nouvelle entreprise »." },
  { q: "Comment configurer les paiements Wave / Orange Money ?", a: "Renseignez vos clés marchandes dans les variables d'environnement — sinon Orbit fonctionne en mode simulation." },
  { q: "Comment fonctionne l'essai gratuit ?", a: "Vous disposez de 24h d'essai gratuit avant de devoir choisir un forfait sur la page Forfaits." },
];

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Support</h1>
          <p className="text-[13px] text-text-muted mt-1">Une question ? Nous sommes là pour vous aider.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_380px] gap-6">
        <div className="card p-5">
          <h3 className="text-[15px] mb-4 flex items-center gap-2"><Icon name="headset" size={16} /> Questions fréquentes</h3>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-border-soft pb-4 last:border-0">
                <p className="text-[13.5px] font-semibold mb-1">{f.q}</p>
                <p className="text-[13px] text-text-dim">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-[15px] mb-4">Contacter le support</h3>
          {sent ? (
            <p className="text-[13.5px] text-success">Votre message a été envoyé. Nous répondons sous 24h.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="field"><label>Message</label><textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} /></div>
              <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
