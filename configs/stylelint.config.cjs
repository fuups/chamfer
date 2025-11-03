module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  rules: {
    "color-function-notation": null,
    "alpha-value-notation": null,
    "media-feature-range-notation": null,
    "color-hex-length": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "responsive", "variants", "layer"]
      }
    ],
    "selector-class-pattern": [
      "^[a-z][a-z0-9\\-\\_]*$",
      {
        message: "Expected class selector to be kebab-case"
      }
    ],
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      {
        type: "at-rule",
        name: "supports"
      },
      {
        type: "at-rule",
        name: "media"
      },
      "rules"
    ],
    "order/properties-order": null
  },
  ignoreFiles: ["**/dist/**", "**/node_modules/**"]
};
