# Component Creation Guide

Use this checklist to ship a new Chamfer component end‑to‑end. Each step keeps the implementation aligned with the system’s tokens, behavior, and documentation expectations.

---

## 1. Capture the intent

- Draft or update the component spec under `components/<component>.md`. Reference the latest decisions in [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) so naming, semantics, and accessibility rules stay consistent.
- Record the work in `SESSION_PROGRESS.md` (intent, todos, open questions).

## 2. Update tokens

- Determine whether new primitive or semantic design tokens are required.
- Add primitives in `packages/tokens/src/primitives*.ts` only if absolutely necessary; otherwise derive new semantic tokens in `packages/tokens/src/semantic/*.ts`.
- Regenerate token outputs (`pnpm --filter @chamfer/tokens build`) and ensure CSS/JSON artifacts include OKLCH → HSLA → HSL → HEX fallbacks.

## 3. Core CSS

- Author reusable styles in `packages/core/src/<component>.css`.
- Keep selectors data-attribute driven (`[data-ch-component="..."]`) and depend only on semantic tokens.
- Expose helper classes and CSS variables needed for wrappers or utilities.
- Import the stylesheet from `packages/core/src/base.css` or the relevant component index so the bundle ships it.

## 4. Optional behavior

- If the component needs progressive enhancement, implement helpers in `packages/behavior/src/<component>.ts`.
- Export typed APIs through `packages/behavior/src/index.ts`.
- Add unit tests (Vitest) covering keyboard/interaction paths.

## 5. Framework wrappers

- Map the core CSS + behavior into each wrapper package (React, Vue, Angular) under `packages/<framework>/src/`.
- Keep props API thin and reflect the spec. Wrap enhancements with lifecycle hooks.
- Update wrapper type tests or storybook playgrounds as needed.

## 6. Tailwind utilities

- Map relevant tokens to Tailwind classes in `packages/tailwind/src`.
- Generate CSS utilities (`pnpm --filter @chamfer/tailwind build`) and update documentation snippets if new utilities ship.

## 7. Playground updates

- Add component demos to the HTML and React playgrounds in `apps/playground/*`.
- Include theme toggles, ripple/behavior demos, and edge cases (RTL, density, loading states).

## 8. Documentation

- Author the docs page under `apps/docs/src/content/docs/components/<component>.mdx`, following [`COMPONENT_DOCUMENTATION_GUIDELINES.md`](COMPONENT_DOCUMENTATION_GUIDELINES.md).
- Wire the page to Astro via `/apps/docs/src/pages/components/<component>.astro`.
- Ensure the doc covers: overview, usage, anatomy, variants, states, behavior, theming tokens, API/data attributes, accessibility, testing, performance, i18n/RTL, examples, and related links.
- If the component interacts with behaviors, crosslink to the appropriate guide in `apps/docs/src/content/docs/behaviors/`.

## 9. Testing & QA

- Run relevant tests: typecheck, lint, unit tests, and playground smoke checks (`pnpm --filter ...`).
- Validate visual regressions manually (light/dark/HCM, hover/press states).
- Update `SESSION_PROGRESS.md` with delivered changes and remaining risks.

## 10. Ready-to-ship checklist

- [ ] Tokens regenerated and committed (`packages/tokens/dist`).
- [ ] Core CSS referenced by the bundle (`@chamfer/core/css`).
- [ ] Behavior helper implemented (or confirmed unnecessary).
- [ ] Wrapper packages updated/typed.
- [ ] Tailwind utilities mapped (if applicable).
- [ ] Playgrounds demonstrate the component.
- [ ] Docs page aligned to guidelines and linked in navigation.
- [ ] Tests/builds pass (`pnpm --filter @chamfer/*` as needed).
- [ ] `SESSION_PROGRESS.md` documents the outcome and follow-ups.
