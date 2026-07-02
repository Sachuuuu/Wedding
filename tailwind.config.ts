// tailwind.config.ts
import type { Config } from "tailwindcss";
import { siteConfig } from "./lib/config";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      // Map the colors from lib/config.ts to Tailwind color classes
      colors: {
        ivory: siteConfig.colors.background,
        blush: siteConfig.colors.accent,
        rose: siteConfig.colors.secondary,
        gold: siteConfig.colors.primary,
        champagne: siteConfig.colors.champagne,
        ink: siteConfig.colors.foreground,
        muted: siteConfig.colors.muted,
        // Custom hero colors
        "hero-text": siteConfig.colors.heroText,
        "hero-amp": siteConfig.colors.heroAmpersand,
        "hero-sub": siteConfig.colors.heroSubtitle,
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(91, 59, 61, 0.1)",
        glow: "0 12px 35px rgba(216, 167, 154, 0.24)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(247, 221, 226, 0.55), transparent 35%), radial-gradient(circle at bottom right, rgba(216, 167, 154, 0.2), transparent 25%)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" }
        }
      }
    }
  },
  plugins: []
};

export default config;