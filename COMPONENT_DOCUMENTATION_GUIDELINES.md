# Component Documentation Guidelines

This internal reference codifies how we author and review component documentation for Chamfer UI. Follow this guide whenever you add or revise pages so the docs stay consistent, actionable, and high quality.

## 1. Scope and goals

- Applies to component pages (Button, Input), patterns (Forms, Confirmation), and utilities (tokens, motion).
- Primary audiences: product engineers (HTML, React, Tailwind), designers, QA, technical writers.
- Outcomes we expect:
  - Clear contract covering DOM, classes, data attributes, tokens, states, and behaviors.
  - Cross stack examples for HTML, React, and Tailwind. Add Vue or Angular when wrappers ship.
  - Copy paste safe snippets that lint and compile.
  - Consistent navigation metadata and search discoverability.

## 2. Page structure

Component pages must appear in this order. Mark optional sections only when they truly do not apply.

1. Frontmatter
2. Overview (intro paragraph plus Do/Don’t bullets for at-a-glance guidance)
3. Quick start (installation and imports)
4. Usage
   - Hero preview (`PreviewCode`) showing the default component
   - Minimal HTML snippet directly beneath the preview
5. Anatomy (DOM tree, required attributes, slot elements)
6. Variants (emphasis table/grid, size scale, tone matrix)
7. States (default, hover, active, focus-visible, disabled, loading, high contrast)
8. Behavior (progressive enhancement helpers, options tables, guidelines)
9. Accessibility (keyboard table, name computation, aria usage)
10. Theming (narrative overview, link to reference tokens)
11. Reference (H3 tables for classes, data attributes, tokens, events)
12. Content guidelines (labels, icons, truncation, i18n hints)
13. Testing (selectors, Playwright, RTL, axe guidance)
14. Performance (hydration/enhancement cost, motion budgets)
15. Internationalization and RTL considerations
16. Related links (components, foundations, guides)
17. Next steps (follow-up work, future enhancements)

> Examples section: add after Content guidelines when multi-component UI blocks are ready. Until then, include a short “Coming soon” note so the section is clearly intentional.

## 3. Heading depth template

To keep navigation predictable and the generated table of contents readable, follow this heading hierarchy:

| Level | Purpose | Examples |
| --- | --- | --- |
| `#` (H1) | Component name. Only one per page. | `# Button` |
| `##` (H2) | Top level pillars that describe what readers need to know. Keep this list short (8‑10 items max). | `## Overview`, `## Usage`, `## Variants`, `## States`, `## Behavior`, `## Accessibility`, `## Theming`, `## Reference`, `## Examples`, `## Testing`, `## Next steps` |
| `###` (H3) | Subtopics inside a pillar, used when a section contains multiple parallel concepts. | `### Minimal HTML`, `### Anchors styled as buttons`, `### Tone matrix`, `### API`, `### Data attributes` |
| `####` (H4) | Avoid unless a table needs a labelled subsection (rare). If required, keep them within Reference tables only. | `#### CSS variables` |

Implementation notes:

- Each H2 should introduce a cohesive topic. If you need more than ~10 H2s, consider grouping detail-heavy content under a shared “Reference” H2 with H3s inside.
- Use H3s consistently across components (for example under Usage always have “Minimal HTML”, “Icons”, “Anchors” when applicable).
- Do not skip levels (for example go from H2 straight to H4). If a subsection does not warrant its own H3, keep the content as paragraphs, tables, or callouts under the H2.
- Keep demo headings aligned with the HTML they showcase so the sidebar ToC mirrors the preview order.
- In Usage, always pair the hero preview with its corresponding minimal markup so readers can experiment and copy-paste without scrolling elsewhere.

## 4. Frontmatter schema

Use YAML frontmatter at the top of each MDX page:

```yaml
---
title: Button
description: Pressable control for primary and contextual actions.
status: alpha # allowed values: draft | alpha | beta | stable | deprecated
since: 0.1.0
updated: "2025-01-05"
a11y_audit: "Manual plus axe pass, 2025-01-05"
owners:
  - "@design-systems"
slug: /components/button
aliases:
  - /docs/button
package_ids:
  - "@chamfer/core"
  - "@chamfer/behavior"
labels: [component, pressable, action]
related: [/components/icon-button, /foundations/tokens]
seo:
  keywords: ["ui button", "primary action", "call to action"]
  image: /og/components/button.png
source_of_truth:
  code: https://github.com/chamfer-ui/chamfer-ui/tree/main/packages
  design: https://figma.com/file/<file-id>
---
```

Frontmatter rules:

- `status` reflects implementation maturity. Update when the package reaches beta or stable.
- `updated` uses ISO date in UTC. Bump on meaningful content changes.
- `slug` is canonical and must match the routing entry used in `apps/docs/src/pages`.
- `a11y_audit` records the last manual and automated review date.
- Keep `owners` and `package_ids` in sync with actual maintainers and published packages.

## 5. Authoring components in MDX

Use our Astro MDX helpers for previews and tables:

- `<PreviewCode>` for paired preview and code tabs. Supply `label`, a `sources` array (for example HTML, CSS, JavaScript), and render the live markup inside a `<div slot="preview">`.
- `<ComponentVariantGrid>` or a component specific variant grid. Keep HTML fallback available even when you embed React demos.
- `<Callout type="info|warning|success|danger">` for admonitions.
- `<SpecTable>` (or plain Markdown tables) for contracts.
- `<A11yChecklist>` for accessibility verification.

Code block guidance:

- Provide language hints (`html`, `ts`, `tsx`, `bash`).
- Snippets must be runnable without ellipses unless the omission is irrelevant.
- Show imports explicitly (for example `import "@chamfer/core/css";`).
- Keep React examples typed and prefer named options where possible.

## 6. Writing style

- Tone is clear, direct, and helpful. Avoid marketing copy.
- Use active voice and present tense.
- Keep labels concise (two to three words) and use imperative verbs (Save, Publish).
- Pair Do and Do Not lists with balanced bullet counts if possible.
- Avoid idioms and color only descriptions. Reference token names instead.
- Respect the no em dash convention. Use plain hyphens or parentheses.

## 7. Anatomy and contract

Every component page must:

- Specify allowed host elements (for example `<button>` plus `<a role="button">`).
- List required attributes such as `data-ch-component`, `type`, or state flags.
- Document slot elements (`.ch-button__leading`, `.ch-button__label`, `.ch-button__trailing`) and when they may be hidden.
- Present a copy paste DOM tree example.
- Provide tables for classes, data attributes, CSS variables, and events using the structure below.

### Class modifier table

| Class | Purpose |
| --- | --- |
| `ch-button--md` | Sets medium density tokens |
| `ch-button--solid` | Applies solid emphasis background tokens |

### Data attribute table

| Attribute | Values | Effect |
| --- | --- | --- |
| `data-ch-component` | `"button"` | Identifies the component root |
| `data-ch-loading` | `"true"` | Toggles loading state styles and behaviors |

### Token table

| Token | Purpose | Default |
| --- | --- | --- |
| `--ch-button-padding-inline-md` | Inline padding for medium buttons | `calc(var(--ch-space-sm) * 1.5)` |
| `--ch-action-primary-bg` | Background for solid primary emphasis | Theme dependent |

### Events table

| Event | Detail payload | Trigger |
| --- | --- | --- |
| `ch:ripple-start` | `{ x, y }` relative coordinates | On pointer press when ripple is enabled |

## 8. Variants, sizes, and state coverage

- Provide a matrix that covers emphasis (solid, soft, outline, ghost) against tones (primary, secondary, success, warning, danger).
- Include size scale tables or grids (sm, md, lg) showing label typography and padding tokens.
- Demonstrate states with `data-demo-state` attributes so previews do not rely on hover scripts.
- Include loading, disabled, and high contrast (forced colors) examples.

## 9. Accessibility requirements

Document the following for every page:

- Accessible name computation rules for default and icon only usage.
- Keyboard interaction table covering Tab, Shift plus Tab, Enter, Space, Escape, and arrow keys if applicable.
- Disabled semantics (`disabled`, `aria-disabled`, `tabindex`, pointer suppression).
- Busy or loading semantics (`aria-busy`, `data-ch-loading`, visual indicators).
- Reduced motion considerations (ripple opt out, transition caps).
- High contrast strategy with forced colors tokens.
- Add `<A11yChecklist />` summarizing automated and manual checks.

## 10. Theming and Tailwind mapping

- Explain how semantic tokens drive the component appearance.
- List customizable CSS variables with recommended ranges or discrete values.
- If Tailwind utilities exist, provide a table mapping tokens to utility class names (`bg-ch-action-primary`, `focus-ring-ch`).
- Call out any tokens that should be overridden together to preserve contrast.

## 11. Behavior and enhancements

- Show how to import and initialize progressive enhancement helpers (`import { enhanceButton } from "@chamfer/behavior";`).
- Document options and defaults (such as ripple surface or disabled states) in a small table so readers can scan the contract quickly.
- Provide React (or other wrapper) examples that demonstrate the same behavior.
- List custom events, payloads, and when they fire.
- Clarify link as button usage, including keyboard support and accessibility constraints.

## 12. Testing guidance

- Include selector references (`[data-ch-component="button"]`, `[data-ch-loading="true"]`).
- Provide Playwright snippets that cover focus, keyboard activation, and loading states.
- Provide React Testing Library snippets that verify DOM structure and attributes.
- Mention running axe or Pa11y scans against provided fixtures.
- Describe any additional integration tests (for example ripple suppression when disabled).

## 13. Performance guidance

- Note expected enhancement cost per instance (rough timing from profiler).
- Warn against heavy visual effects on resource constrained devices.
- Mention hydration options when wrappers are involved.

## 14. Internationalization and RTL

- Include at least one long label example (for example German or Finnish) to show wrapping behavior.
- Confirm mirrored slot order or note exceptions.
- Call out text casing expectations (sentence case, no all caps).
- Highlight bidi edge cases if the component includes caret icons or alignment sensitive elements.

## 15. Examples coverage

Every component page should eventually showcase composite usage that goes beyond the core contract. Until multiple components ship, include a short “Coming soon” note so the section is still discoverable. When the gallery is active:

- Include the variant grid that covers every emphasis (solid, soft, outline, ghost) across all supported tones (primary, secondary, success, warning, danger) at the default size.
- Add size variations (sm, md, lg) that demonstrate icon leading, trailing, and label only layouts.
- Provide semantic scenarios: anchor styled as button, destructive/danger confirmation, disabled or loading instance, and grouped usage (for example button toolbar).
- Show content edge cases: icon only with `aria-label`, long localized label (extended Latin or CJK), and RTL preview if slot order changes.
- Mirror Tailwind or framework equivalents when wrappers exist so readers can map utilities back to tokens.
- Call out ripple or other enhancements explicitly when they are optional or suppressed.

Treat these examples as authoritative fixtures: update playgrounds and automated tests alongside them.

## 16. Definition of done checklist

A component page is publishable when all items are true:

- [ ] Frontmatter passes schema validation and linting.
- [ ] Overview, Do list, and Do Not list are concise and present.
- [ ] HTML, React, and Tailwind examples compile and match the contract.
- [ ] Anatomy section documents DOM tree and required attributes.
- [ ] Variants and size matrices cover emphasis, tone, and density.
- [ ] States section covers hover, active, focus visible, disabled, loading, and high contrast.
- [ ] Accessibility section includes keyboard table and semantics guidance.
- [ ] Theming section lists CSS variables and Tailwind mappings.
- [ ] API tables cover classes, data attributes, tokens, and events.
- [ ] Examples cover tone/emphasis grid, size variations, semantics (anchor, destructive, loading), icon only, and localized/RTL scenarios.
- [ ] Content guidelines address labels, icons, truncation, and internationalization.
- [ ] Testing section links to selectors and sample tests (Playwright, RTL, axe).
- [ ] Performance and progressive enhancement guidance is documented.
- [ ] Related links connect to foundations, patterns, and dependent components.
- [ ] Page has been reviewed by design, accessibility, engineering, and docs peers.

## 17. Authoring workflow

1. Draft content using this template.
2. Run `pnpm --filter @chamfer/docs exec astro build` to ensure pages render.
3. Verify examples locally (HTML playground, framework wrappers).
4. Update `SESSION_PROGRESS.md` with decisions or follow up tasks.
5. Submit PR using the component docs checklist and reference relevant sections of `DESIGN_SYSTEM.md`.

## 18. Maintenance notes

- Keep this guideline in sync with DESIGN_SYSTEM.md and AGENTS.md when conventions change.
- When adding new MDX helper components, document usage here.
- Record deviations or experimental sections in `SESSION_PROGRESS.md` before landing them.
