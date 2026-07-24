"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Awa Diarra");
  const [email, setEmail] = useState("awa@example.com");

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Paramètres</h1>
          <p className="text-[13px] text-text-muted mt-1">Votre profil et vos préférences de compte.</p>
        </div>
      </div>

      <div className="card p-6 max-w-xl space-y-4">
        <div className="field"><label>Nom complet</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div className="field"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <button className="btn btn-primary">Enregistrer</button>
      </div>
    </div>
  );
}
