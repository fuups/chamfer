# @chamfer/tailwind

Chamfer’s Tailwind package ships ready-to-use CSS layers so you can reach all of our token-driven utilities without relying on Tailwind’s JavaScript plugin pipeline (which is currently unavailable in the Oxide runtime used by Tailwind CSS v4). The package still exposes the preset/plugin for future Node-driven builds, but day-to-day you only need to import the CSS bundle.

## Installation

```bash
pnpm add -D @chamfer/tailwind tailwindcss
```

Make sure Chamfer’s core CSS (e.g. `@chamfer/core/css`) is in your project so the underlying CSS variables exist.

## Usage

```css
/* src/index.css */
@import "tailwindcss";
@import "@chamfer/tailwind/theme.css";
@import "@chamfer/tailwind/utilities.css";

/* or simply */
/* @import "@chamfer/tailwind/css"; */
```

Import order matters: keep `tailwindcss` first so the Chamfer layers augment the base utilities instead of being overridden.

### What you get

- Color utilities such as `bg-ch-action-primary-soft`, `text-ch-tone-warning-foreground`, `border-ch-border-ui`, and `ring-ch-focus-accent` backed by Chamfer’s CSS variables (dark/high-contrast safe out of the box).
- Spacing helpers (`p-ch-md`, `px-ch-lg`, `gap-ch-sm`, etc.), radii (`rounded-ch-pill`), min heights for pressables (`min-h-ch-pressable-md`), box shadows (`shadow-ch-md`), line heights (`leading-ch-tight`), and font-weight utilities (`font-ch-semibold`).
- Focus helpers: `focus-ring-ch` and `focus-outline-ch` pair with Tailwind modifiers (`focus-visible:focus-ring-ch`) for progressive focus styling.
- Because the classes are delivered as plain CSS, they work regardless of whether you are using Tailwind’s Vite plugin, the CLI, or PostCSS.

### Optional: Node-driven builds

If you are running Tailwind through its Node driver (e.g. `TAILWIND_DRIVER=node` or the classic CLI), you can still opt into the preset/plugin exports:

```ts
import chamferTailwindPlugin, { chamferTailwindPreset } from "@chamfer/tailwind";

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  presets: [chamferTailwindPreset],
  plugins: [chamferTailwindPlugin]
};
```

They mirror the CSS bundle and stay in sync with each release.

## Example

```tsx
export function ChamferTailwindButton() {
  return (
    <button
      className="min-h-ch-pressable-md px-ch-lg rounded-ch-md font-ch-semibold bg-ch-action-warning text-ch-action-warning-foreground focus-visible:focus-ring-ch transition"
    >
      Warn
    </button>
  );
}
```

## Notes

- The CSS bundle assumes Chamfer tokens are present (usually via `@chamfer/core/css`). Without them, the variables resolve to defaults and the utilities lose fidelity.
- If you are running Tailwind through Node (e.g. `TAILWIND_DRIVER=node`), you can still opt into the `chamferTailwindPreset`/`chamferTailwindPlugin` exports; they mirror the CSS generation logic and will stay in sync.
- Rebuild `@chamfer/tailwind` whenever tokens change (`pnpm --filter @chamfer/tokens build && pnpm --filter @chamfer/core build && pnpm --filter @chamfer/tailwind build`) so the generated utilities pick up new values.
