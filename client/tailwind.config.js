module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Exo 2'", 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      colors: {
        brynas: {
          black: '#080808',
          dark: '#111111',
          'dark-2': '#181818',
          'dark-3': '#222222',
          gold: '#F0B800',
          'gold-light': '#FFD000',
          'gold-dark': '#C09400',
          red: '#CC1417',
          'red-dark': '#A00F12',
          muted: '#aaaaaa',
        },
      },
    },
  },
  plugins: [],
};