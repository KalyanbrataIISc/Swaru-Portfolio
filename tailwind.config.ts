import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#07100f",
        cinder: "#07100f",
        card: "#10201c",
        mint: "#7cefaa",
        copper: "#f2a365",
        cyan: "#7ddde7",
        saffron: "#e6c56e",
        porcelain: "#f3f0e8",
        moss: "#1f3d2d",
        accent: "#7cefaa"
      },
      boxShadow: {
        premium: "0 18px 60px rgba(5, 12, 10, 0.38)"
      }
    }
  },
  plugins: []
};

export default config;
