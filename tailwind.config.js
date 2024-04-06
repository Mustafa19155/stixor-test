/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1201px",
        "2xl": "1401px",
      },
      colors: {
        primary: "#F9FAFE",
        gray: "#E2DFF8",
        purple: "#5041BC",
        gray2: "#797D8C",
        blue: "#04103B",
        gray3: "#D2D2D2",
        gray4: "#9AA8BD",
      },
    },
  },
  plugins: [],
};
