# Chamfer UI - Session Progress

_Last update: Docs ripple helper now bundles as a hashed asset (inline limit disabled) with behavior logic inlined for GitHub Pages compatibility; mobile drawer polish already landed._

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
- Astro docs app scaffolded with shared layout/theme controls, content collections, and initial foundations/roadmap content sourced from the playground and spec.
- Button tokens now expose density-aware padding, forced-color fallbacks, and loading attributes; core CSS consumes the new aliases with focus/ripple fallbacks and `@media (forced-colors: active)` support.
- `@chamfer/behavior` suppresses ripple when loading/disabled, works for anchors, and ships a Vitest suite covering keyboard activation + loading suppression.
- Button playground showcases loading, raised ripple, anchor/input semantics, and RTL overflow scenarios; Tailwind preset exposes matching button spacing/radius tokens.
- Ripple entry animation eased to start from a smaller wave so presses feel less “poppy” while still covering the full control (`packages/core/src/base.css`, `packages/core/src/button.css`).
- Ripple styling is now component-agnostic: baseline CSS exposes `--ch-ripple-*` tokens and button styles map their semantics onto those shared hooks. Default hover/press opacities are dialed back so the wave reads as subtle feedback instead of a flash.
- Ripple helper now mirrors the Material ripple structure: it injects a dedicated container+pseudo-element, drives hover/press via classes, and leaves colour/opacity entirely in CSS (`--ch-ripple-*` tokens) for predictable overrides.
- Docs playground now imports `@chamfer/behavior` directly; removed the bespoke `init-buttons.js` shim so live demos stay in lockstep with the package.
- Authored `COMPONENT_CREATION_GUIDE.md` to capture the soup-to-nuts workflow for shipping a new component; linked it from `AGENTS.md` alongside the design system and documentation guides.

## Active Todos

1. Smoke-test the React playground locally (`pnpm --filter @chamfer/playground-react dev`) to confirm theme toggles still behave; repeat for the other playgrounds once dependencies are installed.
2. Add SEO integrations (sitemap, structured data) + global navigation polish in Astro app.
3. Decide whether to adopt a smaller interactive label size and update `--ch-text-sm` accordingly.
4. Add automated smoke tests for the Tailwind preset/plugin (snapshot or fixture coverage).
5. Expand docs coverage (guides, package reference, theming recipes) and integrate live playground snippets.
6. Re-run GitHub Pages workflow (after local package builds) to validate base-path assets + ripple initializer bundle.
7. Keep docs ripple helper in sync with `@chamfer/behavior` (longer-term: import the built bundle instead of duplicating logic).
8. Integrate Spinner component into Button loading state (button.mdx, button playground).

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
- Fixed `@chamfer/react` typecheck by routing behavior imports to built declarations and refactoring forwarded refs to use a callback setter.
- Authored `COMPONENT_DOCUMENTATION_GUIDELINES.md` to standardize component page authoring outside the public docs site.
- Button examples now exercise every tone/emphasis combo, grouped demos (semantics, content, states), and document ripple usage directly.
- Rewrote `apps/docs/src/content/docs/components/button.mdx` to align with the internal documentation guidelines and provide complete coverage.
- Trimmed the Button doc to core-only guidance (HTML, tokens, states) pending separate wrapper pages.
- Added flat emphasis and removed the undocumented raised ghost variant to keep docs and core CSS aligned.
- Simplified ripple helper/docs to a boolean toggle (no surface options).
- Improved ripple animation sizing/visuals so the wave fills the entire button (diagonal radius).
- Reorganized docs components into layout/ui/demos folders, componentized button previews for reusable code snippets, and verified Astro build.
- Reorganized the Button docs flow to include demo-first previews, richer variant/state code samples, and explicit theming overrides.

Keep this file updated as tasks progress to avoid context loss across long-running sessions.

- Introduced demo metadata helper + consistent PreviewCode styling, refreshed button docs (merged usage guidance, added tone matrix, ripple demo) with passing Astro build.
- Added global ripple initializer, refreshed hero/state demos (explicit "No ripple" opt-outs), tightened ripple color for soft/outline/ghost/danger variants, and trimmed extra padding in the ripple showcase.
- Simplified Button state matrix demo (static code export + balanced grid) and verified `@chamfer/docs` builds cleanly.
- Captured the heading depth template in `COMPONENT_DOCUMENTATION_GUIDELINES.md` and restructured the Button page to follow the new H2/H3 hierarchy for a cleaner ToC.
- Documented `enhanceButton` usage/options and parked the Examples section behind a “coming soon” placeholder until multi-component UI blocks are ready.
- Upgraded docs preview tooling (`PreviewCode`) for multi-tab HTML/Style/Script snippets, refactored button demos to supply structured sources, and removed inline styling/loose code blocks in the Button page.
- Refreshed foundation docs (Introduction, Design Principles, Tokens, Quick Start, Typography, Tooling, Accessibility) with consistent structure, updated guidance, and next-step pointers.
- Added GitHub Pages workflow (`.github/workflows/deploy-docs.yml`) and configured Astro site metadata so the docs site can deploy automatically from `main`.
- Updated docs build to respect base paths (GitHub Pages) and prefixed internal links/navigation so asset and page URLs resolve when hosted under `/chamfer`.
- Polished mobile docs UI (hamburger icon, dedicated favicon, full-screen drawer, ripple script inlined) and ensured footer links/logo ignore visited colors.
- Upgraded docs stack to Astro 5 + `@astrojs/mdx` 4 and locked the ripple initializer to a standalone hashed module (via `?url` + `assetsInlineLimit: 0`) so local/dev builds and GitHub Pages share the same entry point.
- Raised mobile drawer z-index above the sticky header, tightened hamburger/logo spacing, and updated `withBase` to skip scheme-prefixed URLs while preventing duplicate base prefixes (handles `/chamfer/_astro/*` correctly).
- Inlined the current `enhanceButton` ripple logic inside the docs helper so GitHub Pages can load it without relying on workspace module resolution.
- Added pre-paint theme script + localStorage persistence to stop light/dark flashes between page transitions in the docs layout (`data-theme`, `color-scheme`, and HCM stored under `ch-theme` / `ch-hcm`).
- Restored true preformatted styling for code samples and made the PreviewCode panels horizontally scrollable with `min-width: 100%` so long snippets stay responsive without awkward wrapping.
- Simplified code previews: removed the wrap toggle and default to wrapping on mobile viewports while keeping horizontal scroll on larger screens.
- Simplified code previews: removed the wrap toggle and default to wrapping on mobile viewports while keeping horizontal scroll on larger screens.
- High contrast toggle now re-colors the docs shell (tokens + controls) and disables decorative ripple for clarity; solid button ripple shading bumped to stay visible in light mode.
- High contrast toggle now re-colors the docs shell (tokens + controls) and disables decorative ripple for clarity.
- Ripple timing tweaks: solid buttons use foreground-derived blends, transparent variants lighten their waves, and buttons suppress active backgrounds while the ripple animation runs to avoid state clashes. Ripples now spawn on press down, stay filled until release, then fade via a dedicated exit animation.
- Authored new documentation pages for Behaviors (overview + Ripple deep dive) and a Theming Recipes guide capturing ripple customisation snippets.
- Spinner component shipped end-to-end: spec drafted (`components/spinner.md`), core CSS implemented with tone/size variants and animation keyframes (`packages/core/src/spinner.css`), React wrapper added (`packages/react` exports `Spinner` component), HTML playground created (`apps/playground/html/html/components/spinner.html`), comprehensive documentation written (`apps/docs/src/content/docs/components/spinner.mdx` + `apps/docs/src/pages/components/spinner.astro`), and package builds verified (`@chamfer/core` bundle includes spinner CSS with animation).
