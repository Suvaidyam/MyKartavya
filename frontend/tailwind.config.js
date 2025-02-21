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
        "primary": "#FF5722",
        "secondary": "#FF7C3A",
        "tertiary": "#E23D90"
      },
      textColor: {
        "primary": "#0B0B0B",
        "secondary": "#333333",
        "tertiary": "#666666"
      }
    },

  },
  plugins: [],
}
