/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr', // TopBar, then ChartBar
      },
      gridTemplateColumns: {
        layout: '300px 1fr', // NavBar, then ChartBar
      },
    },
  },
  plugins: [
    daisyui,
  ],
}