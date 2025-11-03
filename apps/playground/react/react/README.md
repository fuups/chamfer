# Chamfer React Playground

React-driven rendering of the Chamfer token showcase. The app mirrors the static HTML playground but keeps the DOM structure in JSX so we can showcase progressive enhancement hooks and future component logic.

- Vite + React 19 with theme switching and status announcements
- Token grids for surface/action/tone layers
- Sample buttons wired to the progressive enhancement hooks

## Usage

```bash
pnpm --filter @chamfer/tokens build
pnpm --filter @chamfer/core build
pnpm --filter @chamfer/playground-react dev
```

> Status: scaffolded. Install Vite and related dependencies (`pnpm install`) when network access is available to run the dev server.
