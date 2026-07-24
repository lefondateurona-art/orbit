"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mockCompanies } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

const THEMES = [
  { id: "default", label: "Lumen (défaut)" },
  { id: "pro", label: "Pro (sombre / doré)" },
  { id: "premium", label: "Premium (émeraude)" },
];

const FONTS = ["Inter", "Space Grotesk", "Georgia", "JetBrains Mono"];

export default function ShopSettingsPage() {
  const params = useParams<{ companyId: string }>();
  const company = mockCompanies.find((c) => c.id === params.companyId);
  const [theme, setTheme] = useState("default");
  const [font, setFont] = useState("Inter");
  const [videoUrl, setVideoUrl] = useState("");
  const [slug, setSlug] = useState(company?.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "ma-boutique");

  const shopUrl = `https://orbit.app/s/${slug}`;

  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Paramètres boutique — {company?.name ?? params.companyId}</h1>
          <p className="text-[13px] text-text-muted mt-1">Personnalisez la vitrine publique connectée à Koraa.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_360px] gap-6">
        <div className="card p-6 space-y-6">
          <div>
            <h3 className="text-[14px] mb-3">Thème</h3>
            <div className="flex gap-3 flex-wrap">
              {THEMES.map((t) => (
                <button key={t.id} onClick={() => setTheme(t.id)} className={`chip ${theme === t.id ? "active" : ""}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Police</label>
            <select value={font} onChange={(e) => setFont(e.target.value)}>
              {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="field">
            <label>Vidéo de présentation (YouTube / TikTok)</label>
            <input
              placeholder="https://youtube.com/watch?v=... ou https://tiktok.com/@..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Slug de la boutique publique</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} />
          </div>

          <button className="btn btn-primary">Enregistrer les paramètres</button>
        </div>

        <div className="card p-6">
          <h3 className="text-[14px] mb-3">Lien de la boutique publique</h3>
          <div className="bg-surface border border-border-soft rounded-lg2 p-3 flex items-center justify-between gap-2 mb-3">
            <code className="text-[12px] truncate">{shopUrl}</code>
            <Icon name="arrow" size={14} className="flex-none text-text-muted" />
          </div>
          <Link href={`/s/${slug}`} className="btn btn-ghost btn-block btn-sm">Prévisualiser la boutique</Link>
          <p className="text-[11.5px] text-text-muted mt-4">
            Cette boutique publique est le point de connexion avec Koraa : les créateurs Koraa peuvent y renvoyer
            leurs communautés directement vers vos produits.
          </p>
        </div>
      </div>
    </div>
  );
}
