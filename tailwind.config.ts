import type { Config } from "tailwindcss";

// Color tokens & radii lifted 1:1 from the prototype (orbit-site (26).html — dashboard :root vars, "Lumen" palette)
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        card: "var(--card)",
        "card-hover": "var(--card-hover)",
        border: "var(--border)",
        "border-soft": "var(--border-soft)",
        gold: "var(--gold)",
        "gold-dark": "var(--gold-dark)",
        "gold-soft": "var(--gold-soft)",
        teal: "var(--teal)",
        "teal-dark": "var(--teal-dark)",
        "teal-soft": "var(--teal-soft)",
        violet: "var(--violet)",
        "violet-dark": "var(--violet-dark)",
        "violet-soft": "var(--violet-soft)",
        text: "var(--text)",
        "text-dim": "var(--text-dim)",
        "text-muted": "var(--text-muted)",
        danger: "var(--danger)",
        success: "var(--success)",
      },
      borderRadius: {
        xl2: "var(--radius-lg)",
        lg2: "var(--radius)",
        md2: "var(--radius-sm)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,14,31,.03), 0 12px 24px -18px rgba(16,14,31,.12)",
        card: "0 8px 20px -8px rgba(47,111,239,.15)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      maxWidth: {
        content: "1900px",
      },
    },
  },
  plugins: [],
};
export default config;
