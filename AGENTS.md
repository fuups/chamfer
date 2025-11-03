# Chamfer UI – Agent Guide

## Mission
Deliver a framework-agnostic UI library (Chamfer UI) composed of design tokens, core CSS, progressive enhancement helpers, and framework wrappers with best-in-class accessibility and documentation.

## Roles & Responsibilities
- **Human maintainers:** Own product direction, visual/UX decisions, release approvals, and CI secrets. Review PRs produced by automation.
- **Codex assistant (this agent):** Implements agreed tasks, keeps documentation in sync (tokens, naming, behavior), raises architectural questions early, and maintains progress logs.

## Operating Rhythm
1. Capture intent in `SESSION_PROGRESS.md` before large edits; list active todos and decisions there.
2. Prefer incremental PR-sized changes; document rationale in commit messages referencing sections of `DESIGN_SYSTEM.md`.
3. Keep shared configs in `configs/` and reference them from packages via relative paths to avoid duplication.
4. Record new conventions or cross-cutting decisions here (append dated entries).

## Naming & Packaging Rules
- Publishable packages use the `@chamfer/*` namespace; non-publishable tooling stays private under `configs/*` or `apps/*`.
- Token layers follow `primitives → semantic → components`; components never reference primitives directly.
- All color tokens honor the OKLCH → HSLA → HSL → HEX fallback chain.
- TypeScript is the default for logic and wrapper packages; emit declarations via the build pipeline.
- Tailwind support is delivered via `@chamfer/tailwind`; keep preset/plugin in sync with token updates.

## Documentation & SEO
- Documentation lives in `apps/docs` (Astro). Ensure each new component docs page includes: overview, accessibility notes, HTML baseline example, per-framework example, code tabs, and SEO metadata.
- Playground (`apps/playground`) demonstrates raw HTML/CSS usage and theme toggles.

## Outstanding Decisions / TODOs
- [x] Implement token build pipeline (TypeScript-driven generation script producing CSS/JSON).
- [ ] Bootstrap Astro docs app with content collections and SEO integrations.
- [ ] Define linting/tooling stack (ESLint, Stylelint, Prettier or equivalent).
- [ ] Establish automated accessibility testing (Pa11y, Axe) in CI.
- [ ] Map Chamfer tokens into Tailwind preset/plugin and document Tailwind usage.

Update this file whenever responsibilities, processes, or cross-cutting rules change.
