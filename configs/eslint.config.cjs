/**
 * Chamfer ESLint base configuration.
 * Each workspace extends this via `extends: ["../../configs/eslint.config.cjs"]`
 * or by re-exporting it from a root `.eslintrc.cjs`.
 */
module.exports = {
  root: false,
  env: {
    es2021: true,
    browser: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: false
  },
  plugins: ["@typescript-eslint", "import"],
  settings: {
    "import/resolver": {
      typescript: true
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  rules: {
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        pathGroups: [
          {
            pattern: "@chamfer/**",
            group: "internal",
            position: "after"
          }
        ],
        pathGroupsExcludedImportTypes: ["builtin"]
      }
    ],
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.{ts,tsx,js,jsx}",
          "**/*.spec.{ts,tsx,js,jsx}",
          "**/*.stories.{ts,tsx,js,jsx}",
          "configs/**",
          "**/vite.config.{ts,js}",
          "**/tailwind.config.{ts,js}",
          "**/postcss.config.{ts,js,cjs}"
        ]
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ]
  },
  overrides: [
    {
      files: ["**/*.tsx", "**/*.jsx"],
      plugins: ["react", "react-hooks", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier"
      ],
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      settings: {
        react: { version: "detect" }
      },
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off"
      }
    },
    {
      files: ["**/*.vue"],
      extends: ["plugin:vue/vue3-recommended", "prettier"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        sourceType: "module"
      },
      rules: {
        "vue/multi-word-component-names": "off"
      }
    },
    {
      files: ["**/*.json", "**/*.json5"],
      parser: "jsonc-eslint-parser",
      extends: ["plugin:jsonc/recommended-with-json"],
      rules: {
        "jsonc/array-bracket-newline": ["error", { minItems: 4 }],
        "jsonc/object-property-newline": [
          "error",
          { allowMultiplePropertiesPerLine: false }
        ]
      }
    }
  ],
  ignorePatterns: ["dist", "node_modules", "*.d.ts", ".pnpm-home", ".turbo", ".astro"]
};
