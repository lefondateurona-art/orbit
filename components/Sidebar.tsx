"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { Icon } from "@/components/Icon";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="wordmark">ORBIT</div>
      <nav className="flex-1">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`side-link ${active ? "active" : ""}`}>
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="pt-3 mt-3 border-t border-border-soft">
        <p className="text-[11px] text-text-muted px-3">Polaris · Orbit &amp; Koraa partagent le même backend.</p>
      </div>
    </aside>
  );
}
