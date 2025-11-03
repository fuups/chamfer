# Chamfer UI Monorepo

Chamfer UI is a framework-agnostic design system that ships layered design tokens, core CSS, progressive enhancement helpers, and adapters for popular frameworks (React, Vue, Angular). This repository hosts the entire system alongside documentation and playground tooling.

> Current design system spec: **`DESIGN_SYSTEM.md` v1.0.0** (emphasis × meaning model, progressive color layering, contrast ink token).

## Packages

- `@chamfer/tokens` – CSS + TypeScript design tokens (primitives → semantics → components).
- `@chamfer/core` – Framework-agnostic CSS bundles composed from the tokens.
- `@chamfer/behavior` – Vanilla TypeScript helpers for progressive enhancement (e.g., ripple, accessibility guards).
- `@chamfer/react`, `@chamfer/vue`, `@chamfer/angular` – Framework wrappers built on top of core CSS + behaviors.
- `@chamfer/tailwind` – Tailwind CSS bundle exporting ready-to-use `ch-*` utilities (plus an optional preset/plugin for Node-driven builds).

## Apps

- `apps/docs` – Astro-powered documentation site with multi-framework examples and SEO/SSR support.
- `apps/playground/html/html` – Static HTML playground for token smoke-tests.
- `apps/playground/html/tailwind` – Static HTML + Tailwind preset showcase.
- `apps/playground/react/react` – React playground consuming core CSS directly.
- `apps/playground/react/tailwind` – React + Tailwind utility demo.

## Tooling

- `configs/` – Centralized lint/build configurations (PostCSS, Stylelint, ESLint, etc.).
- Root `tsconfig.base.json` – Shared TypeScript settings consumed by all packages/apps.

## Getting Started

```bash
pnpm install
# Generate design tokens/core utilities (run the tokens build if you've edited them)
pnpm --filter @chamfer/tokens build
pnpm --filter @chamfer/core build
pnpm --filter @chamfer/tailwind build

# Launch the HTML playground
pnpm --filter @chamfer/playground-html dev

# HTML + Tailwind playground
pnpm --filter @chamfer/playground-html-tailwind dev

# React playgrounds
pnpm --filter @chamfer/playground-react dev
pnpm --filter @chamfer/playground-react-tailwind dev
```

## Project Guidance

- See `DESIGN_SYSTEM.md` for the Chamfer design source of truth.
- `AGENTS.md` describes roles/responsibilities and cross-cutting rules.
- `SESSION_PROGRESS.md` captures ongoing work, todos, and decision snapshots.

> Status: Token and core CSS pipelines are operational; documentation app and component layers are next on the roadmap.
