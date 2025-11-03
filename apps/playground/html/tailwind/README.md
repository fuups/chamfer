# Chamfer HTML + Tailwind Playground

Static HTML demo that exercises Chamfer’s Tailwind CSS bundle (no framework runtime required).

- Uses Tailwind CSS v4 with Chamfer’s prebuilt utilities (`@chamfer/tailwind/css`).
- Mirrors the vanilla HTML playground: theme toggle, swatches, tone cards, and button examples.
- Helpful for quickly validating color/spacing regressions once tokens are rebuilt.

## Usage

```bash
pnpm --filter @chamfer/core build        # ensures tokens + core CSS exist (if not already built)
pnpm --filter @chamfer/tailwind build    # emits the Tailwind utility bundle
pnpm --filter @chamfer/playground-html-tailwind dev
```

Then visit http://localhost:5174/. Tailwind’s Oxide runtime does not support JavaScript plugins yet, so the playground simply imports:

```css
@import "tailwindcss";
@import "@chamfer/tailwind/css";
```

Tailwind 4 currently requires Node ≥20.19 or ≥22.12.
