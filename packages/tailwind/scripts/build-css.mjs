import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

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
} from "../dist/scales.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");

mkdirSync(distDir, { recursive: true });

const STATIC_FILES = ["theme.css", "index.css"];

for (const file of STATIC_FILES) {
  const sourcePath = join(rootDir, "src", file);
  const targetPath = join(distDir, file);
  const css = readFileSync(sourcePath, "utf8");
  writeFileSync(targetPath, css, "utf8");
}

const utilities = [];
utilities.push("@layer utilities {");

for (const [name, value] of Object.entries(chamferColors)) {
  utilities.push(`  .bg-${name} {`);
  utilities.push(`    background-color: ${value};`);
  utilities.push("  }");
  utilities.push(`  .text-${name} {`);
  utilities.push(`    color: ${value};`);
  utilities.push("  }");
  utilities.push(`  .border-${name} {`);
  utilities.push(`    border-color: ${value};`);
  utilities.push("  }");
  utilities.push(`  .ring-${name} {`);
  utilities.push(`    --tw-ring-color: ${value};`);
  utilities.push("  }");
}

const spacingTargets = [
  ["p", ["padding"]],
  ["px", ["padding-left", "padding-right"]],
  ["py", ["padding-top", "padding-bottom"]],
  ["pt", ["padding-top"]],
  ["pr", ["padding-right"]],
  ["pb", ["padding-bottom"]],
  ["pl", ["padding-left"]],
  ["m", ["margin"]],
  ["mx", ["margin-left", "margin-right"]],
  ["my", ["margin-top", "margin-bottom"]],
  ["mt", ["margin-top"]],
  ["mr", ["margin-right"]],
  ["mb", ["margin-bottom"]],
  ["ml", ["margin-left"]],
  ["gap", ["gap"]]
];

for (const [token, value] of Object.entries(spacingScale)) {
  for (const [prefix, properties] of spacingTargets) {
    utilities.push(`  .${prefix}-${token} {`);
    for (const property of properties) {
      utilities.push(`    ${property}: ${value};`);
    }
    utilities.push("  }");
  }
}

for (const [token, value] of Object.entries(radiusScale)) {
  utilities.push(`  .rounded-${token} {`);
  utilities.push(`    border-radius: ${value};`);
  utilities.push("  }");
}

for (const [token, value] of Object.entries(minHeightScale)) {
  utilities.push(`  .min-h-${token} {`);
  utilities.push(`    min-height: ${value};`);
  utilities.push("  }");
}

for (const [token, value] of Object.entries(borderWidthScale)) {
  utilities.push(`  .border-${token} {`);
  utilities.push(`    border-width: ${value};`);
  utilities.push("  }");
}

for (const [token, value] of Object.entries(boxShadowScale)) {
  utilities.push(`  .shadow-${token} {`);
  utilities.push(`    box-shadow: ${value};`);
  utilities.push("  }");
}

for (const [token, value] of Object.entries(fontSizeScale)) {
  utilities.push(`  .text-${token} {`);
  utilities.push(`    font-size: ${value};`);
  utilities.push("  }");
}

for (const [token, value] of Object.entries(lineHeightScale)) {
  utilities.push(`  .leading-${token} {`);
  utilities.push(`    line-height: ${value};`);
  utilities.push("  }");
}

for (const [token, value] of Object.entries(fontWeightScale)) {
  utilities.push(`  .font-${token} {`);
  utilities.push(`    font-weight: ${value};`);
  utilities.push("  }");
}

for (const [token, families] of Object.entries(fontFamilyScale)) {
  utilities.push(`  .font-${token} {`);
  utilities.push(`    font-family: ${families.join(", ")};`);
  utilities.push("  }");
}

utilities.push("  .focus-ring-ch {");
utilities.push("    outline: none;");
utilities.push(
  "    box-shadow: 0 0 0 var(--ch-ring-inner-width, 2px) var(--ch-focus-accent, currentColor), 0 0 0 calc(var(--ch-ring-inner-width, 2px) + var(--ch-ring-outer-width, 4px)) var(--ch-focus-outer, currentColor);"
);
utilities.push("  }");
utilities.push("  .focus-outline-ch {");
utilities.push(
  "    outline: var(--ch-focus-outline-width, 2px) solid var(--ch-focus-outer, currentColor);"
);
utilities.push("    outline-offset: var(--ch-focus-outline-offset, 2px);");
utilities.push("  }");

utilities.push("}");

const utilitiesPath = join(distDir, "utilities.css");
writeFileSync(utilitiesPath, `${utilities.join("\n")}\n`, "utf8");

const manifest = [
  relative(rootDir, join(distDir, "index.css")),
  relative(rootDir, join(distDir, "theme.css")),
  relative(rootDir, utilitiesPath)
];

console.log("[chamfer-tailwind] emitted CSS assets:", manifest.join(", "));
