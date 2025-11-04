# Chamfer Spinner - Component Specification

> **Status:** Draft ✓ ready for implementation
> **Ownership:** Design tokens & UX (spec), Platform team (implementation), Docs (content)
> **Related design principles:** clarity (visible progress feedback), consistency (semantic tokens only), flexibility (density, size variants), accessibility (ARIA live regions, reduced motion)

---

## 1. Overview

Chamfer's spinner is a loading indicator that communicates async progress to users. It supports three sizes (sm, md, lg), semantic tones (primary, secondary, success, warning, danger, info), and theming (light/dark/high-contrast). Spinners rely exclusively on semantic tokens; component CSS must never reference primitives directly. The spinner is circular (indeterminate) by default, suitable for operations with unknown duration.

---

## 2. Anatomy

| Slot       | Required | Description                                    |
|------------|----------|------------------------------------------------|
| Root       | ✔        | SVG or CSS-based circular indicator            |
| Label      | ✕        | Optional accessible text or aria-label         |

Icon-only spinners (no label) must provide `aria-label` for context.

---

## 3. Variants

### 3.1 Semantic meanings (tones channel)

- `primary` (default), `secondary`, `success`, `warning`, `danger`, `info`

Spinners use **tone semantics** (messaging channel) rather than action semantics, as they communicate state, not user intent.

### 3.2 Sizes

| Size | Diameter (token)         | Stroke width      |
|------|--------------------------|-------------------|
| sm   | `--ch-icon-size-sm`      | Scaled proportionally |
| md   | `--ch-icon-size-md` (base) | Scaled proportionally |
| lg   | `--ch-icon-size-lg`      | Scaled proportionally |

### 3.3 Animation

- **Type:** Indeterminate circular rotation.
- **Duration:** `--ch-motion-duration-medium` (default 1s).
- **Easing:** `--ch-motion-easing-standard` (linear for continuous rotation).
- **Respects:** `prefers-reduced-motion: reduce` (paused or slowed animation).

---

## 4. States

- **Default:** rotating indicator
- **Paused:** `data-ch-paused="true"` halts animation
- **Reduced motion:** respects `prefers-reduced-motion: reduce` by slowing or pausing animation

---

## 5. Content & layout rules

- Keep spinners compact; pair with short labels when possible.
- Spinners can appear inline or block (centering at parent's responsibility).
- Avoid placing multiple spinners side-by-side; one clear indicator per loading region.
- Pair with `aria-busy="true"` on the loading container; place the spinner's label inside that container or reference via `aria-label`.

---

## 6. Tokens & CSS contract

### 6.1 Semantic tokens consumed

- Tone stroke colors: `--ch-tone-<meaning>-fg` (primary, secondary, success, warning, danger, info)
- Animation timing: `--ch-motion-duration-medium`, `--ch-motion-easing-standard`
- Motion safety: `@media (prefers-reduced-motion: reduce)`
- Icon sizing: `--ch-icon-size-[sm|md|lg]`

### 6.2 Component-level tokens

- `--ch-spinner-diameter-[sm|md|lg]` (aliases icon tokens)
- `--ch-spinner-stroke-width` (defaults to 2–3px proportional to size)
- `--ch-spinner-color-<tone>` (aliases tone foreground)
- `--ch-spinner-animation-duration`
- `--ch-spinner-animation-timing`

---

## 7. Markup contract (vanilla)

```html
<div
  class="ch-spinner ch-spinner--md ch-spinner--primary"
  data-ch-component="spinner"
  aria-busy="true"
  aria-label="Loading"
  role="status"
>
  <svg viewBox="0 0 24 24" class="ch-spinner__icon">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="62.83 62.83" />
  </svg>
  <span class="ch-spinner__label" hidden>Loading</span>
</div>
```

- Root attribute: `data-ch-component="spinner"`.
- Base class: `ch-spinner`.
- Modifier classes: `ch-spinner--{size}`, `ch-spinner--{tone}`.
- ARIA attributes: `role="status"`, `aria-busy="true"` (on spinner or parent), `aria-label` (if label hidden).
- Animation applied via CSS keyframes (`@keyframes ch-spinner-rotate`).

---

## 8. Behavior (progressive enhancement)

- **Animation:** CSS `animation` property drives the rotation; no JavaScript required.
- **Reduced motion:** media query pauses or slows animation.
- **Pause control:** optional `data-ch-paused="true"` stops animation (for testing or explicit UI control).

---

## 9. Accessibility requirements

- Provide accessible context: either visible label, `aria-label`, or place spinner in a container with `aria-busy="true"` + surrounding text.
- Use `role="status"` to announce the spinner as live region (optional; `aria-busy` often suffices).
- Respect `prefers-reduced-motion: reduce` by pausing or significantly slowing animation.
- Color must not be the only indicator; pair with text or ARIA labels.
- Ensure stroke color meets 3:1 contrast against adjacent background (light/dark/HCM modes).

---

## 10. Tailwind mapping

Chamfer Tailwind utilities cover spinner styling:

- Sizing: `w-ch-icon-sm`, `h-ch-icon-sm` (or use `size-ch-icon-md` for square).
- Colors: `text-ch-tone-primary`, etc. (stroke uses `currentColor`).
- Animation: `animate-ch-spin` (or compose with `animate-spin` if needed).

Example:

```html
<div class="w-ch-icon-md h-ch-icon-md text-ch-tone-primary animate-ch-spin" aria-label="Loading" role="status"></div>
```

---

## 11. Framework wrappers

Each wrapper should:

1. Render the vanilla markup (data attribute + classes + SVG).
2. Consume `@chamfer/core/css` (or expect user to import).
3. Accept props for `size`, `tone`, `label`, `paused`.
4. Forward ARIA attributes (`aria-busy`, `aria-label`, `role`).
5. Handle reduced-motion via CSS only (no JavaScript).

Wrappers do **not** redefine styles; they compose the vanilla artifacts.

---

## 12. Documentation flow

Public documentation for the Spinner component follows this ordered structure:

1. **Title and summary** - one or two sentences describing purpose.
2. **Demo** - interactive preview of primary spinner in multiple sizes.
3. **Quick start** - install and import command set.
4. **Usage** - minimal copy-paste HTML baseline with preview/code tabs.
5. **When to use** - do/don't guidance (e.g., when to use vs. progress bar).
6. **Anatomy** - SVG structure and slot descriptions.
7. **Variants and sizes** - tables plus preview/code showing tone and size scales.
8. **States** - preview/code showing default, paused (if applicable).
9. **Behavior** - animation timing, reduced motion.
10. **Accessibility** - ARIA table and best practices.
11. **Theming tokens** - token table plus preview/code showing overrides.
12. **API contract** - class documentation.
13. **Data attributes** - attribute reference table.
14. **Guidelines** - content and usage guidance.
15. **Examples** - real-world scenarios with preview/code pairs (e.g., inline in buttons, full-page overlay).
16. **Testing** - selectors and sample automation snippets.
17. **Performance** - animation performance notes.
18. **Internationalization and RTL** - layout guidance.
19. **Related** - linked resources/components (Button with loading state, Progress bar).
20. **Next steps** - future enhancements (determinate progress, linear variant).

---

## 13. QA checklist

- [ ] Token references only (no primitives).
- [ ] Light/dark snapshots for all tone variants.
- [ ] Stroke color passes 3:1 contrast on both themes.
- [ ] Animation respects `prefers-reduced-motion: reduce`.
- [ ] SVG scales correctly across sm/md/lg sizes.
- [ ] `aria-label` or surrounding `aria-busy` context present.
- [ ] Tailwind demo renders all spinners without missing utilities.
- [ ] Reduced motion mode still provides visual feedback (paused or very slow).
- [ ] Forced-colors (Windows HC) snapshot shows visible stroke.
- [ ] RTL layout does not affect spinner appearance.
- [ ] No layout shift when spinner appears/disappears.

---

## 14. Open questions

- Should we include a linear/progress-bar variant in the same component or as a separate `Progress` component?
- Determine animation timing per tone (all same, or adjusted per semantic color)?
- Is an explicit "paused" state needed for testing/demo purposes, or does CSS `animation-play-state` suffice?

---

**Next steps:**
1. Confirm tokens; add tone-specific color aliases if needed.
2. Author component CSS in `@chamfer/core` (SVG + CSS animation).
3. Update playgrounds with spinner demos.
4. Deliver framework wrappers (React/Vue/Angular).
5. Document in Astro once component skeleton is ready.
