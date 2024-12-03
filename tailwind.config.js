/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004D40',
          dark: '#00352C',
          light: '#00796B',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#00796B',
          dark: '#004D40',
          light: '#009688',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#FFD700',
          dark: '#FFC000',
          light: '#FFE44D',
          foreground: '#1f2937',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Articulat CF', 'sans-serif'],
      },
    },
  },
  plugins: [],
};