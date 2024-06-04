import { cssColor } from "./src/mui/color";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        me: cssColor,
      },
      fontSize: {
        xss: "0.65rem",
      },
    },
  },
  plugins: [],
};
