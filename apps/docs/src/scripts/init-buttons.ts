import { enhanceButton } from "@chamfer/behavior";

const registry = new Map<HTMLElement, () => void>();

function enhanceAll(root: ParentNode = document): void {
  const buttons = root.querySelectorAll<HTMLButtonElement>(
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

function cleanupMissing(): void {
  for (const [button, destroy] of registry.entries()) {
    if (!document.contains(button)) {
      destroy();
      registry.delete(button);
    }
  }
}

function destroyAll(): void {
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
