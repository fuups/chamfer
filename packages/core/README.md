# @chamfer/core

Framework-agnostic CSS foundation that composes Chamfer semantic tokens and baseline styles into ready-to-use bundles.

## Outputs

- `@chamfer/core/css` – full bundle (primitives + semantic tokens + baseline)
- `@chamfer/core/css/base` – baseline only (useful when tokens are already loaded)
- `dist/index.js` – typed utilities for consumers (`VERSION`, bundle path constants)

## Scripts

- `pnpm run build` – cleans, compiles TypeScript, and regenerates CSS bundles (requires `@chamfer/tokens` to be built first)
- `pnpm run typecheck` – validates TypeScript sources

> Component-specific layers will be added as the design system evolves.
