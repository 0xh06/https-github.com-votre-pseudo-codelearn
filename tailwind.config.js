/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        bg3: "var(--bg3)",
        border: "var(--border)",
        text: "var(--text)",
        "text-bright": "var(--text-bright)",
        "text-dim": "var(--text-dim)",
        green: "var(--green)",
        blue: "var(--blue)",
        purple: "var(--purple)",
        yellow: "var(--yellow)",
        red: "var(--red)"
      }
    },
  },
  plugins: [],
}
