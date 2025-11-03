export interface ColorToken {
  /**
   * Token name without the `--` prefix (e.g. `color-primary`).
   */
  name: string;
  /**
   * Optional descriptive comment emitted ahead of the token.
   */
  comment?: string;
  /**
   * Individual format representations that participate in the fallback chain.
   */
  oklch?: string;
  hsla?: string;
  hsl?: string;
  hex?: string;
  /**
   * Optional resolved value. When omitted, a fallback chain is generated
   * automatically from the available formats.
   */
  value?: string;
}

export interface SimpleToken {
  /**
   * Token name without the `--` prefix (e.g. `space-sm`).
   */
  name: string;
  /**
   * Serialized CSS value written as-is.
   */
  value: string;
  /**
   * Optional descriptive comment emitted ahead of the token.
   */
  comment?: string;
  /**
   * Optional list of progressive enhancement overrides keyed by @supports
   * conditions.
   */
  supports?: TokenSupport[];
}

interface TokenBlockBase<T> {
  /**
   * CSS selector that scopes the token declarations.
   */
  selector: string;
  /**
   * Optional at-rule wrapper (e.g., `@media (...)`).
   */
  atRule?: string;
  /**
   * Human-readable label or description for documentation purposes.
   */
  label?: string;
  /**
   * Tokens contained in this block.
   */
  tokens: T[];
}

export interface ColorTokenBlock extends TokenBlockBase<ColorToken> {
  type: "color";
}

export interface SimpleTokenBlock extends TokenBlockBase<SimpleToken> {
  type: "scalar";
}

export interface PrimitiveTokens {
  colors: ColorTokenBlock[];
  scales: SimpleTokenBlock[];
}

export interface SemanticTokens {
  blocks: SimpleTokenBlock[];
}

export interface ChamferTokenRegistry {
  version: string;
  primitives: PrimitiveTokens;
  semantic: SemanticTokens;
}

export type TokenBlock = ColorTokenBlock | SimpleTokenBlock;

export interface TokenSupport {
  condition: string;
  value: string;
}
