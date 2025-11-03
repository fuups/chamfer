export const VERSION = "1.1.0";

/**
 * Convenience export for consumers who want to reference the compiled CSS
 * bundle path without hard-coding the string literal.
 */
export const CORE_CSS_BUNDLE = "@chamfer/core/css";

/**
 * Exposes the baseline-only CSS path. Framework adapters can include this when
 * they need to avoid double-importing the design tokens.
 */
export const CORE_BASELINE_CSS = "@chamfer/core/css/base";

export const loadChamferCore = (): void => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "@chamfer/core: import `@chamfer/core/css` (or `/css/base`) to apply styles. This helper is deprecated."
    );
  }
};
