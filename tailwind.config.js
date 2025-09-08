/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "sans-serif"], // override Tailwind’s default
        heading: ['"Roboto Slab"', "serif"], // add custom font alias
      },
    },
  },
  plugins: [],
};
