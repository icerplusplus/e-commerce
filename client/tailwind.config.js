/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        main: "#1A94FF",
        "blue-500": "#0D5CB6",
        body: "#F5F5FA",
      },
      width: {
        container: "73.75rem",
      },
    },
  },
  plugins: [],
};
