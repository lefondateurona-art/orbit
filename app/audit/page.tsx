import { mockAuditLog } from "@/lib/mock-data";
import { Icon } from "@/components/Icon";

export default function AuditPage() {
  return (
    <div>
      <div className="topbar">
        <div>
          <h1 className="text-[22px]">Journal d&apos;audit</h1>
          <p className="text-[13px] text-text-muted mt-1">Historique des actions effectuées sur vos entreprises.</p>
        </div>
      </div>

      <div className="card">
        {mockAuditLog.map((entry) => (
          <div key={entry.id} className="flex items-center gap-3 px-5 py-4 border-b border-border-soft last:border-0">
            <Icon name="audit" size={16} className="text-text-muted flex-none" />
            <div className="flex-1">
              <p className="text-[13px]"><strong>{entry.actor}</strong> a {entry.action} — {entry.entity}</p>
              <p className="text-[11.5px] text-text-muted">{entry.at}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
