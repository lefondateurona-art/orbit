"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { PageTransition } from "@/components/PageTransition";

/**
 * Public routes (no auth-gated dashboard chrome): the public shop page and
 * the receipt-verification stub render full-bleed, without the sidebar.
 */
function isPublicRoute(pathname: string) {
  return pathname.startsWith("/s/") || pathname.startsWith("/verify/");
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

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="flex flex-col min-h-0">
        <main className="main flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
