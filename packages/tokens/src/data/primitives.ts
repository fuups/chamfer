import type {
  ColorTokenBlock,
  PrimitiveTokens,
  SimpleTokenBlock
} from "../types.js";

const colorBlocks: ColorTokenBlock[] = [
  {
    type: "color",
    label: "Color primitives (light)",
    selector: ":root",
    tokens: [
      {
        name: "color-contrast",
        oklch: "oklch(0.0000 0.0000 0.00)",
        hsla: "hsla(0, 0%, 0%, 1)",
        hsl: "hsl(0 0% 0% / 1)",
        hex: "#000000",
        value: "var(--color-contrast-hex)"
      },
      {
        name: "color-default",
        oklch: "oklch(0.2621 0.0095 248.19)",
        hsla: "hsla(210, 11%, 15%, 1)",
        hsl: "hsl(210 11% 15% / 1)",
        hex: "#212529",
        value: "var(--color-default-hex)"
      },
      {
        name: "color-primary",
        oklch: "oklch(0.0000 0.0000 0.00)",
        hsla: "hsla(0, 0%, 0%, 1)",
        hsl: "hsl(0 0% 0% / 1)",
        hex: "#000000",
        value: "var(--color-primary-hex)"
      },
      {
        name: "color-secondary",
        oklch: "oklch(0.4985 0.0145 244.89)",
        hsla: "hsla(208, 7%, 38%, 1)",
        hsl: "hsl(208 7% 38% / 1)",
        hex: "#5A6169",
        value: "var(--color-secondary-hex)"
      },
      {
        name: "color-tertiary",
        oklch: "oklch(0.8261 0.0000 89.88)",
        hsla: "hsla(0, 0%, 78%, 1)",
        hsl: "hsl(0 0% 78% / 1)",
        hex: "#C7C7C7",
        value: "var(--color-tertiary-hex)"
      },
      {
        name: "color-success",
        oklch: "oklch(0.5753 0.1341 147.92)",
        hsla: "hsla(132, 45%, 38%, 1)",
        hsl: "hsl(132 45% 38% / 1)",
        hex: "#358546",
        value: "var(--color-success-hex)"
      },
      {
        name: "color-warning",
        oklch: "oklch(0.7403 0.1587 85.16)",
        hsla: "hsla(45, 92%, 42%, 1)",
        hsl: "hsl(45 92% 42% / 1)",
        hex: "#D9A100",
        value: "var(--color-warning-hex)"
      },
      {
        name: "color-danger",
        oklch: "oklch(0.5579 0.2300 27.58)",
        hsla: "hsla(0, 88%, 48%, 1)",
        hsl: "hsl(0 88% 48% / 1)",
        hex: "#E21E1E",
        value: "var(--color-danger-hex)"
      },
      {
        name: "color-info",
        oklch: "oklch(0.5814 0.1418 245.25)",
        hsla: "hsla(205, 75%, 45%, 1)",
        hsl: "hsl(205 75% 45% / 1)",
        hex: "#1C7EC5",
        value: "var(--color-info-hex)"
      },
      {
        name: "color-background",
        oklch: "oklch(1.0000 0.0000 89.88)",
        hsla: "hsla(0, 0%, 100%, 1)",
        hsl: "hsl(0 0% 100% / 1)",
        hex: "#FFFFFF",
        value: "var(--color-background-hex)"
      },
      {
        name: "color-surface",
        oklch: "oklch(0.9850 0.0000 89.88)",
        hsla: "hsla(0, 0%, 98%, 1)",
        hsl: "hsl(0 0% 98% / 1)",
        hex: "#FAFAFA",
        value: "var(--color-surface-hex)"
      }
    ]
  },
  {
    type: "color",
    label: "Color primitives (dark)",
    selector: ".dark,\n[data-theme=\"dark\"]",
    tokens: [
      {
        name: "color-contrast",
        oklch: "oklch(1.0000 0.0000 89.88)",
        hsla: "hsla(0, 0%, 100%, 1)",
        hsl: "hsl(0 0% 100% / 1)",
        hex: "#FFFFFF",
        value: "var(--color-contrast-hex)"
      },
      {
        name: "color-default",
        oklch: "oklch(0.9248 0.0071 268.54)",
        hsla: "hsla(223, 15%, 91%, 1)",
        hsl: "hsl(223 15% 91% / 1)",
        hex: "#E4E6EB",
        value: "var(--color-default-hex)"
      },
      {
        name: "color-primary",
        oklch: "oklch(1.0000 0.0000 89.88)",
        hsla: "hsla(0, 0%, 100%, 1)",
        hsl: "hsl(0 0% 100% / 1)",
        hex: "#FFFFFF",
        value: "var(--color-primary-hex)"
      },
      {
        name: "color-secondary",
        oklch: "oklch(0.7359 0.0079 260.73)",
        hsla: "hsla(218, 6%, 67%, 1)",
        hsl: "hsl(218 6% 67% / 1)",
        hex: "#A4A7AC",
        value: "var(--color-secondary-hex)"
      },
      {
        name: "color-tertiary",
        oklch: "oklch(0.3817 0.0022 247.89)",
        hsla: "hsla(210, 2%, 27%, 1)",
        hsl: "hsl(210 2% 27% / 1)",
        hex: "#444546",
        value: "var(--color-tertiary-hex)"
      },
      {
        name: "color-success",
        oklch: "oklch(0.6353 0.1341 147.92)",
        hsla: "hsla(132, 43%, 46%, 1)",
        hsl: "hsl(132 43% 46% / 1)",
        hex: "#44A859",
        value: "var(--color-success-hex)"
      },
      {
        name: "color-warning",
        oklch: "oklch(0.8503 0.1687 85.16)",
        hsla: "hsla(45, 96%, 55%, 1)",
        hsl: "hsl(45 96% 55% / 1)",
        hex: "#FFC61A",
        value: "var(--color-warning-hex)"
      },
      {
        name: "color-danger",
        oklch: "oklch(0.6379 0.2300 27.58)",
        hsla: "hsla(0, 86%, 57%, 1)",
        hsl: "hsl(0 86% 57% / 1)",
        hex: "#F53333",
        value: "var(--color-danger-hex)"
      },
      {
        name: "color-info",
        oklch: "oklch(0.7524 0.1125 242.34)",
        hsla: "hsla(206, 82%, 68%, 1)",
        hsl: "hsl(206 82% 68% / 1)",
        hex: "#6AB7F0",
        value: "var(--color-info-hex)"
      },
      {
        name: "color-background",
        oklch: "oklch(0.2127 0.0025 247.94)",
        hsla: "hsla(210, 4%, 10%, 1)",
        hsl: "hsl(210 4% 10% / 1)",
        hex: "#18191A",
        value: "var(--color-background-hex)"
      },
      {
        name: "color-surface",
        oklch: "oklch(0.2427 0.0025 247.94)",
        hsla: "hsla(210, 4%, 13%, 1)",
        hsl: "hsl(210 4% 13% / 1)",
        hex: "#1F2021",
        value: "var(--color-surface-hex)"
      }
    ]
  }
];

const colorAliasBlock: SimpleTokenBlock = {
  type: "scalar",
  label: "Chamfer color aliases",
  selector: ":root",
  tokens: [
    { name: "ch-color-contrast-oklch", value: "var(--color-contrast-oklch)" },
    { name: "ch-color-contrast-hsla", value: "var(--color-contrast-hsla)" },
    { name: "ch-color-contrast-hsl", value: "var(--color-contrast-hsl)" },
    { name: "ch-color-contrast-hex", value: "var(--color-contrast-hex)" },
    { name: "ch-color-contrast", value: "var(--color-contrast)" },

    { name: "ch-color-default-oklch", value: "var(--color-default-oklch)" },
    { name: "ch-color-default-hsla", value: "var(--color-default-hsla)" },
    { name: "ch-color-default-hsl", value: "var(--color-default-hsl)" },
    { name: "ch-color-default-hex", value: "var(--color-default-hex)" },
    { name: "ch-color-default", value: "var(--color-default)" },

    { name: "ch-color-primary-oklch", value: "var(--color-primary-oklch)" },
    { name: "ch-color-primary-hsla", value: "var(--color-primary-hsla)" },
    { name: "ch-color-primary-hsl", value: "var(--color-primary-hsl)" },
    { name: "ch-color-primary-hex", value: "var(--color-primary-hex)" },
    { name: "ch-color-primary", value: "var(--color-primary)" },

    { name: "ch-color-secondary-oklch", value: "var(--color-secondary-oklch)" },
    { name: "ch-color-secondary-hsla", value: "var(--color-secondary-hsla)" },
    { name: "ch-color-secondary-hsl", value: "var(--color-secondary-hsl)" },
    { name: "ch-color-secondary-hex", value: "var(--color-secondary-hex)" },
    { name: "ch-color-secondary", value: "var(--color-secondary)" },

    { name: "ch-color-tertiary-oklch", value: "var(--color-tertiary-oklch)" },
    { name: "ch-color-tertiary-hsla", value: "var(--color-tertiary-hsla)" },
    { name: "ch-color-tertiary-hsl", value: "var(--color-tertiary-hsl)" },
    { name: "ch-color-tertiary-hex", value: "var(--color-tertiary-hex)" },
    { name: "ch-color-tertiary", value: "var(--color-tertiary)" },

    { name: "ch-color-success-oklch", value: "var(--color-success-oklch)" },
    { name: "ch-color-success-hsla", value: "var(--color-success-hsla)" },
    { name: "ch-color-success-hsl", value: "var(--color-success-hsl)" },
    { name: "ch-color-success-hex", value: "var(--color-success-hex)" },
    { name: "ch-color-success", value: "var(--color-success)" },

    { name: "ch-color-warning-oklch", value: "var(--color-warning-oklch)" },
    { name: "ch-color-warning-hsla", value: "var(--color-warning-hsla)" },
    { name: "ch-color-warning-hsl", value: "var(--color-warning-hsl)" },
    { name: "ch-color-warning-hex", value: "var(--color-warning-hex)" },
    { name: "ch-color-warning", value: "var(--color-warning)" },

    { name: "ch-color-danger-oklch", value: "var(--color-danger-oklch)" },
    { name: "ch-color-danger-hsla", value: "var(--color-danger-hsla)" },
    { name: "ch-color-danger-hsl", value: "var(--color-danger-hsl)" },
    { name: "ch-color-danger-hex", value: "var(--color-danger-hex)" },
    { name: "ch-color-danger", value: "var(--color-danger)" },

    { name: "ch-color-info-oklch", value: "var(--color-info-oklch)" },
    { name: "ch-color-info-hsla", value: "var(--color-info-hsla)" },
    { name: "ch-color-info-hsl", value: "var(--color-info-hsl)" },
    { name: "ch-color-info-hex", value: "var(--color-info-hex)" },
    { name: "ch-color-info", value: "var(--color-info)" },

    { name: "ch-color-background-oklch", value: "var(--color-background-oklch)" },
    { name: "ch-color-background-hsla", value: "var(--color-background-hsla)" },
    { name: "ch-color-background-hsl", value: "var(--color-background-hsl)" },
    { name: "ch-color-background-hex", value: "var(--color-background-hex)" },
    { name: "ch-color-background", value: "var(--color-background)" },

    { name: "ch-color-surface-oklch", value: "var(--color-surface-oklch)" },
    { name: "ch-color-surface-hsla", value: "var(--color-surface-hsla)" },
    { name: "ch-color-surface-hsl", value: "var(--color-surface-hsl)" },
    { name: "ch-color-surface-hex", value: "var(--color-surface-hex)" },
    { name: "ch-color-surface", value: "var(--color-surface)" },

    { name: "ch-border-default-oklch", value: "var(--color-tertiary-oklch)" },
    { name: "ch-border-default-hsla", value: "var(--color-tertiary-hsla)" },
    { name: "ch-border-default-hsl", value: "var(--color-tertiary-hsl)" },
    { name: "ch-border-default-hex", value: "var(--color-tertiary-hex)" },
    { name: "ch-border-default", value: "var(--color-tertiary)" },
    { name: "ch-border-ui-default", value: "var(--ch-border-default)" }
  ]
};

const scaleBlocks: SimpleTokenBlock[] = [
  {
    type: "scalar",
    label: "Border widths",
    selector: ":root",
    tokens: [
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
          '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, "Helvetica Neue", sans-serif'
      },
      {
        name: "ch-font-mono",
        value:
          'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'
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
    selector: ".dark,\n[data-theme=\"dark\"]",
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
  scales: [colorAliasBlock, ...scaleBlocks]
};
