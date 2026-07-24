import { Icon } from "@/components/Icon";

const TIERS = [
  { name: "Bronze", threshold: 0, perk: "5% de remise sur le 2e achat" },
  { name: "Argent", threshold: 5, perk: "Livraison prioritaire" },
  { name: "Or", threshold: 15, perk: "Accès anticipé aux nouveautés" },
];

export default function LoyaltyPage() {
  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Programme de fidélité</h1>
          <p className="text-[13px] text-text-muted mt-1">Récompensez vos clients les plus fidèles.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {TIERS.map((t) => (
          <div key={t.name} className="card p-5">
            <div className="w-10 h-10 rounded-full bg-gold-soft flex items-center justify-center mb-3">
              <Icon name="loyalty" size={18} className="text-gold-dark" />
            </div>
            <h3 className="text-[15px] mb-1">{t.name}</h3>
            <p className="text-[12.5px] text-text-muted mb-3">À partir de {t.threshold} achats</p>
            <p className="text-[13px] text-text-dim">{t.perk}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
