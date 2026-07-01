import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Deep, cinematic base with a warm Pashto-inspired accent
        base: {
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1b1b26",
          600: "#262635"
        },
        accent: {
          DEFAULT: "#10b981",
          soft: "#34d399",
          deep: "#059669"
        },
        gold: {
          DEFAULT: "#e0b34a",
          soft: "#f2cf78"
        }
      },
      fontFamily: {
        pashto: ['"Noto Naskh Arabic"', '"Scheherazade New"', "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(16, 185, 129, 0.45)",
        card: "0 10px 30px -12px rgba(0, 0, 0, 0.6)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.5s infinite"
      }
    }
  },
  plugins: []
};

export default config;
