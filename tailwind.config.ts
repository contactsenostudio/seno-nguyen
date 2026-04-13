import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir:    "#0a0a0a",
        "noir-2": "#111111",
        "noir-3": "#1a1a1a",
        or:      "#c9a84c",
        "or-light": "#e8c97a",
        "or-pale": "#f5e6c0",
        blanc:   "#f8f5ef",
        "blanc-2": "#ede8df",
        gris:    "#888880",
        "gris-2":"#555550",
        // aliases pour ne pas casser les anciens composants
        gold:    "#c9a84c",
        cream:   "#f8f5ef",
        charcoal:"#0a0a0a",
        surface: "#111111",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans:    ["'Montserrat'", "'Helvetica Neue'", "sans-serif"],
        serif:   ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        "expo-out":    "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
