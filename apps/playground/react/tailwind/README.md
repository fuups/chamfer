# Chamfer React + Tailwind Playground

React demo that consumes Chamfer’s Tailwind CSS bundle (`@chamfer/tailwind/css`) to showcase the utility classes in a component-driven setting.

- Imports Chamfer core CSS + the Tailwind utility layer, no custom plugin configuration needed.
- Mirrors the HTML + Tailwind playground (theme toggle, swatches, typography, buttons).
- Useful for verifying React + Tailwind integration before wiring examples into the docs site.

## Prerequisites

Build the core bundle (tokens + CSS variables) first so the utilities resolve correctly:

```bash
pnpm --filter @chamfer/core build
pnpm --filter @chamfer/tailwind build
```

Install dependencies (Tailwind 4 currently requires Node ≥20.19 or ≥22.12):

```bash
pnpm install
```

## Running the playground

```bash
pnpm --filter @chamfer/playground-react-tailwind dev
```

This starts Vite (default http://localhost:5173). Explore how the Tailwind utilities respond to theme changes and verify future token updates against utility consumers.

## File map

- `tailwind.config.js` – minimal content scanner (no custom plugins required).
- `vite.config.ts` – registers `@tailwindcss/vite` alongside React.
- `src/index.css` – imports `tailwindcss` and `@chamfer/tailwind/css`, plus base guards.
- `src/App.tsx` – the React demo content.

Clone this app into reference docs or smoke tests whenever Tailwind coverage needs validation.
