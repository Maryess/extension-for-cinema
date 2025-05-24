import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...colors,
        customBlue: {
          500: "#007bff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
