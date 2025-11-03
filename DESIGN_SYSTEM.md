# **Chamfer Design System — v1.0.1 (Stable)**

> **Scope:** Single source of truth for tokens, theming, patterns, accessibility, and governance (system-level; no component specs)
> **Version:** **1.0.1** • **Last updated:** **2025-11-03** • **License:** MIT

---

## Core decisions (v1.0.1)

* **Two axes for styling:** **Emphasis** (how loud) × **Meaning** (what it means).
* **Emphasis:** `solid` *(default)*, `soft`, `outline`, `ghost` (omitting the emphasis implies **solid**).
* **Meaning is namespaced:**
  **Actions** → `--ch-action-*` (`primary | secondary | success | warning | danger`)
  **Messaging (Tones)** → `--ch-tone-*` (`info | success | warning | danger`)
* **Primary = monochrome action channel:** black-ish on light, white/near-white on dark (not blue).
* **Info = blue tone:** used for alerts/banners/tooltips/notices (never on pressables).
* **Components consume semantics only** (no primitives in component tokens).
* **Token prefix:** all DS variables are **`--ch-…`** to prevent collisions.
* **Progressive color delivery:** single canonical var upgraded via `@supports` (**HEX → HSL(A) → OKLCH**) with sRGB fallbacks; derive tints/shades in **OKLCH** when supported.
* **Solids are opaque.** Alpha is allowed **only** for non-solids (`soft`, `ghost`).
* **Contrast rules baked in:** interactive borders ≥ **3:1**; text on solids ≥ **4.5:1**; two-ring focus with outer ring ≥ **3:1** against the **adjacent** surface.
* **Dark parity:** full dark sets for **soft** actions, **white** ghost overlays, dark link states, and dark `shadow-sm`.
* **rem rhythm:** typography, spacing, and sizes in rem; density also tunes line-height and interactive padding.
* **Theming selectors:** support **`.dark`** and **`[data-theme="dark"]`**.
* **Motion:** standardized easing/budgets; honors `prefers-reduced-motion: reduce`.
* **Container-first:** components size by container queries; viewport breakpoints for page shells.

---

# 1) Design Principles

* **Clarity:** Readable type, AA contrast, visible focus; no color-only meaning.
* **Consistency:** Semantics drive components; primitives never bypassed.
* **Flexibility:** Light/dark themes, tones for messaging, density scaling, RTL, container-queries.
* **Accessibility:** Keyboard-first, screen-reader friendly, HC/forced-colors parity, reduced motion.
* **Maintainability:** Strict naming grammar, prefixed tokens, versioned exports, automated a11y checks.
* **Aesthetic Excellence:** Modern minimalism without sacrificing usability.

---

# 2) Token Architecture & Naming

## 2.1 Three-Layer System

1. **Primitives** — raw values (colors, spacing, radii, type, motion)
   *Authored as HEX/HSL + OKLCH siblings; canonical variables upgrade via `@supports` with sRGB fallbacks/clamping for exports.*
2. **Semantics** — intent/meaning-based tokens (**actions**, **tones**, text hierarchy, surfaces, borders, states)
   *Component-agnostic; all prefixed with `--ch-…`.*
3. **Component tokens** — **aliases** of semantics bound by grammar
   *Never reference primitives directly. No raw color in components.*

## 2.2 Naming Grammar (contracts only)

```
--<component>[--<slot>]-<meaning>-<part>[-<state>][-<size>]                 // solid (default)
--<component>[--<slot>]-<emphasis>-<meaning>-<part>[-<state>][-<size>]     // non-solid
```

* **emphasis:** `soft | outline | ghost`  *(omit ⇒ solid)*
* **meaning:** *for components, “meaning” resolves to* `primary | secondary | success | warning | danger` *(Actions)* **or** `info | success | warning | danger` *(Tones)* via **semantic aliases** below.
* **part:** `fg | bg | border | shadow | icon | underline`
* **state:** `hover | active | focus | disabled | selected | checked | invalid | loading | dragover | readonly`
* **size:** `xs | sm | md | lg | xl`

> **Lint rules (enforced):**
> • Forbid **`--ch-color-*` primitives** and **raw colors** inside `--<component>-*` tokens.
> • Forbid **tone** (`--ch-tone-*`) semantics on **action** components (pressables, toggles).
> • Forbid **action** (`--ch-action-*`) semantics on **messaging** components (alerts, tooltips).
> • Enforce omit-means-solid; enforce **single-hyphen** slot (`--comp-slot-…`) — deprecate `--comp--slot-…`.
> • If any outline alias exists, **all** action meanings must have outline aliases.

---

# 3) Color Authoring & Delivery

**Canonical pattern (applies to all color tokens):**

```css
:root {
  /* Authoring siblings (for docs/tooling): */
  --ch-action-primary-bg-hex: #111111;
  --ch-action-primary-bg-hsl: hsl(0 0% 7% / 1);
  /* --ch-action-primary-bg-oklch: <generated>; */

  /* Canonical (what semantics & components consume): */
  --ch-action-primary-bg: var(--ch-action-primary-bg-hex);
}
@supports (color: hsl(0 0% 0% / 1)) {
  :root { --ch-action-primary-bg: var(--ch-action-primary-bg-hsl); }
}
@supports (color: oklch(0.5 0 0)) {
  :root { --ch-action-primary-bg: var(--ch-action-primary-bg-oklch); }
}
/* Use the same upgrade pattern for all semantic colors. */
```

Additional delivery policies:

* `:root { color-scheme: light dark; }`
* **Derivations** (hover/active tints/shades) use `color-mix()` gated:

```css
@supports (color: color-mix(in oklab, white, black)) { /* mix-based derivations */ }
```

* Clamp OKLCH to sRGB for static assets/exports.

---

# 4) Primitive & System Tokens (prefixed)

## 4.1 Structural Colors & Borders

```css
:root {
  --ch-color-contrast-hex:#000000; --ch-color-contrast-hsl:hsl(0 0% 0% / 1);
  --ch-color-contrast: var(--ch-color-contrast-hex);

  --ch-color-default-hex:#212529;  --ch-color-default-hsl:hsl(210 11% 15% / 1);
  --ch-color-default: var(--ch-color-default-hex);

  --ch-color-secondary-hex:#5A6169; --ch-color-secondary-hsl:hsl(212 8% 38% / 1);
  --ch-color-secondary: var(--ch-color-secondary-hex);

  --ch-color-background-hex:#FFFFFF; --ch-color-background-hsl:hsl(0 0% 100% / 1);
  --ch-color-background: var(--ch-color-background-hex);

  --ch-color-surface-hex:#FAFAFA; --ch-color-surface-hsl:hsl(0 0% 98% / 1);
  --ch-color-surface: var(--ch-color-surface-hex);

  /* Borders (≥3:1 on base surfaces) */
  --ch-border-default-hex:#8F8F8F; --ch-border-default-hsl:hsl(0 0% 56% / 1);
  --ch-border-default: var(--ch-border-default-hex);

  /* Component alias (avoid self-reference cycles) */
  --ch-border-ui-default: var(--ch-border-default);

  /* Border width scale */
  --ch-border-width-sm: 1px;
  --ch-border-width-md: 1.5px; /* hi-DPI friendly */
  --ch-border-width-lg: 2px;
}
@supports (color: hsl(0 0% 0% / 1)) {
  :root {
    --ch-color-contrast: var(--ch-color-contrast-hsl);
    --ch-color-default: var(--ch-color-default-hsl);
    --ch-color-secondary: var(--ch-color-secondary-hsl);
    --ch-color-background: var(--ch-color-background-hsl);
    --ch-color-surface: var(--ch-color-surface-hsl);
    --ch-border-default: var(--ch-border-default-hsl);
  }
}
/* Dark theme structural */
.dark, [data-theme="dark"] {
  --ch-color-contrast-hex:#FFFFFF; --ch-color-contrast-hsl:hsl(0 0% 100% / 1);
  --ch-color-contrast: var(--ch-color-contrast-hex);

  --ch-color-default-hex:#E4E6EB; --ch-color-default-hsl:hsl(223 15% 91% / 1);
  --ch-color-default: var(--ch-color-default-hex);

  --ch-color-secondary-hex:#A4A7AC; --ch-color-secondary-hsl:hsl(218 5% 66% / 1);
  --ch-color-secondary: var(--ch-color-secondary-hex);

  --ch-color-background-hex:#18191A; --ch-color-background-hsl:hsl(210 4% 10% / 1);
  --ch-color-background: var(--ch-color-background-hex);

  --ch-color-surface-hex:#1F2021; --ch-color-surface-hsl:hsl(210 3% 13% / 1);
  --ch-color-surface: var(--ch-color-surface-hex);

  --ch-border-default-hex:#6A6B6C; --ch-border-default-hsl:hsl(210 1% 42% / 1);
  --ch-border-default: var(--ch-border-default-hex);
}
@supports (color: hsl(0 0% 0% / 1)) {
  .dark, [data-theme="dark"] {
    --ch-color-contrast: var(--ch-color-contrast-hsl);
    --ch-color-default: var(--ch-color-default-hsl);
    --ch-color-secondary: var(--ch-color-secondary-hsl);
    --ch-color-background: var(--ch-color-background-hsl);
    --ch-color-surface: var(--ch-color-surface-hsl);
    --ch-border-default: var(--ch-border-default-hsl);
  }
}
```

## 4.2 Type, Spacing, Sizes

```css
:root {
  --ch-font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Helvetica Neue", sans-serif;
  --ch-font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;

  --ch-text-xs: 0.75rem; --ch-text-sm: 0.875rem; --ch-text-md: 1rem; --ch-text-lg: 1.25rem; --ch-text-xl: 1.5rem;

  /* Fluid type (examples; extend as needed) */
  --ch-text-md-fluid: clamp(0.98rem, 0.94rem + 0.3vw, 1.125rem);
  --ch-text-lg-fluid: clamp(1.15rem, 1.05rem + 0.6vw, 1.5rem);

  --ch-leading-tight: 1.3; --ch-leading-normal: 1.5; --ch-leading-loose: 1.7;

  --ch-weight-normal: 400; --ch-weight-medium: 500; --ch-weight-semibold: 600; --ch-weight-bold: 700;

  --ch-space-xs: 0.25rem; --ch-space-sm: 0.5rem; --ch-space-md: 1rem;
  --ch-space-lg: 1.5rem;  --ch-space-xl: 2rem;   --ch-space-2xl: 3rem;

  /* Interactive heights (visual); ensure ≥44px hit-area via padding/gap */
  --ch-pressable-height-xs: 2rem;   --ch-pressable-height-sm: 2.25rem;
  --ch-pressable-height-md: 2.5rem; --ch-pressable-height-lg: 3rem;

  --ch-input-height-xs: 2rem;  --ch-input-height-sm: 2.5rem;
  --ch-input-height-md: 2.75rem; --ch-input-height-lg: 3.5rem;

  --ch-radius-sm: 0.375rem; --ch-radius-md: 0.625rem; --ch-radius-lg: 0.875rem; --ch-radius-xl: 1.25rem; --ch-radius-pill: 9999px;

  /* Icon sizes */
  --ch-icon-size-sm: 16px; --ch-icon-size-md: 20px; --ch-icon-size-lg: 24px; --ch-icon-size-xl: 28px;
}
```

## 4.3 Layout, Motion, Overlays, Z-index

```css
:root {
  --ch-grid-gutter: 1.5rem;
  --ch-container-sm: 40rem; --ch-container-md: 48rem; --ch-container-lg: 64rem; --ch-container-xl: 80rem; --ch-container-2xl: 96rem;
  --ch-container-padding: 1rem;

  --ch-opacity-hover: 0.94; --ch-opacity-pressed: 0.88; --ch-opacity-overlay: 0.4;
  --ch-state-disabled-opacity: 0.45;

  /* Easing & durations (budgets) */
  --ch-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ch-ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --ch-ease-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
  --ch-ease-emphasized: cubic-bezier(0.2, 0, 0, 1);

  --ch-dur-fast: 90ms; --ch-dur-medium: 180ms; --ch-dur-slow: 300ms;

  /* Overlays (base) */
  --ch-surface-overlay: rgba(33,37,41,0.05);
  --ch-surface-modal:   rgba(33,37,41,0.08);
  --ch-surface-recessed: rgba(33,37,41,0.03);

  /* Overlays (raised surfaces) */
  --ch-hover-on-raised:  rgba(33,37,41,0.04);
  --ch-active-on-raised: rgba(33,37,41,0.08);

  /* Ghost overlays (base) */
  --ch-hover-on-base:  rgba(33,37,41,0.05);
  --ch-active-on-base: rgba(33,37,41,0.10);

  /* Scrims & safe-areas */
  --ch-scrim-backdrop: rgba(0,0,0,0.48);
  --ch-safe-area-top: env(safe-area-inset-top, 0px);
  --ch-safe-area-right: env(safe-area-inset-right, 0px);
  --ch-safe-area-bottom: env(safe-area-inset-bottom, 0px);
  --ch-safe-area-left: env(safe-area-inset-left, 0px);

  /* Caret & scrollbar */
  --ch-caret-color: currentColor;
  --ch-scrollbar-track: rgba(0,0,0,0.06);
  --ch-scrollbar-thumb: rgba(0,0,0,0.28);

  /* Z-index scale */
  --ch-z-dropdown: 1000; --ch-z-popover: 1100; --ch-z-tooltip: 1200; --ch-z-modal: 1300; --ch-z-toast: 1400; --ch-z-max: 2147483647;
}
.dark, [data-theme="dark"] {
  --ch-surface-overlay: rgba(255,255,255,0.12);
  --ch-surface-modal:   rgba(255,255,255,0.16);
  --ch-surface-recessed: rgba(255,255,255,0.06);
  --ch-hover-on-base:  rgba(255,255,255,0.08);
  --ch-active-on-base: rgba(255,255,255,0.12);
  --ch-hover-on-raised:  rgba(255,255,255,0.06);
  --ch-active-on-raised: rgba(255,255,255,0.10);
  --ch-scrim-backdrop: rgba(0,0,0,0.60);
  --ch-caret-color: currentColor;
  --ch-scrollbar-track: rgba(255,255,255,0.08);
  --ch-scrollbar-thumb: rgba(255,255,255,0.34);
}
@media (prefers-reduced-motion: reduce) {
  :root {
    --ch-dur-fast: 0ms; --ch-dur-medium: 0ms; --ch-dur-slow: 0ms;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 5) Semantics

## 5.1 Text Hierarchy

```css
:root {
  --ch-text-primary: var(--ch-color-default);
  --ch-text-secondary: var(--ch-color-secondary);

  /* Raised to AA on light */
  --ch-text-tertiary: rgba(90,97,105,0.86);
  /* Disabled policy: exception <4.5:1 allowed; aim for ≥3:1 */
  --ch-text-disabled: rgba(33,37,41,0.4);

  --ch-text-inverse: var(--ch-color-contrast); /* black in light / white in dark */
}
.dark, [data-theme="dark"] {
  --ch-text-tertiary: rgba(255,255,255,0.65);
  --ch-text-disabled: rgba(255,255,255,0.40);
}
```

## 5.2 Surfaces & Elevation

```css
:root {
  --ch-surface-base: var(--ch-color-background);
  --ch-surface-raised: var(--ch-color-surface);
  --ch-surface-inverse: #111111;           /* inverse surface for chips/hero, light */
  --ch-surface-inverse-border: #2A2A2A;

  --ch-shadow-sm: 0 1px 2px rgba(33,37,41,0.08);
  --ch-shadow-md: 0 2px 4px rgba(33,37,41,0.10), 0 4px 6px rgba(33,37,41,0.06);
  --ch-shadow-lg: 0 4px 6px rgba(33,37,41,0.08), 0 10px 15px rgba(33,37,41,0.12);
  /* Elevation border fallback when shadows suppressed */
  --ch-elevation-border: rgba(0,0,0,0.12);
}
.dark, [data-theme="dark"] {
  --ch-surface-inverse: #F2F2F2;
  --ch-surface-inverse-border: #DADADA;

  --ch-shadow-sm: 0 1px 2px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06) inset;
  --ch-shadow-md: 0 2px 4px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.08) inset;
  --ch-shadow-lg: 0 4px 6px rgba(0,0,0,0.14), 0 10px 15px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.10) inset;
}
```

## 5.3 Focus & Interaction

```css
:root {
  --ch-focus-accent: var(--ch-action-primary-bg); /* overridable by brand */
  --ch-focus-outer: var(--ch-color-contrast);     /* black on light / white on dark */
  --ch-focus-outline-width: 2px;
  --ch-ring-inner-width: 2px; 
  --ch-ring-outer-width: 4px;
  --ch-focus-outline-offset: 2px;
  --ch-outline-border-default: var(--ch-border-ui-default);
}
.focusable:focus-visible {
  outline: var(--ch-focus-outline-width) solid var(--ch-focus-outer);
  outline-offset: var(--ch-focus-outline-offset);
  box-shadow:
    0 0 0 var(--ch-ring-inner-width) var(--ch-focus-accent),
    0 0 0 var(--ch-ring-outer-width) var(--ch-focus-outer);
}
/* Avoid clipping focus rings with overflow-hidden: apply focus styles on a non-clipping wrapper. */
```

## 5.4 Overlays (base vs raised)

```css
/* Use on neutral/ghost patterns by surface */
:root {
  --ch-ghost-hover-base: var(--ch-hover-on-base);
  --ch-ghost-active-base: var(--ch-active-on-base);
  --ch-ghost-hover-raised: var(--ch-hover-on-raised);
  --ch-ghost-active-raised: var(--ch-active-on-raised);
}
```

## 5.5 **Actions** — `--ch-action-*` (solid = default)

**Primary (monochrome action channel):**

```css
/* Light */
:root {
  --ch-action-primary-bg-hex: #111111;  --ch-action-primary-bg-hsl: hsl(0 0% 7% / 1);
  --ch-action-primary-bg: var(--ch-action-primary-bg-hex);
  --ch-action-primary-fg: #FFFFFF;
  --ch-action-primary-bg-hover: #1B1B1B;
  --ch-action-primary-bg-active: #0B0B0B;
}
/* Dark */
.dark, [data-theme="dark"] {
  --ch-action-primary-bg-hex: #F2F2F2;  --ch-action-primary-bg-hsl: hsl(0 0% 95% / 1);
  --ch-action-primary-bg: var(--ch-action-primary-bg-hex);
  --ch-action-primary-fg: #000000; /* readable on near-white */
  --ch-action-primary-bg-hover: #E8E8E8;
  --ch-action-primary-bg-active: #DDDDDD;
}
@supports (color: hsl(0 0% 0% / 1)) {
  :root { --ch-action-primary-bg: var(--ch-action-primary-bg-hsl); }
  .dark, [data-theme="dark"] { --ch-action-primary-bg: var(--ch-action-primary-bg-hsl); }
}
```

**Secondary (teal) & Status (success/warning/danger):**

```css
:root {
  --ch-action-secondary-bg:#0FA3B1; --ch-action-secondary-fg:#000;
  --ch-action-secondary-bg-hover:#0D92A0; --ch-action-secondary-bg-active:#0B828F;

  --ch-action-success-bg:#358546; --ch-action-success-fg:#FFF;
  --ch-action-success-bg-hover:#2E7640; --ch-action-success-bg-active:#296A3A;

  --ch-action-warning-bg:#D9A100; --ch-action-warning-fg:#000;
  --ch-action-warning-bg-hover:#C49000; --ch-action-warning-bg-active:#B08100;

  --ch-action-danger-bg:#E21E1E;  --ch-action-danger-fg:#FFF;
  --ch-action-danger-bg-hover:#C91A1A;  --ch-action-danger-bg-active:#B21717;
}
.dark, [data-theme="dark"] {
  --ch-action-secondary-bg:#86E1E8; --ch-action-secondary-fg:#000;
  --ch-action-secondary-bg-hover:#78CCD2; --ch-action-secondary-bg-active:#6AB7BD;

  --ch-action-success-bg:#44A859; --ch-action-success-fg:#000; /* dark uses black fg */
  --ch-action-success-bg-hover:#3C9750; --ch-action-success-bg-active:#358646;

  --ch-action-warning-bg:#FFC61A; --ch-action-warning-fg:#000;
  --ch-action-warning-bg-hover:#F2B800; --ch-action-warning-bg-active:#E6AC00;

  --ch-action-danger-bg:#F53333;  --ch-action-danger-fg:#000; /* FIX: AA on dark */
  --ch-action-danger-bg-hover:#DC2E2E;  --ch-action-danger-bg-active:#C62929;
}
```

**Non-solid (actions):** *light + dark overrides provided*

```css
:root {
  /* SOFT (tints on base; readable fg + visible border) */
  --ch-action-primary-soft-bg: rgba(0,0,0,0.06);  --ch-action-primary-soft-fg:#111;   --ch-action-primary-soft-border: rgba(0,0,0,0.24);
  --ch-action-secondary-soft-bg: rgba(15,163,177,0.14); --ch-action-secondary-soft-fg:#0C6E77; --ch-action-secondary-soft-border: rgba(15,163,177,0.38);
  --ch-action-success-soft-bg: rgba(53,133,70,0.12);   --ch-action-success-soft-fg:#1E5930;   --ch-action-success-soft-border: rgba(53,133,70,0.35);
  --ch-action-warning-soft-bg: rgba(217,161,0,0.14);   --ch-action-warning-soft-fg:#7A5C00;   --ch-action-warning-soft-border: rgba(217,161,0,0.38);
  --ch-action-danger-soft-bg:  rgba(226,30,30,0.12);   --ch-action-danger-soft-fg:#7E1212;    --ch-action-danger-soft-border: rgba(226,30,30,0.35);

  /* OUTLINE helpers (intentful) */
  --ch-outline-border-default: var(--ch-border-ui-default);
  --ch-action-outline-primary-fg: var(--ch-text-primary);   --ch-action-outline-primary-border: var(--ch-action-primary-soft-border);
  --ch-action-outline-secondary-fg: var(--ch-action-secondary-soft-fg); --ch-action-outline-secondary-border: var(--ch-action-secondary-soft-border);
  --ch-action-outline-success-fg: var(--ch-action-success-soft-fg);     --ch-action-outline-success-border: var(--ch-action-success-soft-border);
  --ch-action-outline-warning-fg: var(--ch-action-warning-soft-fg);     --ch-action-outline-warning-border: var(--ch-action-warning-soft-border);
  --ch-action-outline-danger-fg: var(--ch-action-danger-soft-fg);       --ch-action-outline-danger-border: var(--ch-action-danger-soft-border);

  /* GHOST overlays */
  --ch-ghost-hover: var(--ch-hover-on-base);
  --ch-ghost-active: var(--ch-active-on-base);
}
.dark, [data-theme="dark"] {
  --ch-action-primary-soft-bg: rgba(255,255,255,0.12);
  --ch-action-primary-soft-fg: #E8E8E8;
  --ch-action-primary-soft-border: rgba(255,255,255,0.35);

  --ch-action-secondary-soft-bg: rgba(134,225,232,0.24);
  --ch-action-secondary-soft-fg: #102A2C;
  --ch-action-secondary-soft-border: rgba(134,225,232,0.42);

  --ch-action-success-soft-bg: rgba(68,168,89,0.20);
  --ch-action-success-soft-fg: #E8FFE8;
  --ch-action-success-soft-border: rgba(68,168,89,0.42);

  --ch-action-warning-soft-bg: rgba(255,198,26,0.22);
  --ch-action-warning-soft-fg: #1A1400;
  --ch-action-warning-soft-border: rgba(255,198,26,0.45);

  --ch-action-danger-soft-bg: rgba(245,51,51,0.18);
  --ch-action-danger-soft-fg: #FFE5E5;
  --ch-action-danger-soft-border: rgba(245,51,51,0.40);

  /* Dark ghost overlays must be white tints */
  --ch-ghost-hover: rgba(255,255,255,0.08);
  --ch-ghost-active: rgba(255,255,255,0.12);
}
```

## 5.6 **Messaging / Tones** — `--ch-tone-*` (blue lives here)

```css
/* SOFT defaults for alerts/banners/tooltips/notices */
:root {
  --ch-tone-info-soft-bg: rgba(25,112,178,0.14);
  --ch-tone-info-soft-fg: #145F99;
  --ch-tone-info-soft-border: rgba(25,112,178,0.38);

  --ch-tone-success-soft-bg: var(--ch-action-success-soft-bg);
  --ch-tone-success-soft-fg: var(--ch-action-success-soft-fg);
  --ch-tone-success-soft-border: var(--ch-action-success-soft-border);

  --ch-tone-warning-soft-bg: var(--ch-action-warning-soft-bg);
  --ch-tone-warning-soft-fg: var(--ch-action-warning-soft-fg);
  --ch-tone-warning-soft-border: var(--ch-action-warning-soft-border);

  --ch-tone-danger-soft-bg: var(--ch-action-danger-soft-bg);
  --ch-tone-danger-soft-fg: var(--ch-action-danger-soft-fg);
  --ch-tone-danger-soft-border: var(--ch-action-danger-soft-border);
}
.dark, [data-theme="dark"] {
  --ch-tone-info-soft-bg: rgba(106,183,240,0.22);
  --ch-tone-info-soft-fg: #D5ECFB;
  --ch-tone-info-soft-border: rgba(106,183,240,0.44);
}

/* Optional SOLID info for strong banners */
:root { --ch-tone-info-bg:#1970B2; --ch-tone-info-fg:#FFFFFF; }
.dark, [data-theme="dark"] { --ch-tone-info-bg:#6AB7F0; --ch-tone-info-fg:#000000; }
```

## 5.7 Links

```css
:root{
  --ch-link-fg: #2457E6;
  --ch-link-fg-hover: #1F4CD0;
  --ch-link-fg-active: #1B43B9;
  --ch-link-fg-visited: #2146C4; /* darker for AA */
  --ch-link-underline-color: currentColor;
  --ch-link-underline-thickness: 1px;
  --ch-link-underline-offset: 2px;
}
.dark, [data-theme="dark"]{
  /* Dark palette (AA on dark base) */
  --ch-link-fg: #AFC2FF;
  --ch-link-fg-hover: #99B2FF;
  --ch-link-fg-active: #8AA7FF;
  --ch-link-fg-visited: #9FB4FF;

  --ch-link-underline-color: currentColor;
}
a {
  color: var(--ch-link-fg);
  text-decoration-color: var(--ch-link-underline-color);
  text-decoration-thickness: var(--ch-link-underline-thickness);
  text-underline-offset: var(--ch-link-underline-offset);
}
a:hover   { color: var(--ch-link-fg-hover); }
a:active  { color: var(--ch-link-fg-active); }
a:visited { color: var(--ch-link-fg-visited); }
/* Focus gets a non-color cue (underline thickness/offset change or outline) */
a:focus-visible { text-decoration-thickness: 2px; outline: var(--ch-focus-outline-width) solid var(--ch-focus-outer); outline-offset: var(--ch-focus-outline-offset); }
```

## 5.8 Selection, Code, KBD, Dividers, Icons

```css
:root{
  --ch-selection-bg: rgba(36,87,230,0.22);
  --ch-selection-fg: var(--ch-text-primary);

  --ch-code-bg: rgba(33,37,41,0.05);
  --ch-code-fg: var(--ch-text-primary);
  --ch-kbd-bg: rgba(33,37,41,0.06);
  --ch-kbd-fg: var(--ch-text-primary);
  --ch-kbd-border: var(--ch-border-ui-default);

  --ch-divider-color: color-mix(in oklab, var(--ch-color-contrast) 18%, transparent);
  --ch-icon-primary: var(--ch-text-primary);
  --ch-icon-secondary: var(--ch-text-secondary);
  --ch-icon-tertiary: var(--ch-text-tertiary);
  --ch-icon-success: var(--ch-action-success-bg);
  --ch-icon-warning: var(--ch-action-warning-bg);
  --ch-icon-danger:  var(--ch-action-danger-bg);
  --ch-icon-info:    var(--ch-tone-info-bg, #1970B2);
}
.dark, [data-theme="dark"]{
  --ch-code-bg: rgba(255,255,255,0.06);
  --ch-kbd-bg: rgba(255,255,255,0.08);
  --ch-divider-color: color-mix(in oklab, var(--ch-color-contrast) 22%, transparent);
}
```

## 5.9 Tables, Skeletons, Readonly/Invalid/Drag-over

```css
:root{
  --ch-table-header-bg: var(--ch-surface-recessed);
  --ch-table-header-fg: var(--ch-text-secondary);
  --ch-table-gridline: var(--ch-divider-color);
  --ch-table-row-hover: var(--ch-hover-on-base);
  --ch-table-row-selected: var(--ch-action-primary-soft-bg);

  --ch-skeleton-base: rgba(33,37,41,0.06);
  --ch-skeleton-shimmer: linear-gradient(90deg, transparent, rgba(33,37,41,0.10), transparent);

  --ch-input-readonly-bg: var(--ch-surface-recessed);
  --ch-input-readonly-fg: var(--ch-text-secondary);
  --ch-input-readonly-border: var(--ch-border-ui-default);

  --ch-input-invalid-border: var(--ch-action-danger-soft-border); /* ≥3:1 on inputs */
  --ch-input-invalid-bg: var(--ch-action-danger-soft-bg);
  --ch-input-invalid-fg: var(--ch-text-primary);

  --ch-dropzone-dragover-bg: var(--ch-action-primary-soft-bg);
  --ch-dropzone-dragover-border: var(--ch-action-primary-soft-border);
}
.dark, [data-theme="dark"]{
  --ch-skeleton-base: rgba(255,255,255,0.10);
  --ch-skeleton-shimmer: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
}
```

## 5.10 Progress/Spinner & Underline Semantics

```css
:root{
  --ch-progress-track: color-mix(in oklab, var(--ch-color-contrast) 10%, transparent);
  --ch-progress-bar: var(--ch-action-primary-bg);
  --ch-spinner-stroke: var(--ch-action-primary-bg);

  --ch-decoration-underline-color: currentColor;
  --ch-decoration-underline-thickness: 1px;
  --ch-decoration-underline-offset: 2px;
}
```

---

# 6) Component Token **Contracts** & Patterns (generic)

* Components **must** alias semantics; **never** primitives or raw colors.
* **Pressables (actions):** map `primary|secondary|success|warning|danger` to `--ch-action-*` for `bg/fg/border/shadow` across states; solids opaque; outline/ghost use intentful borders/overlays.
* **Messaging surfaces (tones):** map `info|success|warning|danger` to `--ch-tone-*` (soft default); never use `--ch-action-*`.
* **Inputs/controls:** use `--ch-input-*`, `--ch-text-*`, `--ch-border-ui-default`; for invalid/readonly, consume the provided semantics; keep focus ring visible.
* **Containers (cards/panels/sheets/dialogs):** use `--ch-surface-*`, `--ch-shadow-*` or `--ch-elevation-border`; for backdrops use `--ch-scrim-backdrop`.

**Generic pressable pattern (example only; not a component spec):**

```css
.pressable {
  display:inline-flex; align-items:center; justify-content:center; gap:var(--ch-space-sm);
  padding-inline: var(--ch-space-md);
  height: max(calc(var(--ch-pressable-height-md) * var(--ch-density-scale)), 2.75rem); /* ≥44px hit-area */
  font-family: var(--ch-font-sans);
  font-size: var(--ch-text-md); font-weight: var(--ch-weight-medium); line-height: var(--ch-leading-tight);
  border-radius: var(--ch-radius-md);
  border: var(--ch-border-width-sm) solid transparent; cursor: pointer; user-select: none;
  transition: background-color var(--ch-dur-medium) var(--ch-ease-standard),
              color var(--ch-dur-medium) var(--ch-ease-standard),
              box-shadow var(--ch-dur-medium) var(--ch-ease-standard),
              transform var(--ch-dur-fast) var(--ch-ease-standard);
}
.pressable--primary     { color: var(--ch-action-primary-fg);     background: var(--ch-action-primary-bg);     box-shadow: var(--ch-shadow-sm); }
.pressable--primary:hover  { background: var(--ch-action-primary-bg-hover); }
.pressable--primary:active { background: var(--ch-action-primary-bg-active); transform: translateY(1px); }
.pressable:focus-visible {
  outline: var(--ch-focus-outline-width) solid var(--ch-focus-outer);
  outline-offset: var(--ch-focus-outline-offset);
  box-shadow: var(--ch-shadow-sm), 0 0 0 var(--ch-ring-inner-width) var(--ch-focus-accent), 0 0 0 var(--ch-ring-outer-width) var(--ch-focus-outer);
}
.pressable[disabled] { opacity: var(--ch-state-disabled-opacity); pointer-events:none; cursor:not-allowed; }
```

---

# 7) Accessibility Requirements (WCAG 2.2 AA)

* **Contrast:** normal text ≥ **4.5:1**; large text (≥18.66px bold / 24px regular) ≥ **3:1**; non-text UI (borders, icons, focus outer) ≥ **3:1**.
  *Disabled text:* explicit exception allowed (<4.5:1), target ≥ **3:1**.
  *Soft borders:* may be <3:1 **only** on non-interactive soft surfaces and *only* with tinted bg + icon/text cue.
* **Focus indicators:** two-ring (outer ≥ **3:1**) + 2px outline fallback; rings must not be clipped; respect component radius and use tokens for widths/offsets.
* **Keyboard:** pressables: Space/Enter; toggles mirror `checked`; roving tabindex for composite widgets; ESC closes transient layers and returns focus to the invoker.
* **Targets:** ≥ **44×44px** hit area (visual may be smaller if spacing ≥ 24px between targets).
* **No color-only meaning:** pair with icon/text/pattern.
* **Motion:** respect `prefers-reduced-motion`; avoid smooth scroll and press transforms when reduced.
* **Forced Colors (Windows HC):** replace overlays with solid borders/fills; keep outline visible.

```css
@media (forced-colors: active) {
  :root {
    --ch-text-primary: CanvasText;
    --ch-surface-base: Canvas;
    --ch-border-ui-default: CanvasText;
  }
  a { outline: 1px solid LinkText; }
  .focusable:focus-visible { outline: var(--ch-focus-outline-width) solid Highlight; outline-offset: var(--ch-focus-outline-offset); box-shadow: none; }
}
```

---

# 8) RTL & Internationalization

```css
:root { --ch-dir: 1; }
[dir="rtl"] { --ch-dir: -1; }

/* Prefer logical properties; mirror icons via scaleX, not rotate(180deg) */
.icon[dir="rtl"] { transform: scaleX(-1); }
```

Guidance:

* Use **logical properties** for margin/padding/borders.
* Mirror **icons and motion** in RTL.
* Use tabular numerals in data UIs: `font-variant-numeric: tabular-nums;`.
* Apply bidi isolates (`<bdi>`) for numbers in RTL contexts.

---

# 9) Density, Responsiveness & Container Queries

```css
:root {
  --ch-density-scale: 1; /* 0.95 compact | 1 default | 1.1 comfortable */
  --ch-lh-scale: calc(1 + (var(--ch-density-scale) - 1) * 0.15);
  --ch-hit-target-min: 2.75rem; /* 44px */

  /* Which paddings scale with density */
  --ch-interactive-padding-inline: calc(var(--ch-space-md) * var(--ch-density-scale));
  --ch-interactive-padding-block: calc(var(--ch-space-sm) * var(--ch-density-scale));
}
.body-text { line-height: calc(var(--ch-leading-normal) * var(--ch-lh-scale)); }
```

* **Container-first:** prefer `@container` for components; viewport breakpoints for page shells.
* Use dynamic viewport units (`dvh/lvh/svh`) to avoid mobile chrome jumps; provide safe fallbacks.

---

# 10) Governance & Tooling

## 10.1 Policy & Lint Rules (enforced)

* **No raw colors** (`#`, `rgb[a]`, `hsl[a]`, `oklch`) inside `--<component>-*`.
* **No primitives** (`--ch-color-*`) inside `--<component>-*`.
* **Outline intent coverage:** if any `outline` alias exists, all action meanings must have it.
* **Alpha text guardrail:** any `--ch-text-*` using alpha must pass AA in CI.
* **Slot grammar:** single-hyphen slot only (e.g., `--card-header-…`).
* **Visited:** only anchors adopt `:visited`.
* **Namespacing:** all DS tokens prefixed `--ch-…`.

## 10.2 CI/CD & Tests

* **Contrast checker** (axe/pa11y) for text/non-text UI and focus rings, including **forced-colors** snapshots.
* **Keyboard tests** (Testing Library + jest-axe) incl. roving tabindex, focus trap, ESC close, focus return.
* **Visual regression** (Playwright) across light/dark/tones/density/RTL/container widths.
* **Token drift detection** (resolved CSS snapshots per target browser & supports branches).
* **Stylelint:** rules above; detect var cycles across themes; cap `var()` fallback depth.

## 10.3 Deprecation Lifecycle

* Mark with `@deprecated` + reason + replacement.
* Warn for **2 minor** releases; remove on next **major**.

---

# 11) Testing & Validation (snippets)

```javascript
// jest-axe
expect.extend(require('jest-axe').toHaveNoViolations);

test('Pressable AA + focus visible', async () => {
  const { container } = render(<Pressable className="pressable pressable--primary">Go</Pressable>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Keyboard & focus return
test('ESC closes transient and returns focus', () => {
  // open popover -> ESC -> focus back on trigger
});
```

---

# 12) Design Token JSON Export (excerpt; W3C schema)

```json
{
  "$schema": "https://design-tokens.org/schema.json",
  "ch": {
    "actions": {
      "primary": {
        "bg": { "type": "color", "value": "#111111", "modes": { "dark": "#F2F2F2" } },
        "fg": { "type": "color", "value": "#FFFFFF", "modes": { "dark": "#000000" } }
      },
      "secondary": {
        "bg": { "type": "color", "value": "#0FA3B1", "modes": { "dark": "#86E1E8" } },
        "fg": { "type": "color", "value": "#000000", "modes": { "dark": "#000000" } }
      },
      "success":  {
        "bg": { "type": "color", "value": "#358546", "modes": { "dark": "#44A859" } },
        "fg": { "type": "color", "value": "#FFFFFF", "modes": { "dark": "#000000" } }
      },
      "warning":  {
        "bg": { "type": "color", "value": "#D9A100", "modes": { "dark": "#FFC61A" } },
        "fg": { "type": "color", "value": "#000000", "modes": { "dark": "#000000" } }
      },
      "danger":   {
        "bg": { "type": "color", "value": "#E21E1E", "modes": { "dark": "#F53333" } },
        "fg": { "type": "color", "value": "#FFFFFF", "modes": { "dark": "#000000" } }
      }
    },
    "tones": {
      "info": {
        "softBg": { "type": "color", "value": "rgba(25,112,178,0.14)", "modes": { "dark": "rgba(106,183,240,0.22)" } },
        "softFg": { "type": "color", "value": "#145F99", "modes": { "dark": "#D5ECFB" } },
        "softBorder": { "type": "color", "value": "rgba(25,112,178,0.38)", "modes": { "dark": "rgba(106,183,240,0.44)" } },
        "solidBg": { "type": "color", "value": "#1970B2", "modes": { "dark": "#6AB7F0" } },
        "solidFg": { "type": "color", "value": "#FFFFFF", "modes": { "dark": "#000000" } }
      }
    },
    "links": {
      "default": { "type": "color", "value": "#2457E6", "modes": { "dark": "#AFC2FF" } },
      "hover":   { "type": "color", "value": "#1F4CD0", "modes": { "dark": "#99B2FF" } },
      "active":  { "type": "color", "value": "#1B43B9", "modes": { "dark": "#8AA7FF" } },
      "visited": { "type": "color", "value": "#2146C4", "modes": { "dark": "#9FB4FF" } }
    }
  }
}
```

---

# 13) Changelog — **v1.0.1**

* **New:** Namespacing of semantics — `--ch-action-*` and `--ch-tone-*`.
* **New:** **`--ch-`** token prefix; lints enforce no raw colors in components.
* **New:** Dark soft sets for actions; white ghost overlays on dark; dark `shadow-sm`.
* **New:** Full dark link state palette with non-color focus cue.
* **New:** Focus tokens (`--ch-focus-accent`, widths/offset) and dynamic adjacent-surface contrast rule.
* **New:** Additional semantics: selection/highlight, code/kbd, table, divider, skeleton, read-only/invalid/drag-over, progress/spinner, icon colors, inverse surface, raised overlays, scrim backdrop, caret, scrollbar, border widths, z-index, safe-areas.
* **Changed:** Danger on dark now uses **black** fg (AA). Tertiary text on light raised to AA.
* **Changed:** Theming supports **both** `.dark` and `[data-theme="dark"]`.
* **Changed:** Delivery: standardized `@supports` gates; `color-scheme: light dark`.
* **Governance:** Stylelint rules expanded; CI adds forced-colors snapshots; deprecation lifecycle (2 minors → next major).
* **Docs:** Container-first guidance; 44px targets and ≥24px inter-target spacing; link visited only for anchors; placeholder & disabled contrast policies; soft-border exception clarified.
* **Deferred:** Data-viz palettes (to a later minor).