const primeui = require('tailwindcss-primeui');

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: ['selector', '[class="p-dark"]'],
  plugins: [primeui]
};