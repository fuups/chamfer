import { primitives } from "./data/primitives.js";
import { semantic } from "./data/semantic.js";
import type { ChamferTokenRegistry } from "./types.js";

/**
 * Version identifier for the token bundle. Mirrors the package version and
 * allows downstream tooling to confirm compatibility.
 */
export const VERSION = "1.0.1";

export const chamferTokens: ChamferTokenRegistry = {
  version: VERSION,
  primitives,
  semantic
};

export { primitives, semantic };
export type * from "./types.js";
