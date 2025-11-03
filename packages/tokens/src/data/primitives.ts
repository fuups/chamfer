import type { ColorTokenBlock, PrimitiveTokens, SimpleTokenBlock } from "../types.js";

const colorBlocks: ColorTokenBlock[] = [
  {
    type: "color",
    label: "Structural colors (light)",
    selector: ":root",
    tokens: [
      {
        name: "ch-color-default",
        hex: "#212529",
        hsl: "hsl(210 11% 15% / 1)",
        value: "var(--ch-color-default-hex)"
      },
      {
        name: "ch-color-secondary",
        hex: "#5A6169",
        hsl: "hsl(212 8% 38% / 1)",
        value: "var(--ch-color-secondary-hex)"
      },
      {
        name: "ch-color-background",
        hex: "#FFFFFF",
        hsl: "hsl(0 0% 100% / 1)",
        value: "var(--ch-color-background-hex)"
      },
      {
        name: "ch-color-surface",
        hex: "#FAFAFA",
        hsl: "hsl(0 0% 98% / 1)",
        value: "var(--ch-color-surface-hex)"
      },
      {
        name: "ch-border-default",
        hex: "#8F8F8F",
        hsl: "hsl(0 0% 56% / 1)",
        value: "var(--ch-border-default-hex)"
      }
    ]
  },
  {
    type: "color",
    label: "Structural colors (dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      {
        name: "ch-color-default",
        hex: "#E4E6EB",
        hsl: "hsl(223 15% 91% / 1)",
        value: "var(--ch-color-default-hex)"
      },
      {
        name: "ch-color-secondary",
        hex: "#A4A7AC",
        hsl: "hsl(218 5% 66% / 1)",
        value: "var(--ch-color-secondary-hex)"
      },
      {
        name: "ch-color-background",
        hex: "#18191A",
        hsl: "hsl(210 4% 10% / 1)",
        value: "var(--ch-color-background-hex)"
      },
      {
        name: "ch-color-surface",
        hex: "#1F2021",
        hsl: "hsl(210 3% 13% / 1)",
        value: "var(--ch-color-surface-hex)"
      },
      {
        name: "ch-border-default",
        hex: "#6A6B6C",
        hsl: "hsl(210 1% 42% / 1)",
        value: "var(--ch-border-default-hex)"
      }
    ]
  }
];

const scaleBlocks: SimpleTokenBlock[] = [
  {
    type: "scalar",
    label: "Structural aliases & border widths",
    selector: ":root",
    tokens: [
      { name: "ch-border-ui-default", value: "var(--ch-border-default)" },
      { name: "ch-border-width-sm", value: "1px" },
      { name: "ch-border-width-md", value: "1.5px", comment: "Hi-DPI friendly" },
      { name: "ch-border-width-lg", value: "2px" }
    ]
  },
  {
    type: "scalar",
    label: "Typography & fonts",
    selector: ":root",
    tokens: [
      {
        name: "ch-font-sans",
        value:
          '"Geist", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Helvetica Neue", sans-serif'
      },
      {
        name: "ch-font-mono",
        value:
          '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'
      },
      { name: "ch-text-xs", value: "0.75rem" },
      { name: "ch-text-sm", value: "0.875rem" },
      { name: "ch-text-md", value: "1rem", comment: "Default body" },
      { name: "ch-text-lg", value: "1.25rem" },
      { name: "ch-text-xl", value: "1.5rem" },
      {
        name: "ch-text-md-fluid",
        value: "clamp(0.98rem, 0.94rem + 0.3vw, 1.125rem)"
      },
      {
        name: "ch-text-lg-fluid",
        value: "clamp(1.15rem, 1.05rem + 0.6vw, 1.5rem)"
      },
      { name: "ch-leading-tight", value: "1.3" },
      { name: "ch-leading-normal", value: "1.5" },
      { name: "ch-leading-loose", value: "1.7" },
      { name: "ch-weight-normal", value: "400" },
      { name: "ch-weight-medium", value: "500" },
      { name: "ch-weight-semibold", value: "600" },
      { name: "ch-weight-bold", value: "700" }
    ]
  },
  {
    type: "scalar",
    label: "Spacing scale",
    selector: ":root",
    tokens: [
      { name: "ch-space-xs", value: "0.25rem", comment: "4px" },
      { name: "ch-space-sm", value: "0.5rem", comment: "8px" },
      { name: "ch-space-md", value: "1rem", comment: "16px" },
      { name: "ch-space-lg", value: "1.5rem", comment: "24px" },
      { name: "ch-space-xl", value: "2rem", comment: "32px" },
      { name: "ch-space-2xl", value: "3rem", comment: "48px" }
    ]
  },
  {
    type: "scalar",
    label: "Interactive heights",
    selector: ":root",
    tokens: [
      { name: "ch-pressable-height-xs", value: "2rem", comment: "32px" },
      { name: "ch-pressable-height-sm", value: "2.25rem", comment: "36px" },
      { name: "ch-pressable-height-md", value: "2.5rem", comment: "40px" },
      { name: "ch-pressable-height-lg", value: "3rem", comment: "48px" },
      { name: "ch-input-height-xs", value: "2rem", comment: "32px" },
      { name: "ch-input-height-sm", value: "2.5rem", comment: "40px" },
      { name: "ch-input-height-md", value: "2.75rem", comment: "44px" },
      { name: "ch-input-height-lg", value: "3.5rem", comment: "56px" }
    ]
  },
  {
    type: "scalar",
    label: "Radii & icon sizes",
    selector: ":root",
    tokens: [
      { name: "ch-radius-sm", value: "0.375rem" },
      { name: "ch-radius-md", value: "0.625rem" },
      { name: "ch-radius-lg", value: "0.875rem" },
      { name: "ch-radius-xl", value: "1.25rem" },
      { name: "ch-radius-pill", value: "9999px" },
      { name: "ch-icon-size-sm", value: "16px" },
      { name: "ch-icon-size-md", value: "20px" },
      { name: "ch-icon-size-lg", value: "24px" },
      { name: "ch-icon-size-xl", value: "28px" }
    ]
  },
  {
    type: "scalar",
    label: "Layout & safe areas",
    selector: ":root",
    tokens: [
      { name: "ch-grid-gutter", value: "1.5rem" },
      { name: "ch-container-sm", value: "40rem" },
      { name: "ch-container-md", value: "48rem" },
      { name: "ch-container-lg", value: "64rem" },
      { name: "ch-container-xl", value: "80rem" },
      { name: "ch-container-2xl", value: "96rem" },
      { name: "ch-container-padding", value: "1rem" },
      { name: "ch-safe-area-top", value: "env(safe-area-inset-top, 0px)" },
      { name: "ch-safe-area-right", value: "env(safe-area-inset-right, 0px)" },
      { name: "ch-safe-area-bottom", value: "env(safe-area-inset-bottom, 0px)" },
      { name: "ch-safe-area-left", value: "env(safe-area-inset-left, 0px)" }
    ]
  },
  {
    type: "scalar",
    label: "Motion & state values",
    selector: ":root",
    tokens: [
      { name: "ch-opacity-hover", value: "0.94" },
      { name: "ch-opacity-pressed", value: "0.88" },
      { name: "ch-opacity-overlay", value: "0.4" },
      { name: "ch-state-disabled-opacity", value: "0.45" },
      { name: "ch-ease-standard", value: "cubic-bezier(0.2, 0, 0, 1)" },
      { name: "ch-ease-decelerate", value: "cubic-bezier(0, 0, 0.2, 1)" },
      { name: "ch-ease-accelerate", value: "cubic-bezier(0.3, 0, 0.8, 0.15)" },
      { name: "ch-ease-emphasized", value: "cubic-bezier(0.2, 0, 0, 1)" },
      { name: "ch-dur-fast", value: "90ms" },
      { name: "ch-dur-medium", value: "180ms" },
      { name: "ch-dur-slow", value: "300ms" }
    ]
  },
  {
    type: "scalar",
    label: "Overlays, scrims & chrome (light)",
    selector: ":root",
    tokens: [
      { name: "ch-surface-overlay", value: "rgba(33,37,41,0.05)" },
      { name: "ch-surface-modal", value: "rgba(33,37,41,0.08)" },
      { name: "ch-surface-recessed", value: "rgba(33,37,41,0.03)" },
      { name: "ch-hover-on-raised", value: "rgba(33,37,41,0.04)" },
      { name: "ch-active-on-raised", value: "rgba(33,37,41,0.08)" },
      { name: "ch-hover-on-base", value: "rgba(33,37,41,0.05)" },
      { name: "ch-active-on-base", value: "rgba(33,37,41,0.10)" },
      { name: "ch-scrim-backdrop", value: "rgba(0,0,0,0.48)" },
      { name: "ch-caret-color", value: "currentColor" },
      { name: "ch-scrollbar-track", value: "rgba(0,0,0,0.06)" },
      { name: "ch-scrollbar-thumb", value: "rgba(0,0,0,0.28)" }
    ]
  },
  {
    type: "scalar",
    label: "Overlays, scrims & chrome (dark)",
    selector: '.dark,\n[data-theme="dark"]',
    tokens: [
      { name: "ch-surface-overlay", value: "rgba(255,255,255,0.12)" },
      { name: "ch-surface-modal", value: "rgba(255,255,255,0.16)" },
      { name: "ch-surface-recessed", value: "rgba(255,255,255,0.06)" },
      { name: "ch-hover-on-base", value: "rgba(255,255,255,0.08)" },
      { name: "ch-active-on-base", value: "rgba(255,255,255,0.12)" },
      { name: "ch-hover-on-raised", value: "rgba(255,255,255,0.06)" },
      { name: "ch-active-on-raised", value: "rgba(255,255,255,0.10)" },
      { name: "ch-scrim-backdrop", value: "rgba(0,0,0,0.60)" },
      { name: "ch-caret-color", value: "currentColor" },
      { name: "ch-scrollbar-track", value: "rgba(255,255,255,0.08)" },
      { name: "ch-scrollbar-thumb", value: "rgba(255,255,255,0.34)" }
    ]
  },
  {
    type: "scalar",
    label: "Z-index scale",
    selector: ":root",
    tokens: [
      { name: "ch-z-dropdown", value: "1000" },
      { name: "ch-z-popover", value: "1100" },
      { name: "ch-z-tooltip", value: "1200" },
      { name: "ch-z-modal", value: "1300" },
      { name: "ch-z-toast", value: "1400" },
      { name: "ch-z-max", value: "2147483647" }
    ]
  },
  {
    type: "scalar",
    label: "Density & responsive helpers",
    selector: ":root",
    tokens: [
      {
        name: "ch-density-scale",
        value: "1",
        comment: "0.95 compact | 1 default | 1.1 comfortable"
      },
      {
        name: "ch-lh-scale",
        value: "calc(1 + (var(--ch-density-scale) - 1) * 0.15)"
      },
      { name: "ch-hit-target-min", value: "2.75rem", comment: "44px" },
      {
        name: "ch-interactive-padding-inline",
        value: "calc(var(--ch-space-md) * var(--ch-density-scale))"
      },
      {
        name: "ch-interactive-padding-block",
        value: "calc(var(--ch-space-sm) * var(--ch-density-scale))"
      }
    ]
  },
  {
    type: "scalar",
    label: "Reduced motion overrides",
    selector: ":root",
    atRule: "@media (prefers-reduced-motion: reduce)",
    tokens: [
      { name: "ch-dur-fast", value: "0ms" },
      { name: "ch-dur-medium", value: "0ms" },
      { name: "ch-dur-slow", value: "0ms" }
    ]
  }
];

export const primitives: PrimitiveTokens = {
  colors: colorBlocks,
  scales: scaleBlocks
};
