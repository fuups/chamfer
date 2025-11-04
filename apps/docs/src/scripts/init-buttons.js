import { enhanceButton } from "@chamfer/behavior";

/**
 * Chamfer docs ripple initializer. Bundled as a standalone module so CI/CD hosts
 * (GitHub Pages) serve it with the correct MIME type. See `astro.config.mjs`
 * for the custom `assetsInlineLimit` setup that keeps this from being inlined.
 */

const registry = new Map();

function enhanceAll(root = document) {
  const buttons = root.querySelectorAll(
    '[data-ch-component="button"]:not([data-ch-ripple="false"])'
  );

  buttons.forEach((button) => {
    if (registry.has(button)) {
      return;
    }

    const enhancement = enhanceButton(button);
    registry.set(button, enhancement.destroy);
  });
}

function cleanupMissing() {
  for (const [button, destroy] of registry.entries()) {
    if (!document.contains(button)) {
      destroy();
      registry.delete(button);
    }
  }
}

function destroyAll() {
  for (const destroy of registry.values()) {
    destroy();
  }
  registry.clear();
}

if (typeof document !== "undefined") {
  const init = () => {
    enhanceAll();
    cleanupMissing();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  document.addEventListener("astro:after-swap", () => {
    cleanupMissing();
    enhanceAll();
  });

  document.addEventListener(
    "astro:before-swap",
    () => {
      destroyAll();
    },
    { passive: true }
  );
}

export {};
