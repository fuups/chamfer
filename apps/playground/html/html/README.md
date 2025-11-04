# Chamfer HTML Playground

Static HTML + vanilla JS showcase for Chamfer tokens and core CSS.

- Uses the generated CSS variables directly-no framework bundling.
- Theme switcher keeps `data-theme`, `color-scheme`, and the `.dark` class in sync.
- Mirrors the token sections from the React playground for easy visual comparison.

## Usage

```bash
pnpm --filter @chamfer/tokens build
pnpm --filter @chamfer/core build
pnpm --filter @chamfer/playground-html dev
```

> Network access is required once to install Vite dependencies (`pnpm install`).
