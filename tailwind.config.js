/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
			'main-bg': '#151821',
			'main-accent': '#ea3957',
			'main-accent-hover': '#9d263a',
			'main-text': '#c0c8c6',
			'main-text-hover': '#767b7a',
			'alt-accent': '#dd8970',
			'main-subtle': '#454f6d',
			'main-subtle-hover': '#2d3347',
			'main-code-bg': '#282a36'
		},
    extend: {},
  },
  plugins: [],
}
