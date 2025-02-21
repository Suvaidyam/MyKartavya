module.exports = {
  presets: [require('frappe-ui/src/utils/tailwind.config')],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#FFFFFF",
        "secondary": "#F5F5F5",
        "tertiary": "#E23D90",
        "Quaternary": "#D9D9D9"
      },
      textColor: {
        "primary": "#FFFFFF",
        "secondary": "#FF5722",
        "tertiary": "#FF7C3A",
        "Quaternary": "#E23D90"
      },
      fontSize: {
        "primary": "47px",
        "secondary": "33px",
        "tertiary": "23px",
        "Quaternary": "19px",
        "Quinary": "16px",
        "Senary": "14px",
        "Octonary": "14px",
        "Nonary": "12px",
        "Denary": "10px"
      }
    },

  },
  plugins: [],
}

