/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores oficiales del UNO
        uno: {
          blue: '#0000FF',
          green: '#008000',
          red: '#FF0000',
          yellow: '#FFFF00',
          black: '#000000',
          white: '#FFFFFF',
          // Variaciones para diferentes usos
          'blue-light': '#4040FF',
          'blue-dark': '#0000CC',
          'green-light': '#40A040',
          'green-dark': '#006000',
          'red-light': '#FF4040',
          'red-dark': '#CC0000',
          'yellow-light': '#FFFF40',
          'yellow-dark': '#CCCC00',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 