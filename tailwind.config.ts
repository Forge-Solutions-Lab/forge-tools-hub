import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        surface: {
          DEFAULT: "var(--bg-surface)",
          subtle: "var(--bg-surface-subtle)",
          elevated: "var(--bg-surface-elevated)",
        },
        border: {
          DEFAULT: "var(--border-color)",
          subtle: "var(--border-subtle)",
          hover: "var(--border-hover)",
        },
        theme: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
          inverted: "var(--text-inverted)",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
          text: "var(--accent-text)",
        },
        success: {
          DEFAULT: "var(--success-indicator)",
          text: "var(--success-text)",
          bg: "var(--success-bg)",
          border: "var(--success-border)",
        },
        warning: {
          DEFAULT: "var(--warning-indicator)",
          text: "var(--warning-text)",
          bg: "var(--warning-bg)",
          border: "var(--warning-border)",
        },
        error: {
          text: "var(--error-text)",
          bg: "var(--error-bg)",
          border: "var(--error-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
      },
    },
  },
  plugins: [],
};

export default config;
