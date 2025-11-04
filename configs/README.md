# Chamfer Shared Configs

Workspace-level linting/build configurations live here. Reference them from individual packages to keep tooling consistent across the monorepo.

Available configs:

- `eslint.config.cjs` - base ESLint rules for TypeScript, React, Vue, JSON.
- `prettier.config.cjs` - shared Prettier formatting settings.
- `stylelint.config.cjs` - Stylelint rules (with property ordering) for CSS token files.
- `postcss.config.cjs` - PostCSS plugin stack (import, nesting, preset-env, autoprefixer).
