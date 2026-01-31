/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-pink': '#ff00ff',
        'neon-blue': '#00ffff',
        'dark-bg': '#0a0a0a',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 10px #39ff14, 0 0 20px #39ff14',
        'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff',
      },
    },
  },
  plugins: [],
}
