import { mockMilestones } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

export default function MilestonesPage() {
  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Paliers</h1>
          <p className="text-[13px] text-text-muted mt-1">Vos objectifs business et récompenses associées.</p>
        </div>
      </div>

      <div className="space-y-3">
        {mockMilestones.map((m) => {
          const pct = Math.min(100, Math.round((m.progress / m.threshold) * 100));
          return (
            <div key={m.id} className={`orbit-milestone-card ${m.sealed ? "sealed" : "open"} card`}>
              <Icon name={m.sealed ? "check" : "flag"} size={22} />
              <div>
                <h4>{m.label}</h4>
                <p>{m.progress.toLocaleString("fr-FR")} / {m.threshold.toLocaleString("fr-FR")} ({pct}%)</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
