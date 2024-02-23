const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      background: "#fef6e4",
      heading: "#001858",
      paragraph: "#172c66",
      button: "#f582ae",
      buttonText: "#001858",
      stroke: "#001858",
      main: "#f3d2c1",
      highlight: "#fef6e4",
      secondary: "#8bd3dd",
      tertiary: "#f582ae",

      // Arctic Breeze

      abreeze: {
        background: "#fffffe",
        paragraph: "#5f6c7b",
        highlight: "#3da9fc",
        button: "#3da9fc",
        buttonText: "#fffffe",
        stroke: "#094067",
        secondary: "#90b4ce",
        tertiary: "#ef4565",
      },

      // Spring Meadow

      springm: {
        background: "#fffffe",
        paragraph: "#1b2d45",
        highlight: "#00ebc7",
        button: "#00ebc7",
        buttonText: "#00214d",
        stroke: "#00214d",
        secondary: "#ff5470",
        tertiary: "#fde24f",
      },

      // Default
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
  },
  plugins: [],
};
