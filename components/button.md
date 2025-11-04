# Chamfer Button - Component Specification

> **Status:** Draft ✓ ready for implementation  
> **Ownership:** Design tokens & UX (spec), Platform team (implementation), Docs (content)  
> **Related design principles:** clarity (AA contrast, focus), consistency (semantic tokens only), flexibility (density, tone), accessibility (keyboard-first, SR friendly)

---

## 1. Overview

Chamfer’s button is the canonical pressable control for actions. It supports five semantic meanings (primary, secondary, success, warning, danger), five emphasis styles (solid, soft, flat, outline, ghost), three sizes (sm, md, lg), icon adornments, and theming (light/dark/high-contrast). Buttons rely exclusively on semantic tokens; component CSS must never reference primitives directly.

---

## 2. Anatomy

| Slot            | Required | Description                                          |
|-----------------|----------|------------------------------------------------------|
| Root            | ✔        | `<button>` / `<a role="button">` / `<input type>`…   |
| Leading icon    | ✕        | Optional icon/content before label                   |
| Label           | ✔        | Visible text or accessible name                      |
| Trailing icon   | ✕        | Optional icon/content after label                    |

Icon-only buttons (no text) must declare `aria-label`.

---

## 3. Variants

### 3.1 Semantic meanings (actions channel)

- `primary`, `secondary`, `success`, `warning`, `danger`

### 3.2 Emphasis

| Emphasis | Description                                                     | Token families                                   |
|----------|-----------------------------------------------------------------|--------------------------------------------------|
| solid    | Default, opaque backgrounds                                      | `--ch-action-<meaning>-*`                       |
| soft     | Translucent background, tonally lighter                          | `--ch-action-<meaning>-soft-*`                  |
| flat     | Subtle translucent fill (ghost overlay as base)                  | `--ch-ghost-hover-base`, `--ch-action-<meaning>-soft-*` |
| outline  | Transparent fill, stroked border                                | `--ch-action-outline-<meaning>-*`               |
| ghost    | Fully transparent at rest; only hover/active overlays visible   | `--ch-ghost-hover-base`, `--ch-ghost-active-base` |

Flat sits between soft and ghost: it keeps the button “present” on tinted or raised surfaces without adding a border. Ghost remains the lowest-emphasis option, appearing only on interaction. Rely on soft tokens for tone-specific foreground colors and on `--ch-ghost-*` overlays for surface blending.

### 3.3 Sizes

| Size | Min height (token)                | Horizontal padding            | Font size      | Icon size |
|------|-----------------------------------|-------------------------------|----------------|-----------|
| sm   | `--ch-pressable-height-sm`        | `--ch-space-md` each side     | `--ch-text-sm` | `--ch-icon-size-sm` |
| md   | `--ch-pressable-height-md` (base) | `--ch-space-lg` each side     | `--ch-text-md` | `--ch-icon-size-md` |
| lg   | `--ch-pressable-height-lg`        | `--ch-space-xl` each side     | `--ch-text-lg` | `--ch-icon-size-lg` |

Icon-only buttons reuse the same heights; width reduces to `height` with spacing tokens ensuring square hit-area.

---

## 4. States

- **Default**
- **Hover:** use `--ch-action-*-bg-hover`; flat and ghost rely on `--ch-ghost-hover-base`.
- **Active / Pressed:** `--ch-action-*-bg-active`, `--ch-active-on-base`.
- **Focus-visible:** adopt shared focus tokens (`--ch-focus-accent`, `--ch-focus-outer`, `--ch-ring-*`). Ghost soft overlay remains visible beneath focus.
- **Disabled:** reduce opacity to `--ch-state-disabled-opacity`, suppress pointer events, maintain accessible contrast for label (use `--ch-text-disabled` when needed).
- **Loading:** reserved (spinner component will ship later).

All states must respect dark theme parity and forced-color (HCM) variants. `hcm:` utilities will be added once the shared high-contrast pattern is defined.

---

## 5. Content & layout rules

- Wrap leading/trailing content in `.ch-button__leading` / `.ch-button__trailing` (or equivalent) to keep spacing tokens intact.
- Keep icons and label separated by `--ch-button-gap-inline` (defaults to `--ch-space-sm`).
- Use `ch-button--icon-only` when the label is visually hidden; provide `aria-label`.
- Align buttons on the inline flex baseline to play nicely in forms and toolbars.
- Allow labels to wrap; prefer concise copy to avoid overly tall buttons.

---

## 6. Tokens & CSS contract

### 6.1 Semantic tokens consumed

- Action backgrounds/foregrounds/borders/overlays from `@chamfer/tokens`:
  - Solid: `--ch-action-<meaning>-bg`, `--ch-action-<meaning>-fg`, `--ch-action-<meaning>-bg-hover`, `--ch-action-<meaning>-bg-active`
  - Soft: `--ch-action-<meaning>-soft-bg`, `--ch-action-<meaning>-soft-fg`, `--ch-action-<meaning>-soft-border`
  - Outline: `--ch-action-outline-<meaning>-border`, `--ch-action-outline-<meaning>-fg`
  - Ghost overlays: `--ch-ghost-hover`, `--ch-ghost-active`
  - Disabled: `--ch-state-disabled-opacity`
- Focus tokens: `--ch-focus-accent`, `--ch-focus-outer`, `--ch-ring-inner-width`, `--ch-ring-outer-width`, `--ch-focus-outline-width`, `--ch-focus-outline-offset`.
- Typography & layout: `--ch-text-[sm|md|lg]`, `--ch-weight-medium`, `--ch-weight-semibold`, `--ch-leading-normal`, spacing tokens `--ch-space-*`, pressable heights `--ch-pressable-height-*`, radius `--ch-radius-sm` (default), `--ch-radius-md` (lg).
- Icon sizing: `--ch-icon-size-*`.

### 6.2 Component-level tokens

- `--ch-button-padding-inline-[sm|md|lg]` (density-aware via `--ch-density-scale`)
- `--ch-button-padding-block`
- `--ch-button-gap-inline`
- `--ch-button-radius`, `--ch-button-radius-lg`
- `--ch-button-icon-size-[sm|md|lg]` (aliases icon tokens)
- `--ch-button-font-weight`
- Forced-colors overrides: `--ch-button-hcm-bg`, `--ch-button-hcm-fg`, `--ch-button-hcm-border`, `--ch-button-hcm-focus`

---

## 7. Markup contract (vanilla)

```html
<button
  class="ch-button ch-button--md ch-button--solid ch-button--primary"
  data-ch-component="button"
  type="button"
>
  <span class="ch-button__leading" hidden></span>
  <span class="ch-button__label">Save changes</span>
  <span class="ch-button__trailing" hidden></span>
</button>
```

- Root attribute: `data-ch-component="button"`.
- Base class: `ch-button`.
- Modifier classes: `ch-button--{size}`, `ch-button--{emphasis}`, `ch-button--{meaning}`, `ch-button--icon-only`, etc.
- Slots hide by default (use `[hidden]` or `:empty` selectors).
- Apply `data-ch-loading="true"` (and ideally `aria-busy="true"` plus `disabled`/`aria-disabled="true"`) to suppress ripple, pointer events, and expose status to assistive tech during async work.
- `<button>` elements default to `type="button"` via `enhanceButton`; set explicitly if submitting forms.
- Non-button elements must provide semantics:
  - `<a role="button" tabindex="0">` and manage `aria-disabled`/`tabindex`.
  - `<input type="submit" class="ch-button">` works for form submission but lacks slot structure.

Anchor example:

```html
<a class="ch-button ch-button--ghost ch-button--secondary"
   role="button"
   data-ch-component="button"
   href="#actions"
>
  <span class="ch-button__label">Link button</span>
</a>
```

---

## 8. Behavior (progressive enhancement)

- **Focus management:** rely on native focus; style via `:focus-visible` only.
- **Ripple effect:** call `enhanceButton(element)` from `@chamfer/behavior` to add ripple feedback. Opt out with `data-ch-ripple="false"` or `ripple: false`.
- **Loading state:** `data-ch-loading="true"` (plus `aria-busy="true"`) disables ripple, pointer events, and updates cursor. Wrappers should map `loading` props to these attributes.
- **Pointer/keyboard events:** helper listens for `pointerdown` and `Enter`/`Space`, ignoring interactions when the element is `disabled`, `aria-disabled="true"`, or loading.
- **Non-button elements:** helper sets `data-ch-component="button"` automatically and leaves the `type` attribute untouched on anchors; for real `<button>` elements it defaults `type="button"` if omitted.

---

## 9. Accessibility requirements

- Must provide accessible name (`aria-label` if icon-only).
- Respect `disabled` semantics (`disabled` attribute or `aria-disabled="true"` + `tabindex="-1"` for links).
- Focus ring must meet 3:1 contrast against adjacent surface.
- Maintain keyboard activation (Space, Enter) across `<button>` and link/button hybrids.
- Loading state should expose `aria-busy="true"` and keep visible text (spinner will be announced separately).
- Ensure ripple respects `prefers-reduced-motion` (disabled automatically).
- Forced-color mode (`@media (forced-colors: active)`) maps to `ButtonFace`/`ButtonText`; verify Windows High Contrast schemes.
- RTL layouts must preserve icon order and spacing; long labels wrap without clipping.

---

## 10. Tailwind mapping

Chamfer Tailwind utilities cover button styling without custom config:

- Backgrounds: `bg-ch-action-primary`, etc.
- Text: `text-ch-action-primary-foreground`, etc.
- Borders: `border-ch-action-outline-primary-border`.
- Padding & min-height: `px-ch-lg`, `min-h-ch-pressable-md`.
- Radius: `rounded-ch-sm`.
- Focus: `focus-visible:focus-ring-ch`.

Example:

```html
<button class="min-h-ch-pressable-md px-ch-lg rounded-ch-sm bg-ch-action-primary text-ch-action-primary-foreground focus-visible:focus-ring-ch transition">
  Save
</button>
```

---

## 11. Framework wrappers

Each wrapper should:

1. Render the vanilla markup (data attribute + classes).
2. Consume `@chamfer/core/css` (or expect user to import).
3. Optionally auto-run ripple helper (opt-out prop).
4. Accept props for `variant`, `size`, `tone`, `leadingIcon`, `trailingIcon`, `loading`, `disabled`.
5. Forward refs and events transparently.

Wrappers do **not** redefine styles; they compose the vanilla artifacts.

---

## 12. Documentation flow

Public documentation for the Button component follows this ordered structure to match the intuitive experience across the docs site:

1. **Title and summary** - one or two sentences describing purpose.
2. **Demo** - interactive preview of primary and secondary buttons.
3. **Quick start** - install and import command set.
4. **Usage** - minimal copy-paste HTML baseline with preview/code tabs.
5. **When to use** - do/don’t guidance.
6. **Anatomy** - DOM tree and slot descriptions.
7. **Variants and sizes** - tables plus preview/code showing emphasis and size scales.
8. **States** - preview/code matrix for hover, focus, loading, disabled.
9. **Behavior** - ripple helper demo and integration snippet.
10. **Accessibility** - keyboard table and best practices.
11. **Theming tokens** - token table plus preview/code showing overrides.
12. **API contract** - class documentation.
13. **Data attributes** - attribute reference table.
14. **Guidelines** - content and usage guidance.
15. **Examples** - real-world scenarios with preview/code pairs.
16. **Testing** - selectors and sample automation snippets.
17. **Performance** - optimization notes.
18. **Internationalization and RTL** - localization guidance.
19. **Related** - linked resources/components.
20. **Next steps** - future enhancements and tracking notes.

This flow must be maintained as additional frameworks or behaviors are documented.

---

## 13. QA checklist

- [ ] Token references only (no primitives).
- [ ] Light/dark snapshots (solid, soft, outline, ghost) for each meaning.
- [ ] Focus-visible passes 3:1 contrast on both themes.
- [ ] Disabled state has correct opacity & semantics.
- [ ] Ripple disabled when `prefers-reduced-motion`.
- [ ] Icon-only button warns when `aria-label` missing (dev mode).
- [ ] Ghost/outline maintain 4.5:1 label contrast over base surface.
- [ ] Tailwind demo renders all buttons without missing utilities.
- [ ] Loading state blocks interaction, surfaces `aria-busy`, and remains legible.
- [ ] Forced-colors (Windows HC) snapshot still shows outline/background contrast.
- [ ] RTL sample retains slot order and padding.
- [ ] Link/input variants retain keyboard access and obey `aria-disabled`.

---

## 14. Open questions

- Do we need a dedicated “link” style (text button) beyond ghost?
- Should density scaling adjust padding automatically or be opt-in?
- Spinner integration: which API (`data-loading`, `loading`, `aria-busy`)? Coordinate once spinner component spec exists.

---

**Next steps:**  
1. Implement missing tokens (`@chamfer/tokens`) per §6.2.  
2. Author component CSS in `@chamfer/core` and hook into build.  
3. Deliver ripple helper in `@chamfer/behavior`.  
4. Update playgrounds and wrappers.  
5. Document in Astro once component skeleton is ready.
