/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: "#18181b",
        primary: "#38bdf8",
        primaryHover: "#0ea5e9",
        border: "#27272a",
      },
      borderRadius: {
        card: "12px",
      },
      spacing: {
        cardPadding: "2rem",
        sectionGap: "1.5rem",
      },
    },
  },
  plugins: [],
};
