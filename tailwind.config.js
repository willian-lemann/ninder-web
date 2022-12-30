module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },

    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#6A3093",
        secondary: "#D1D1E9",
        "light-primary": "#A044FF",
        "title-opacity": "#B4B4B4",
        black: "#333333",
        "red-google": "#D93025",
        "button-opacity": "#E2E2E2",
      },
      fonts: {
        primary: ["Roboto"],
        secondary: ["Inter"],
      },

      animation: {
        fadeIn: "fadeIn 0.3s ease",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
