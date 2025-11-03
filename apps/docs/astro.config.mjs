import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  srcDir: "./src",
  outDir: "./dist",
  server: {
    host: true
  },
  integrations: [mdx()],
  vite: {
    css: {
      postcss: path.resolve(__dirname, "postcss.config.cjs")
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@content": path.resolve(__dirname, "src/content"),
        "@styles": path.resolve(__dirname, "src/styles")
      }
    }
  }
});
