"use client";

import { useState } from "react";

const CONVERSATIONS = [
  { id: "c1", name: "Awa Diarra", preview: "Merci pour la livraison rapide !", time: "10:24" },
  { id: "c2", name: "TechHub CI — équipe", preview: "Le rapport de ventes est prêt.", time: "Hier" },
  { id: "c3", name: "Support Orbit", preview: "Votre ticket #128 a été résolu.", time: "Lun" },
];

export default function MessagesPage() {
  const [active, setActive] = useState(CONVERSATIONS[0].id);

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Messages</h1>
          <p className="text-[13px] text-text-muted mt-1">Vos échanges avec clients et équipe.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[320px_1fr] gap-6">
        <div className="card p-2">
          {CONVERSATIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`w-full text-left px-3 py-3 rounded-lg2 mb-1 ${active === c.id ? "bg-violet-soft" : "hover:bg-surface"}`}
            >
              <div className="flex justify-between">
                <p className="text-[13.5px] font-semibold">{c.name}</p>
                <span className="text-[11px] text-text-muted">{c.time}</span>
              </div>
              <p className="text-[12px] text-text-muted truncate">{c.preview}</p>
            </button>
          ))}
        </div>
        <div className="card p-5 flex items-center justify-center">
          <p className="empty-state">Sélectionnez une conversation pour afficher les messages.</p>
        </div>
      </div>
    </div>
  );
}
