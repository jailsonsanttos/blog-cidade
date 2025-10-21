/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // Se você adicionar uma pasta components no futuro
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Verde principal (pode customizar)
        secondary: '#2c5aa0', // Azul
        darkBlue: '#1e3a5f', // Azul escuro
        accent: '#f97316', // Adicione uma cor de destaque laranja para botões
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte moderna (adicione via Google Fonts)
      },
    },
  },
  plugins: [],
};