import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#1e1b4b",
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
          light: "#a5b4fc",
        },
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#38bdf8",
        surface: {
          light: "#f8fafc",
          dark: "#0a0f1e",
        },
        dark: {
          bg: {
            primary: "#0a0f1e",
            secondary: "#111827",
            card: "#1e293b",
          },
          border: "#334155",
          text: {
            primary: "#f1f5f9",
            muted: "#94a3b8",
          },
        },
        light: {
          bg: {
            primary: "#ffffff",
            secondary: "#f8fafc",
            card: "#ffffff",
          },
          border: "#e2e8f0",
          text: {
            primary: "#0f172a",
            muted: "#64748b",
          },
        },
        difficulty: {
          easy: {
            bg: "#dcfce7",
            text: "#16a34a",
          },
          medium: {
            bg: "#fef3c7",
            text: "#d97706",
          },
          hard: {
            bg: "#fee2e2",
            text: "#dc2626",
          },
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        pill: "9999px",
      },
      padding: {
        card: "24px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;