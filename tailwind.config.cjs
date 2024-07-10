module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // This enables dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#be185d',
        'sidebar-bg': '#f0f4f8',
        'widget-bg': '#f0f4f8',
        'greeting': '#c4c7c5',
        'text-primary': '#282c34',
        'chart-bar': '#b6d3f8',
      },
    },
  },
  plugins: [],
}