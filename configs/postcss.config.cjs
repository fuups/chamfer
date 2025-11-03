module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {},
    "postcss-custom-media": {},
    "postcss-preset-env": {
      stage: 1,
      features: {
        "focus-visible-pseudo-class": false
      }
    },
    autoprefixer: {}
  }
};
