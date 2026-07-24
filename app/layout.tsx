import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "ORBIT",
  description: "Le tableau de bord business de la plateforme Polaris.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2F6FEF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&family=Montserrat:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&family=Fraunces:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppChrome>{children}</AppChrome>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
