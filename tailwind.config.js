/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#13322B', // Deep dark forest green
          light: '#1B473D',
          dark: '#0B1E1A',
        },
        cream: {
          DEFAULT: '#FAF8F5', // Warm light cream body background
          dark: '#F0EDE6',    // Soft tan backdrop
        },
        accent: {
          DEFAULT: '#00A859', // Vibrant emerald highlight
        },
        school: {
          navy: '#1e3a8a',
          gold: '#b45309',
          slate: '#334155',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}