"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { Icon } from "@/components/Icon";

/** Faithful port of the prototype `.sidebar` (aside.sidebar > .side-link). */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="wordmark">ORBIT</div>
      {NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={`side-link ${active ? "active" : ""}`}>
            <Icon name={item.icon} /> {item.label}
          </Link>
        );
      })}
      <div className="side-switch">
        <Link className="side-link" href="/dashboard">
          <Icon name="arrows-exchange" /> Changer d&apos;activité
        </Link>
        <Link className="side-link" href="/">
          <Icon name="logout" /> Déconnexion
        </Link>
      </div>
    </aside>
  );
}
