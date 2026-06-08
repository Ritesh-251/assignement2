import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6EC",
        rose: "#9B2335",
        burgundy: "#800020",
        gold: "#C9A84C",
        charcoal: "#2D2D2D"
      },
      boxShadow: {
        premium: "0 20px 60px rgba(45, 45, 45, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
