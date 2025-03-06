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
        alibabaOrange: "#ff6a00",
        darkGray: "#333333",
        lightGray: "#f5f5f5",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;
