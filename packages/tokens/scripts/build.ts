import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chamferTokens, semantic } from "../src/index.js";
import type {
  ChamferTokenRegistry,
  ColorToken,
  ColorTokenBlock,
  PrimitiveTokens,
  SimpleToken,
  SimpleTokenBlock,
  TokenSupport
} from "../src/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(packageRoot, "dist");
const cssDir = path.resolve(distDir, "css");
const jsonDir = path.resolve(distDir, "json");

const HEADER_PRIMITIVES =
  "/* Chamfer UI primitive tokens – generated. Do not edit by hand. */";
const HEADER_SEMANTIC =
  "/* Chamfer UI semantic tokens – generated. Do not edit by hand. */";

async function ensureDirectories(): Promise<void> {
  await rm(distDir, { recursive: true, force: true });
  await Promise.all([
    mkdir(distDir, { recursive: true }),
    mkdir(cssDir, { recursive: true }),
    mkdir(jsonDir, { recursive: true })
  ]);
}

function indentLines(lines: string[], indent = "  "): string[] {
  return lines.map(line =>
    line.length ? `${indent}${line}` : indent ? indent.trimEnd() : ""
  );
}

function splitMultilineValue(value: string): string[] {
  if (!value.includes("\n")) {
    return [value];
  }

  const rawLines = value.split("\n");

  return rawLines.map((line, index) => {
    if (index === 0) {
      return line.trimEnd();
    }

    const trimmed = line.trimEnd();
    return trimmed.startsWith("    ") ? trimmed : `    ${trimmed}`;
  });
}

function formatColorTokenBase(token: ColorToken): string[] {
  const lines: string[] = [];

  if (token.comment) {
    lines.push(`/* ${token.comment} */`);
  }

  if (token.oklch) {
    lines.push(`--${token.name}-oklch: ${token.oklch};`);
  }

  if (token.hsla) {
    lines.push(`--${token.name}-hsla: ${token.hsla};`);
  }

  if (token.hsl) {
    lines.push(`--${token.name}-hsl: ${token.hsl};`);
  }

  if (token.hex) {
    lines.push(`--${token.name}-hex: ${token.hex};`);
  }

  if (token.value) {
    const valueLines = splitMultilineValue(token.value);
    if (valueLines.length === 1) {
      lines.push(`--${token.name}: ${valueLines[0]};`);
    } else if (valueLines.length > 1) {
      const [first, ...rest] = valueLines;
      const declaration: string[] = [`--${token.name}: ${first}`];
      declaration.push(...rest);
      declaration[declaration.length - 1] = `${declaration[declaration.length - 1]};`;
      lines.push(...declaration);
    }
  }

  return lines;
}

function formatSimpleToken(token: SimpleToken): string[] {
  const lines: string[] = [];

  if (token.comment) {
    lines.push(`/* ${token.comment} */`);
  }

  const valueLines = splitMultilineValue(token.value);

  if (valueLines.length === 1) {
    lines.push(`--${token.name}: ${valueLines[0]};`);
  } else if (valueLines.length > 1) {
    const [first, ...rest] = valueLines;
    const declaration: string[] = [`--${token.name}: ${first}`];
    declaration.push(...rest);
    declaration[declaration.length - 1] = `${declaration[declaration.length - 1]};`;
    lines.push(...declaration);
  }

  return lines;
}

function wrapSelector(selector: string, lines: string[]): string {
  const selectorLines = indentLines(lines);
  return [`${selector} {`, ...selectorLines, "}"].join("\n");
}

function wrapAtRule(content: string, atRule?: string): string {
  if (!atRule) {
    return content;
  }

  return `${atRule} {\n${indentLines(content.split("\n")).join("\n")}\n}`;
}

function renderColorBlock(block: ColorTokenBlock): string {
  const baseLines = block.tokens.flatMap(token => formatColorTokenBase(token));

  if (baseLines.length === 0) {
    return "";
  }

  const blockLabel = block.label ? `/* ${block.label} */\n` : "";
  const supportsHsl: string[] = [];
  const supportsOklch: string[] = [];

  for (const token of block.tokens) {
    const hslSupportSource = token.hsl ? "hsl" : token.hsla ? "hsla" : undefined;

    if (hslSupportSource) {
      supportsHsl.push(`--${token.name}: var(--${token.name}-${hslSupportSource});`);
    }

    if (token.oklch) {
      supportsOklch.push(`--${token.name}: var(--${token.name}-oklch);`);
    }
  }

  const baseContent = wrapAtRule(wrapSelector(block.selector, baseLines), block.atRule);

  const supportsBlocks: string[] = [];

  if (supportsHsl.length > 0) {
    const body = wrapSelector(block.selector, supportsHsl);
    supportsBlocks.push(
      `@supports (color: hsl(0 0% 0% / 1)) {\n${indentLines(wrapAtRule(body, block.atRule).split("\n")).join("\n")}\n}`
    );
  }

  if (supportsOklch.length > 0) {
    const body = wrapSelector(block.selector, supportsOklch);
    supportsBlocks.push(
      `@supports (color: oklch(0.5 0 0)) {\n${indentLines(wrapAtRule(body, block.atRule).split("\n")).join("\n")}\n}`
    );
  }

  return [blockLabel + baseContent, ...supportsBlocks].join("\n\n");
}

function renderSimpleBlock(block: SimpleTokenBlock): string {
  const baseLines = block.tokens.flatMap(token => formatSimpleToken(token));

  if (baseLines.length === 0) {
    return "";
  }

  const blockLabel = block.label ? `/* ${block.label} */\n` : "";
  const baseContent = wrapAtRule(wrapSelector(block.selector, baseLines), block.atRule);

  const supportsByCondition = new Map<string, TokenSupport[]>();

  for (const token of block.tokens) {
    if (!token.supports) {
      continue;
    }

    for (const entry of token.supports) {
      const existing = supportsByCondition.get(entry.condition) ?? [];
      existing.push({
        condition: entry.condition,
        value: `--${token.name}: ${entry.value};`
      });
      supportsByCondition.set(entry.condition, existing);
    }
  }

  const supportsBlocks: string[] = [];

  for (const [condition, entries] of supportsByCondition) {
    if (entries.length === 0) {
      continue;
    }

    const lines = entries.map(entry => entry.value);
    const content = wrapAtRule(wrapSelector(block.selector, lines), block.atRule);
    supportsBlocks.push(
      `${condition} {\n${indentLines(content.split("\n")).join("\n")}\n}`
    );
  }

  return [blockLabel + baseContent, ...supportsBlocks].join("\n\n");
}

function renderColorBlocks(blocks: ColorTokenBlock[]): string {
  return blocks
    .map(block => renderColorBlock(block))
    .filter(Boolean)
    .join("\n\n");
}

function renderSimpleBlocks(blocks: SimpleTokenBlock[]): string {
  return blocks
    .map(block => renderSimpleBlock(block))
    .filter(Boolean)
    .join("\n\n");
}

function renderPrimitivesCss(tokens: PrimitiveTokens): string {
  const colorCss = renderColorBlocks(tokens.colors);
  const scaleCss = renderSimpleBlocks(tokens.scales);

  return [HEADER_PRIMITIVES, colorCss, scaleCss].filter(Boolean).join("\n\n");
}

function renderSemanticCss(): string {
  const semanticCss = renderSimpleBlocks(semantic.blocks);
  return [HEADER_SEMANTIC, semanticCss].filter(Boolean).join("\n\n");
}

async function writeArtifacts(bundle: ChamferTokenRegistry): Promise<void> {
  await ensureDirectories();

  const primitivesCss = renderPrimitivesCss(bundle.primitives);
  const semanticCss = renderSemanticCss();

  await Promise.all([
    writeFile(path.resolve(cssDir, "primitives.css"), `${primitivesCss}\n`, "utf8"),
    writeFile(path.resolve(cssDir, "semantic.css"), `${semanticCss}\n`, "utf8"),
    writeFile(
      path.resolve(cssDir, "index.css"),
      `${primitivesCss}\n\n${semanticCss}\n`,
      "utf8"
    ),
    writeFile(
      path.resolve(jsonDir, "tokens.json"),
      `${JSON.stringify(bundle, null, 2)}\n`,
      "utf8"
    )
  ]);
}

await writeArtifacts(chamferTokens);
