/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 10px 0 rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
  'custom-bg': "url('https://images3.alphacoders.com/120/thumb-1920-1209094.jpg')",
  'custom-bg-dark': "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images3.alphacoders.com/120/thumb-1920-1209094.jpg')",
}
    },
  },
  plugins: [],
};
