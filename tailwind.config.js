/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        blob: 'blob 10s infinite ease-in-out',
        'blob-delay': 'blob 14s infinite ease-in-out 4s',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite 1.2s',
        'float-slower': 'float 8s ease-in-out infinite 2.4s',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-60px) scale(1.08)' },
          '66%': { transform: 'translate(-30px,30px) scale(0.94)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

