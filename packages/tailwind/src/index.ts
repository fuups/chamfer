import plugin from "tailwindcss/plugin";

import {
  borderWidthScale,
  boxShadowScale,
  chamferColors,
  fontFamilyScale,
  fontSizeScale,
  fontWeightScale,
  lineHeightScale,
  minHeightScale,
  radiusScale,
  spacingScale
} from "./scales.js";

const preset = {
  theme: {
    extend: {
      colors: chamferColors,
      backgroundColor: chamferColors,
      textColor: chamferColors,
      borderColor: chamferColors,
      ringColor: chamferColors,
      spacing: spacingScale,
      borderRadius: radiusScale,
      fontFamily: fontFamilyScale,
      fontSize: fontSizeScale,
      lineHeight: lineHeightScale,
      fontWeight: fontWeightScale,
      minHeight: minHeightScale,
      borderWidth: borderWidthScale,
      boxShadow: boxShadowScale
    }
  }
} as const;

export const chamferTailwindPlugin = plugin(
  function ({ addVariant, addUtilities }) {
    addVariant("hcm", ".hcm &");
    addVariant("ch-dark", [".dark &", '[data-theme="dark"] &']);

    const colorUtilities: Record<string, Record<string, string>> = {};

    for (const [name, value] of Object.entries(chamferColors) as [string, string][]) {
      colorUtilities[`.bg-${name}`] = {
        backgroundColor: value
      };
      colorUtilities[`.text-${name}`] = {
        color: value
      };
      colorUtilities[`.border-${name}`] = {
        borderColor: value
      };
      colorUtilities[`.ring-${name}`] = {
        "--tw-ring-color": value
      };
    }

    addUtilities(
      {
        ...colorUtilities,
        ".focus-ring-ch": {
          outline: "none",
          boxShadow:
            "0 0 0 var(--ch-ring-inner-width, 2px) var(--ch-focus-accent, currentColor), 0 0 0 calc(var(--ch-ring-inner-width, 2px) + var(--ch-ring-outer-width, 4px)) var(--ch-focus-outer, currentColor)"
        },
        ".focus-outline-ch": {
          outline:
            "var(--ch-focus-outline-width, 2px) solid var(--ch-focus-outer, currentColor)",
          outlineOffset: "var(--ch-focus-outline-offset, 2px)"
        }
      },
      [
        "responsive",
        "hover",
        "focus",
        "focus-visible",
        "active",
        "disabled",
        "group-hover",
        "group-focus",
        "dark",
      "ch-dark"
    ]
    );
  },
  {
    theme: preset.theme
  }
);

export default chamferTailwindPlugin;
export { preset as chamferTailwindPreset };
