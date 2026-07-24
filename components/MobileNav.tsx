"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_NAV_ITEMS } from "@/lib/nav";
import { Icon } from "@/components/Icon";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {MOBILE_NAV_ITEMS.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={`nav-btn ${active ? "active" : ""}`}>
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
