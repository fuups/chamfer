# Chamfer Spinner - Component Specification

> **Status:** Draft ✓ ready for implementation
> **Ownership:** Design tokens & UX (spec), Platform team (implementation), Docs (content)
> **Related design principles:** clarity (motion purpose), consistency (semantic tokens only), flexibility (size, tone), accessibility (reduced-motion friendly, SR friendly)

---

## 1. Overview

Chamfer's spinner provides visual feedback for loading and processing states. It supports three sizes (sm, md, lg), inherits color from context via `currentColor`, and respects motion preferences through `prefers-reduced-motion`. Spinners rely exclusively on semantic tokens; component CSS must never reference primitives directly.

---

## 2. Anatomy

| Part            | Required | Description                                          |
|-----------------|----------|------------------------------------------------------|
| Root            | ✔        | Container element with rotation animation            |
| Circle/Ring     | ✔        | SVG or CSS-based circular indicator                  |

---

## 3. Variants

### 3.1 Sizes

| Size | Dimension (token)      | Stroke width  |
|------|------------------------|---------------|
| sm   | `--ch-icon-size-sm`    | 2px           |
| md   | `--ch-icon-size-md`    | 2.5px         |
| lg   | `--ch-icon-size-lg`    | 3px           |

Icon size tokens are aliased from the design system, ensuring consistency with button icons and other UI elements.

### 3.2 Color

Spinner inherits color from parent context via `currentColor`, allowing it to adapt to:
- Button text color when embedded
- Custom colors via CSS custom properties
- Theme changes (light/dark/high-contrast)

---

## 4. States

- **Default:** Animated rotation
- **Reduced motion:** Static or single-pulse animation when `prefers-reduced-motion: reduce`
- **Hidden:** Use `aria-hidden="true"` when decorative or when paired with screen-reader text

---

## 5. Tokens & CSS contract

### 5.1 Semantic tokens consumed

- Sizing: `--ch-icon-size-sm`, `--ch-icon-size-md`, `--ch-icon-size-lg`
- Animation: `--ch-dur-long` (animation duration)
- Color: Inherits `currentColor` from parent context

### 5.2 Component-level tokens

- `--ch-spinner-color` (defaults to `currentColor`)
- `--ch-spinner-size` (contextual override for custom dimensions)
- `--ch-spinner-stroke-width` (defaults per size variant)
- `--ch-spinner-animation-duration` (defaults to `--ch-dur-long` or 800ms)

---

## 6. Markup contract (vanilla)

```html
<div
  class="ch-spinner ch-spinner--md"
  data-ch-component="spinner"
  role="status"
  aria-label="Loading"
>
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-dasharray="48 16"
    />
  </svg>
</div>
```

- Root attribute: `data-ch-component="spinner"`.
- Base class: `ch-spinner`.
- Modifier classes: `ch-spinner--{size}`.
- Role: `role="status"` for accessibility.
- Label: Include `aria-label` to announce loading state to screen readers.
- When decorative (e.g., alongside text), use `aria-hidden="true"` and omit `role`.

---

## 7. Behavior

- **Animation:** Continuous rotation at `--ch-spinner-animation-duration` (default 800ms).
- **Reduced motion:** When `prefers-reduced-motion: reduce`, animation is disabled or replaced with a subtle fade.
- **Screen readers:** Use `role="status"` and `aria-label` for standalone spinners. For inline contexts (e.g., button loading state), pair with `aria-busy="true"` on the parent.

---

## 8. Accessibility requirements

- Provide `role="status"` for standalone loading indicators.
- Include `aria-label` describing the loading action (e.g., "Loading content").
- When used decoratively alongside visible text, add `aria-hidden="true"`.
- Respect `prefers-reduced-motion` to accommodate users sensitive to animation.
- Ensure sufficient color contrast (4.5:1 against background) when not using `currentColor`.
- Forced-color mode should inherit system colors automatically via `currentColor`.

---

## 9. Framework wrappers

Each wrapper should:

1. Render the vanilla markup (data attribute + classes + SVG).
2. Consume `@chamfer/core/css` (or expect user to import).
3. Accept props for `size`, `ariaLabel`, `ariaHidden`, `color`.
4. Default `role="status"` unless `ariaHidden={true}`.
5. Forward refs and custom class names.

Wrappers do **not** redefine styles; they compose the vanilla artifacts.

---

## 10. QA checklist

- [ ] Token references only (no primitives).
- [ ] Light/dark snapshots for all sizes.
- [ ] Animation respects `prefers-reduced-motion`.
- [ ] Color inherits correctly from parent context.
- [ ] Screen reader announces status appropriately.
- [ ] Forced-colors (Windows HC) maintains visibility.
- [ ] SVG scales cleanly without distortion.
- [ ] Component works in buttons, cards, and overlays.

---

## 11. Open questions

- Should we provide an alternative deterministic progress variant (0-100%)?
- Do we need additional visual styles (dots, bars) or is circular sufficient?

---

**Next steps:**
1. Implement component CSS in `@chamfer/core/src/spinner.css`.
2. Wire into core bundle via `base.css` import.
3. Create playground demos (HTML/React variants).
4. Document in Astro once component is ready.
