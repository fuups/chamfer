import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { visit } from "unist-util-visit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_BASE = "/chamfer";

const prefixInternalLinks = ({ basePath = "" } = {}) => {
  const normalized = basePath === "/" ? "" : basePath;
  return (tree) => {
    visit(tree, ["link", "definition"], (node) => {
      if (typeof node.url === "string" && node.url.startsWith("/") && !node.url.startsWith("//")) {
        node.url = `${normalized}${node.url}`;
      }
    });
  };
};

export default defineConfig({
  srcDir: "./src",
  outDir: "./dist",
  site: "https://fuups.github.io/chamfer",
  base: SITE_BASE,
  server: {
    host: true
  },
  integrations: [
    mdx({
      remarkPlugins: [[prefixInternalLinks, { basePath: SITE_BASE }]]
    })
  ],
  markdown: {
    remarkPlugins: [[prefixInternalLinks, { basePath: SITE_BASE }]]
  },
  vite: {
    build: {
      assetsInlineLimit: 0
    },
    css: {
      postcss: path.resolve(__dirname, "postcss.config.cjs")
    },
    ssr: {
      noExternal: ["@chamfer/behavior"]
    },
    optimizeDeps: {
      include: ["@chamfer/behavior"]
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@content": path.resolve(__dirname, "src/content"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@chamfer/behavior": path.resolve(__dirname, "../../packages/behavior/src/index.ts")
      }
    }
  }
});
