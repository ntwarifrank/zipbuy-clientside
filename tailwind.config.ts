import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        alibabaOrange: "#FFC831",
        darkGray: "#333333",
        lightGray: "#f5f5f5",
        text: "#ff6a00",
        dashboaldColor:"#FFFFFF",
        darkMode:"#161c24",
        darkText:"#919eab",
        cardBackground:"#919EAB26",
        mainColor:"#E5E7EB",
        viewCoverColor:"#C1C0E514",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true }),],
} satisfies Config;
