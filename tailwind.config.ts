module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        jost: ["var(--font-jost)"],
      },
    },
  },
  plugins: [],
};
