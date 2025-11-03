import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(packageRoot, "dist");
const cssDir = path.resolve(distDir, "css");
const require = createRequire(import.meta.url);

async function findTokensCssDir(): Promise<string> {
  try {
    const tokensCssEntry = require.resolve("@chamfer/tokens/css", {
      paths: [packageRoot]
    });
    const tokensCssDir = path.dirname(tokensCssEntry);
    await access(tokensCssDir, constants.R_OK);
    return tokensCssDir;
  } catch (error) {
    throw new Error(
      [
        "@chamfer/core: unable to locate built token CSS.",
        "Run `pnpm --filter @chamfer/tokens build` before building @chamfer/core.",
        `Original error: ${(error as Error).message}`
      ].join(" ")
    );
  }
}

async function ensureDirectories(): Promise<void> {
  await mkdir(cssDir, { recursive: true });
}

function normalizeNewlines(value: string): string {
  return value.replace(/\r\n/g, "\n").trim();
}

async function readCssFragments(sourceDir: string): Promise<string[]> {
  const entries = await readdir(sourceDir, { withFileTypes: true });

  const cssFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".css"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const fragments: string[] = [];
  for (const fileName of cssFiles) {
    const filePath = path.resolve(sourceDir, fileName);
    const raw = await readFile(filePath, "utf8");
    fragments.push(normalizeNewlines(raw));
  }

  return fragments;
}

async function build(): Promise<void> {
  const tokensCssDir = await findTokensCssDir();
  await ensureDirectories();

  const tokensBundle = await readFile(
    path.resolve(tokensCssDir, "index.css"),
    "utf8"
  ).then(normalizeNewlines);

  const baseFragments = await readCssFragments(path.resolve(packageRoot, "src"));
  const baseCss = baseFragments.join("\n\n").trim();

  const baseOutput = [
    "/* Chamfer core baseline styles – generated. */",
    baseCss
  ]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n");

  const bundleOutput = [
    "/* Chamfer core bundle – generated. */",
    tokensBundle,
    baseCss
  ]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n");

  await Promise.all([
    writeFile(path.resolve(cssDir, "base.css"), baseOutput, "utf8"),
    writeFile(path.resolve(cssDir, "index.css"), bundleOutput, "utf8")
  ]);
}

await build();
