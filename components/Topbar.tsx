"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";

// Titles shown in the topbar per view (prototype topbar-title). Defaults to
// the sidebar label; a few views use a distinct heading.
const TITLES: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/comptabilite": "Revenus & comptabilité",
  "/messages-ia": "Messages IA",
  "/marketing-ia": "Marketing IA",
};

/** Faithful port of the prototype `.topbar` (activity badge + title + avatar). */
export function Topbar() {
  const pathname = usePathname();
  const nav = NAV_ITEMS.find((n) => pathname.startsWith(n.href));
  const title = TITLES[nav?.href ?? ""] ?? nav?.label ?? "ORBIT";

  return (
    <div className="topbar">
      <div>
        <div className="activity-badge" id="topbar-activity-badge">
          <span className="ti ti-point-filled" /> Mon activité
        </div>
        <h1 id="topbar-title" style={{ marginTop: 10 }}>
          {title}
        </h1>
      </div>
      <div className="topbar-right">
        <div className="avatar-circle" id="topbar-avatar">
          OB
        </div>
      </div>
    </div>
  );
}
