# @chamfer/tokens

Design tokens for Chamfer UI authored in TypeScript and emitted as layered CSS that follows the progressive delivery rules in `DESIGN_SYSTEM.md` v1.0 (HEX → HSL → OKLCH, `@supports`-gated upgrades, rem-based scales).

## Outputs

- `dist/css/primitives.css` – light/dark/high-contrast primitives with progressive canonical upgrades
- `dist/css/semantic.css` – semantic tokens derived from primitives
- `dist/css/index.css` – combined primitives + semantic bundle
- `dist/json/tokens.json` – structured data for build-time tooling
- `dist/index.js` / `.d.ts` – typed exports for adapters and documentation tooling

## Scripts

- `pnpm run build` – cleans `dist/`, compiles TypeScript, and regenerates CSS/JSON artifacts
- `pnpm run typecheck` – validates the source TypeScript without emitting files

> Component token generation will be layered on once components are implemented.
