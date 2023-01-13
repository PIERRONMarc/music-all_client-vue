/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        colors: {
            'bg-color': '#1D1D1D',
            'primary-color': '#F74539',
            'primary-dark-color': '#bc0010',
            'text-color': '#FFFFFF',
            'bg-light-color': '#2F2F2F'
        },
        backgroundImage: {
            'treble-clef-background': "url('src/assets/icons/treble-clef-background.svg')",
        },
        backgroundSize: {
            '40%': '40%'
        },
        fontFamily: {
            'montserrat': ['Montserrat'],
            'roboto': ['Roboto'],
        },
    },
  },
  plugins: [],
}
