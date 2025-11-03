import type { Config, PluginCreator } from "tailwindcss/types/config";
import plugin from "tailwindcss/plugin";

const preset: Config = {
  theme: {
    extend: {
      colors: {
        "chamfer-base": {
          contrast: "var(--color-contrast)",
          default: "var(--color-default)",
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          tertiary: "var(--color-tertiary)",
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          danger: "var(--color-danger)",
          info: "var(--color-info)",
          background: "var(--color-background)",
          surface: "var(--color-surface)"
        },
        "chamfer-text": {
          primary: "var(--ch-text-primary)",
          secondary: "var(--ch-text-secondary)",
          inverse: "var(--ch-text-inverse)"
        },
        "chamfer-surface": {
          base: "var(--ch-surface-base)",
          raised: "var(--ch-surface-raised)",
          inverse: "var(--ch-surface-inverse)"
        },
        "chamfer-action": {
          primary: "var(--ch-action-primary-bg)",
          secondary: "var(--ch-action-secondary-bg)",
          success: "var(--ch-action-success-bg)",
          warning: "var(--ch-action-warning-bg)",
          danger: "var(--ch-action-danger-bg)"
        },
        "chamfer-tone": {
          info: "var(--ch-tone-info-bg)",
          success: "var(--ch-tone-success-soft-bg)",
          warning: "var(--ch-tone-warning-soft-bg)",
          danger: "var(--ch-tone-danger-soft-bg)"
        }
      },
      spacing: {
        xs: "var(--ch-space-xs)",
        sm: "var(--ch-space-sm)",
        md: "var(--ch-space-md)",
        lg: "var(--ch-space-lg)",
        xl: "var(--ch-space-xl)"
      },
      borderRadius: {
        sm: "var(--ch-radius-sm)",
        md: "var(--ch-radius-md)",
        lg: "var(--ch-radius-lg)",
        pill: "var(--ch-radius-pill)"
      },
      fontFamily: {
        sans:
          'var(--ch-font-sans, "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif)',
        mono:
          'var(--ch-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace)'
      }
    }
  }
};

const chamferPlugin: PluginCreator = () =>
  function ({ addVariant, addUtilities }) {
    addVariant("hcm", ".hcm &");
    addUtilities({
      ".chamfer-focus-outline": {
        outline:
          "var(--ch-focus-outline-width, 2px) solid var(--ch-focus-outer, currentColor)",
        outlineOffset: "var(--ch-focus-outline-offset, 2px)",
        boxShadow:
          "0 0 0 var(--ch-ring-inner-width, 2px) var(--ch-focus-accent, currentColor), 0 0 0 var(--ch-ring-outer-width, 4px) var(--ch-focus-outer, currentColor)"
      }
    });
  };

export const chamferTailwindPlugin = plugin(chamferPlugin, {
  theme: preset.theme
});

export default chamferTailwindPlugin;
export { preset as chamferTailwindPreset };
