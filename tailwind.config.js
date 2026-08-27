/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: "#0b3d63",
          navyDark: "#072842",
          blue: "#1b75bb",
          blueDark: "#13578c",
          blueLight: "#2e8bc9",
          lightblue: "#eaf3fa",
          lightest: "#f4f8fc",
          border: "#dfe3e8",
          borderDark: "#c2cbd4",
          sage: "#2e7d32",
          maroon: "#7a1f2b",
          saffron: "#e08d21",
          gold: "#f59e0b",
          ink: "#1f2933",
          slate: "#52606d",
          muted: "#64748b",
        },
      },
      fontFamily: {
        display: ["'Merriweather'", "Georgia", "serif"],
          sans: ['Noto Sans', 'Arial', 'sans-serif'],
        body: ["'Noto Sans'", "'Segoe UI'", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        gov: "0 1px 3px rgba(11,61,99,0.12), 0 1px 2px rgba(11,61,99,0.08)",
        "gov-md": "0 4px 6px -1px rgba(11,61,99,0.12), 0 2px 4px -1px rgba(11,61,99,0.06)",
        "gov-lg": "0 10px 15px -3px rgba(11,61,99,0.12), 0 4px 6px -2px rgba(11,61,99,0.05)",
      },
    },
  },
  plugins: [],
};
