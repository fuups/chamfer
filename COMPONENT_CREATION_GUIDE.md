# Component Creation Guide

Use this checklist to deliver a production-ready component that stays faithful to the system spec, tokens, and documentation standards. Every box in each section should be ticked (or explicitly marked as “N/A”) before the component is considered review-ready.

---

## 1. Align with the spec

- [ ] **Read existing guidance:** Review [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) and the component’s spec in `components/<component>.md`. If no spec exists, author one first.
- [ ] **Clarify decisions:** Note open questions (naming, accessibility, variants) and capture them in `SESSION_PROGRESS.md`.
- [ ] **Update spec if needed:** Document agreed behaviour, states, and tokens in `components/<component>.md` so future work has a single source of truth.
- [ ] **Log intent:** Add a new entry to `SESSION_PROGRESS.md` summarising scope, todos, and owners.

## 2. Design tokens

- [ ] **Audit existing tokens:** Confirm whether current semantic tokens cover the new component.
- [ ] **Add tokens if required:** Introduce new semantic tokens in `packages/tokens/src/semantic/…` (primitives only when absolutely necessary).
- [ ] **Regenerate artifacts:** Run `pnpm --filter @chamfer/tokens build` to emit updated CSS/JSON/TS outputs.
- [ ] **Verify fallbacks:** Ensure new colours follow the OKLCH → HSLA → HSL → HEX chain.
- [ ] **Document tokens:** Reference new aliases in the component spec and planned docs.

## 3. Core CSS implementation

- [ ] **Create stylesheet:** Add `packages/core/src/<component>.css` and scope selectors with data attributes (e.g. `[data-ch-component="<name>"]`).
- [ ] **Use semantic tokens:** Avoid referencing primitives directly; rely on semantic aliases or component-level CSS variables.
- [ ] **Expose hooks:** Provide utility classes or CSS variables needed by wrappers, behaviors, or theming.
- [ ] **Wire into bundle:** Import the stylesheet from the core entrypoint (`packages/core/src/base.css` or equivalent) so `@chamfer/core/css` ships it.
- [ ] **Cross-browser sanity check:** Test in the playground (light/dark/HCM) to confirm visual parity.

## 4. Progressive behavior (if applicable)

- [ ] **Decide necessity:** Confirm whether the component requires JavaScript enhancement (ripple, keyboard guards, async states).
- [ ] *If yes*:  
  - [ ] Implement helper(s) in `packages/behavior/src/<component>.ts` and export them via `packages/behavior/src/index.ts`.  
  - [ ] Add unit tests (Vitest) covering keyboard and pointer paths.  
  - [ ] Ensure helpers clean up listeners and support `prefers-reduced-motion`.  
- [ ] *If no behavior needed*: note this in the spec and `SESSION_PROGRESS.md`.

## 5. Framework wrappers

- [ ] **React / Vue / Angular:** Update each wrapper package in `packages/<framework>/src/` to render the core markup, apply classes, and invoke behaviors where available.
- [ ] **Type safety:** Extend or adjust component prop types to expose public API without leaking HTML attributes unintentionally.
- [ ] **Lifecycle integration:** Ensure wrappers mount/unmount behavior helpers correctly and forward refs/slots as needed.
- [ ] **Testing:** Run wrapper typecheck (and runtime tests where applicable).

## 6. Tailwind integration (if the component exposes utilities)

- [ ] Map relevant tokens or class shortcuts inside `packages/tailwind/src`.
- [ ] Rebuild utilities with `pnpm --filter @chamfer/tailwind build`.
- [ ] Update Tailwind documentation/examples if new utilities were added.
- [ ] Confirm utilities render correctly in the Tailwind playground (HTML + React variants).

## 7. Playground demos

- [ ] Add demos to each relevant playground (`apps/playground/html`, `apps/playground/react`, Tailwind variants).  
- [ ] Include states: default, hover, focus, pressed, disabled, loading, size/variant permutations.  
- [ ] Provide toggles for theme, density, RTL, and High Contrast to validate responsive behaviour.  
- [ ] Ensure imports point to built bundles (`@chamfer/core/css`, wrappers, behaviors).

## 8. Documentation

- [ ] **MDX content:** Author `apps/docs/src/content/docs/components/<component>.mdx` following [`COMPONENT_DOCUMENTATION_GUIDELINES.md`](COMPONENT_DOCUMENTATION_GUIDELINES.md).
- [ ] **Astro page:** Create `/apps/docs/src/pages/components/<component>.astro` that loads the MDX entry via content collections.
- [ ] **Coverage checklist:** Confirm docs include overview, quick start, usage, when to use vs. avoid, anatomy, variants/sizes, states, behavior notes, accessibility guidance, theming tokens, API/data attributes, testing advice, performance tips, i18n/RTL considerations, examples, related links, and next steps.
- [ ] **Crosslinks:** Link to relevant behavior guides, design principles, and tokens documentation.
- [ ] **Navigation:** Add the component to docs navigation (if not already present).
- [ ] **SEO metadata:** Provide frontmatter descriptions, status badge, updated timestamp.

## 9. Testing & quality assurance

- [ ] **Package builds:** `pnpm --filter @chamfer/core build`, `@chamfer/behavior build`, wrappers, Tailwind, and docs as necessary.
- [ ] **Type/lint:** Run `pnpm lint`, `pnpm typecheck`, and any behavior/unit tests.
- [ ] **Visual pass:** Manually review demos in the playground and docs (light/dark/HCM/RTL, small screens).
- [ ] **Accessibility sweep:** Check focus order, keyboard mechanics, ARIA usage; document any known limitations.
- [ ] **Record status:** Update `SESSION_PROGRESS.md` with completed work, remaining risks, and todo items for follow-up.

## 10. Ready-to-ship summary

- [ ] Tokens regenerated (if needed) and committed.
- [ ] Core CSS bundled through `@chamfer/core/css`.
- [ ] Behaviors implemented or explicitly scoped out.
- [ ] Wrapper packages updated and typechecked.
- [ ] Tailwind utilities published or marked N/A.
- [ ] Playground demos verified.
- [ ] Docs (MDX + Astro) merged and linked in navigation.
- [ ] Tests/builds pass without local modifications.
- [ ] `SESSION_PROGRESS.md` reflects final state and signals any outstanding work.

> Tip: When opening a PR, link back to the spec in `components/<component>.md` and the relevant section in `DESIGN_SYSTEM.md` so reviewers can validate the component against agreed rules.
