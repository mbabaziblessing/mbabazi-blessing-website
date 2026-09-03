/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        obsidian: "#07080D",
        midnight: "#0B0D14",
        charcoal: "#11131C",
        surface: "#151722",
        elevated: "#1A1C28",

        alabaster: "#F5F5F7",
        graphite: "#B8B4C2",

        vapor: "#AA3BFF",
        "vapor-light": "#C78AFF",
        "vapor-dark": "#7424B8",

        "soft-purple": "#171222",
        "soft-blue": "#0E1220",
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],

        heading: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],

        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          "monospace",
        ],
      },

      boxShadow: {
        glow: "0 0 40px rgba(170, 59, 255, 0.18)",
        "glow-lg": "0 0 90px rgba(170, 59, 255, 0.16)",
        "glow-soft": "0 0 120px rgba(170, 59, 255, 0.10)",
        "inner-glow": "inset 0 0 60px rgba(170, 59, 255, 0.05)",
      },

      backgroundImage: {
        "vapor-radial":
          "radial-gradient(circle at center, rgba(170, 59, 255, 0.18), transparent 65%)",

        "hero-glow":
          "radial-gradient(circle at 70% 45%, rgba(170, 59, 255, 0.16), transparent 35%), radial-gradient(circle at 42% 30%, rgba(92, 63, 180, 0.07), transparent 38%)",

        "purple-wash":
          "radial-gradient(circle at 50% 0%, rgba(170, 59, 255, 0.11), transparent 45%)",

        "blue-wash":
          "radial-gradient(circle at 50% 20%, rgba(67, 97, 180, 0.08), transparent 50%)",

        "soft-violet":
          "linear-gradient(180deg, rgba(170, 59, 255, 0.045), transparent 45%)",

        "dark-grid":
          "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",

        "dark-grid-violet":
          "linear-gradient(rgba(170,59,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(170,59,255,0.028) 1px, transparent 1px)",
      },

      backgroundSize: {
        grid: "40px 40px",
      },

      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      borderRadius: {
        "4xl": "2rem",
      },
    },
  },

  plugins: [],
};