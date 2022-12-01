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
        "title-opacity": "#B4B4B4",
      },
      fonts: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
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
