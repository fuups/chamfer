# Chamfer Playground

Framework-agnostic HTML playground that imports Chamfer tokens and core CSS for rapid iteration. Current features:

- Vite-based dev server entry point (theme, contrast, density controls)
- Token swatches demonstrating text, surfaces, and intent palettes
- Sample button styles consuming the generated tokens

## Usage

```bash
pnpm --filter @chamfer/tokens build
pnpm --filter @chamfer/core build
pnpm --filter @chamfer/playground dev
```

> Status: scaffolded. Install Vite and related dependencies (`pnpm install`) when network access is available to run the dev server.
