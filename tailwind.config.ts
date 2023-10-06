import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "red-pkn": "#CD2D35",
        "cyan-pkn": "#47D0B5",
        "dark-pkn": "#010129",
        "darker-pkn": "#030317",
        "white-pkn": "#EEFFFC",
        "electric-pkn": "#FADE83",
        "grass-pkn": "#5F9A70",
        "fire-pkn": "#E9AA7C",
      },
    },
  },
  plugins: [],
};
export default config;
