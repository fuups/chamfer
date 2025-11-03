# Chamfer UI – Session Progress

_Last update: tokens/core/playground updated for DESIGN_SYSTEM.md v1.1.0._

## Current Status

- Chamfer branding applied to `DESIGN_SYSTEM.md`.
- pnpm workspace scaffolded with initial package structure (`tokens`, `core`, `behavior`, `react`, `vue`, `angular`, `tailwind`) and app placeholders (`docs`, `playground`).
- Coordination docs (`AGENTS.md`, this file) created.
- Token generator implemented with progressive fallback chain (`hex → hsl → oklch`) and JSON artifacts.
- Local `.npmrc` forces pnpm store into the repo to avoid sandbox permission issues.
- Tokens, core baseline, and playground now align with DESIGN_SYSTEM.md v1.1.0 (structural primitives only, refreshed semantics).
- Light soft-action foregrounds updated per spec agreement (primary `#373737`, secondary `#0C727C`, success `#1F6134`, warning `#7F6000`).
- Primitive layer updated to emit `--ch-color-*` structural tokens (no generic contrast), with progressive HEX→HSL fallbacks.
- Semantic tokens add inverse helpers (`--ch-on-inverse-fg`), new text contrast targets, and solid danger invalid borders per spec.
- Playground showcases text, surface, action, and tone tokens with minimal chrome; requires local build artifacts to load Chamfer CSS.
- Playground controls keep `data-theme` + `color-scheme` in sync, announce changes via SR status, and demonstrate improved contrast/focus defaults.
- Solid action tokens updated per review decisions (light secondary `#0C727C`/white, light warning fg `#5A3A00`, dark secondary fg `#102A2C`, dark danger `#C42020`/white).
- `ch-font-sans`/`ch-font-mono` now include Geist families; playground loads the hosted Geist CSS for visual parity.
- Added local fallback (`0.875rem`) for `font-size` so buttons read correctly even before tokens/core CSS are rebuilt.
- HTML/React playgrounds now render real `ch-button` components with the shared core styles.
- `@chamfer/tailwind` now emits `theme.css` + `utilities.css` (plus optional preset/plugin exports) so Oxide builds can consume `@chamfer/tailwind/css` without JS plugins.
- Tailwind playgrounds cover both stacks: static HTML + Tailwind and React + Tailwind (both under `apps/playground/react|html`) and import the new utility bundle.
- Tailwind preset + playgrounds aligned to Tailwind CSS 4.1.16 using the new `tailwindcss()` config helper (requires Node 20.19+/22.12+).
- Tailwind demos use Tailwind CSS v4 via `@tailwindcss/vite`; Node 20.19+/22.12+ required for dev.
- Shared lint/format toolchain (ESLint, Prettier, Stylelint, PostCSS) centralized under `configs/` with root wrappers.
- Playgrounds split into four workspaces: HTML, HTML+Tailwind, React, and React+Tailwind under `apps/playground/*/*`.
- Component specs live under `components/` (Button spec drafted) to drive implementation + docs.
- Framework wrappers (React/Vue/Angular) now stamp `ch-button` + `data-ch-component="button"` automatically and respect ripple options via the shared behavior helper.
- HTML playground gains a shared navigation shell with component-specific pages (`components/button.html`), centralised theme/ripple bootstrapping, and a high-contrast preview toggle with raised-ripple demo coverage.
- Astro docs app scaffolded with shared layout/theme controls, content collections, and initial button documentation sourced from the playground examples.
- Button tokens now expose density-aware padding, forced-color fallbacks, and loading attributes; core CSS consumes the new aliases with focus/ripple fallbacks and `@media (forced-colors: active)` support.
- `@chamfer/behavior` suppresses ripple when loading/disabled, works for anchors, and ships a Vitest suite covering keyboard activation + loading suppression.
- Button playground showcases loading, raised ripple, anchor/input semantics, and RTL overflow scenarios; Tailwind preset exposes matching button spacing/radius tokens.

## Active Todos

1. Run `pnpm --filter @chamfer/tokens build` and `pnpm --filter @chamfer/core build` locally (sandbox blocks `tsx`).
2. Button follow-up: regenerate package builds locally and plan spinner integration for the loading state.
3. Smoke-test the React playground locally (`pnpm --filter @chamfer/playground-react dev`) to confirm theme toggles still behave; repeat for the other playgrounds once dependencies are installed.
4. Add SEO integrations (sitemap, structured data) + global navigation polish in Astro app.
5. Decide whether to adopt a smaller interactive label size and update `--ch-text-sm` accordingly.
6. Add automated smoke tests for the Tailwind preset/plugin (snapshot or fixture coverage).
7. Expand docs coverage (tokens overview, Tailwind usage, accessibility checklist enforcement).

## Upcoming Questions

- Confirm preferred documentation deployment target (GitHub Pages vs Vercel).
- Determine versioning cadence pre-1.0 (weekly/nightly alpha?).

## Recently Completed

- Initial repo skeleton established (this session).
- Tokens/core/playground updated to design system v1.1.0 (structural palette refactor, inverse/on tokens, focus parity).
- Token generation pipeline implemented (awaiting dependency install to execute).
- Core bundle implemented with baseline CSS and generated outputs.
- Playground rebuilt to showcase tokens using updated semantics and density/theme controls.
- Removed soft token comparison panels now that foreground decisions are finalized.
- Removed temporary action foreground comparison cards after decisions were locked.
- Updated light warning foreground to `#5A3A00` following visual review.
- Tailwind CSS bundle exposes generated `ch-*` utilities (`@chamfer/tailwind/css`), with preset/plugin kept for Node builds.
- Shared lint/format toolchain wired to repo scripts; `pnpm run lint` / `pnpm run format` validated.
- React app migration for the core playground completed; Vite config updated with React plugin.
- Reorganized playgrounds into `apps/playground/html|react/(html|tailwind)` with unique workspace names.
- Drafted `components/button.md` spec to formalize tokens, variants, and accessibility requirements.

Keep this file updated as tasks progress to avoid context loss across long-running sessions.
