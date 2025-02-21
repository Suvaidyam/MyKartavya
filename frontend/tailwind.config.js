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
        "primary": "var(--primary-color)",
        "secondary": "var(--secondary-color)",
        "tertiary": "var(--tertiary-color)",
        "quaternary": "var(--quaternary-color)"
      },
      colors: {
      primary: "var(--primary-color)",
      secondary: "var(--secondary-color)",
      tertiary: "var(--tertiary-color)",
      quaternary: "var(--quaternary-color)",
      },
      fontSize: {
        heading1: "47px",
        heading2: "33px",
        heading3: "23px",
        heading4: "19px",
        bodyh1: "16px",
        bodyh2: "14px",
        button: "14px",
        caption: "12px",
        qverline: "10px",
      },
      
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      }

    },

  },
  plugins: [],
}

