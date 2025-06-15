module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        purple1: '#9A77CF',
        purple2: '#543884',
        purple3: '#262254',
        magenta: '#A13670',
        pink: '#EC4176',
        peach: '#FFA45E',
      },
      fontFamily: {
        helvetica: ['Helvetica Neue', 'Arial', 'sans-serif'],
        spacemono: ['Space Mono', 'monospace']
      }
    },
  },
  plugins: [],
}; 