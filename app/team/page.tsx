"use client";

import { useState } from "react";
import { mockTeam } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

export default function TeamPage() {
  const [members, setMembers] = useState(mockTeam);
  const [email, setEmail] = useState("");

  function invite(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setMembers((prev) => [...prev, { id: `tm-${prev.length + 1}`, name: email.split("@")[0], role: "member", email }]);
    setEmail("");
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Équipe</h1>
          <p className="text-[13px] text-text-muted mt-1">Gérez les membres et leurs rôles par entreprise.</p>
        </div>
      </div>

      <form onSubmit={invite} className="card p-5 mb-6 flex items-end gap-3 flex-wrap">
        <div className="field flex-1 min-w-[220px]">
          <label>Inviter par email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="collaborateur@example.com" />
        </div>
        <button type="submit" className="btn btn-primary"><Icon name="plus" size={16} /> Inviter</button>
      </form>

      <div className="card">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between px-5 py-4 border-b border-border-soft last:border-0">
            <div>
              <p className="text-[13.5px] font-semibold">{m.name}</p>
              <p className="text-[12px] text-text-muted">{m.email}</p>
            </div>
            <span className="chip">{m.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
