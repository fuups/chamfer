# Chamfer UI Monorepo

Chamfer UI is a framework-agnostic design system that ships layered design tokens, core CSS, progressive enhancement helpers, and adapters for popular frameworks (React, Vue, Angular). This repository hosts the entire system alongside documentation and playground tooling.

> Current design system spec: **`DESIGN_SYSTEM.md` v1.0.0** (emphasis × meaning model, progressive color layering, contrast ink token).

## Packages
- `@chamfer/tokens` – CSS + TypeScript design tokens (primitives → semantics → components).
- `@chamfer/core` – Framework-agnostic CSS bundles composed from the tokens.
- `@chamfer/behavior` – Vanilla TypeScript helpers for progressive enhancement (e.g., ripple, accessibility guards).
- `@chamfer/react`, `@chamfer/vue`, `@chamfer/angular` – Framework wrappers built on top of core CSS + behaviors.
- `@chamfer/tailwind` – Tailwind CSS preset/plugin exposing Chamfer tokens as first-class Tailwind theme values.

## Apps
- `apps/docs` – Astro-powered documentation site with multi-framework examples and SEO/SSR support.
- `apps/playground` – Vite-powered HTML playground for rapid CSS iteration.

## Tooling
- `configs/` – Centralized lint/build configurations (PostCSS, Stylelint, ESLint, etc.).
- Root `tsconfig.base.json` – Shared TypeScript settings consumed by all packages/apps.

## Getting Started
```bash
pnpm install
# Generate design tokens and core CSS bundles
pnpm --filter @chamfer/tokens build
pnpm --filter @chamfer/core build

# Launch the playground (after installing Vite dependencies)
pnpm --filter @chamfer/playground dev
```

## Project Guidance
- See `DESIGN_SYSTEM.md` for the Chamfer design source of truth.
- `AGENTS.md` describes roles/responsibilities and cross-cutting rules.
- `SESSION_PROGRESS.md` captures ongoing work, todos, and decision snapshots.

> Status: Token and core CSS pipelines are operational; documentation app and component layers are next on the roadmap.
