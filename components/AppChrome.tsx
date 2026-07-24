"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PageTransition } from "@/components/PageTransition";

/**
 * Public routes (no auth-gated dashboard chrome): the public shop page and
 * the receipt-verification stub render full-bleed, without the sidebar.
 */
function isPublicRoute(pathname: string) {
  // The marketing landing (/), the public shop (/s/*) and the receipt
  // verification page render full-bleed, without the app sidebar.
  return pathname === "/" || pathname.startsWith("/s/") || pathname.startsWith("/verify/");
}

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isPublicRoute(pathname)) {
    return (
      <div className="min-h-dvh bg-surface">
        <PageTransition>{children}</PageTransition>
      </div>
    );
  }

  // Prototype hides #app-shell until login (JS adds `.show`); the ported app
  // renders the shell directly, so it is always shown.
  return (
    <div id="app-shell" className="show">
      <Sidebar />
      <main className="main">
        <Topbar />
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
