import type { SVGProps } from "react";

/**
 * Minimal inline icon set (subset, hand-drawn strokes) so the app has zero
 * icon-font/CDN dependency (consistent with Koraa's approach of avoiding
 * external runtime deps where possible).
 */
const paths: Record<string, string> = {
  dashboard: "M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6V11h-6v9zm0-16v5h6V4h-6z",
  building: "M4 21V6l8-3 8 3v15M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01",
  package: "M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8",
  invoice: "M6 3h9l5 5v13H6V3zm9 0v5h5M9 12h6M9 16h6",
  reports: "M4 20V10M11 20V4M18 20v-7",
  affiliate: "M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.6 13.5l6.8-4M8.6 16.5l6.8 4",
  gift: "M20 12v9H4v-9M2 7h20v5H2V7zM12 22V7M12 7c-1-3-4-4-5-2s1 3 5 2zM12 7c1-3 4-4 5-2s-1 3-5 2z",
  flag: "M4 22V3m0 2l14-1-3 5 3 5-14 1",
  headset: "M4 14v-2a8 8 0 1116 0v2M4 14a2 2 0 002 2h1v-6H6a2 2 0 00-2 2zm16 0a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2zM8 20a2 2 0 002-2v-2H6v2a2 2 0 002 2z",
  chat: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z",
  team: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  audit: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  loyalty: "M12 21s-8-4.5-8-11a5 5 0 019-3 5 5 0 019 3c0 6.5-8 11-8 11z",
  aichat: "M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2",
  bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9zM13.7 21a2 2 0 01-3.4 0",
  card: "M2 6h20v12H2V6zM2 10h20",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35",
  plus: "M12 5v14M5 12h14",
  hourglass: "M6 2h12M6 22h12M6 2s0 5 6 8c-6 3-6 8-6 8M18 2s0 5-6 8c6 3 6 8 6 8",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M20 6L9 17l-5-5",
};

export function Icon({
  name,
  size = 18,
  className,
  fill = "none",
  ...rest
}: { name: keyof typeof paths | string; size?: number; fill?: string } & SVGProps<SVGSVGElement>) {
  const d = paths[name] ?? paths.dashboard;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}
