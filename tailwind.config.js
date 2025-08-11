/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}", // if you have layout files
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366F1", // Example brand color
          dark: "#4F46E5",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Good for clean portfolio typography
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeUp: "fadeUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
