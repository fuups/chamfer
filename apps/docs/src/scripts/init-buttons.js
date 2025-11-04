/**
 * Chamfer docs ripple initializer.
 * Mirrors the behavior of `@chamfer/behavior`'s `enhanceButton` helper so the
 * documentation site can showcase ripple interactions without depending on the
 * published package at runtime. Keep this file in sync when the core helper
 * changes.
 */

function prefersReducedMotion() {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

function createWave(container, position) {
  const ripple = document.createElement("span");
  ripple.className = "ch-ripple";

  const rect = container.getBoundingClientRect();
  const offsetX = Math.max(position.x, rect.width - position.x);
  const offsetY = Math.max(position.y, rect.height - position.y);
  const radius = Math.sqrt(offsetX ** 2 + offsetY ** 2);
  const size = radius * 2;

  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${position.x - radius}px`;
  ripple.style.top = `${position.y - radius}px`;

  return ripple;
}

function isBooleanAttrTrue(value) {
  return value === "" || value === "true";
}

function isElementDisabled(element) {
  if ("disabled" in element && typeof element.disabled === "boolean") {
    return element.disabled;
  }

  const ariaDisabled = element.getAttribute("aria-disabled");
  return ariaDisabled === "true";
}

function isElementLoading(element) {
  const chamferLoading = element.getAttribute("data-ch-loading");
  if (isBooleanAttrTrue(chamferLoading)) {
    return true;
  }

  const genericLoading = element.getAttribute("data-loading");
  if (isBooleanAttrTrue(genericLoading)) {
    return true;
  }

  const ariaBusy = element.getAttribute("aria-busy");
  return ariaBusy === "true";
}

function enhanceRipple(element) {
  const activeRipples = new Set();
  const reducedMotion = prefersReducedMotion();

  const cleanup = (ripple) => {
    if (!activeRipples.has(ripple)) {
      return;
    }
    activeRipples.delete(ripple);
    ripple.remove();
  };

  const spawnRipple = (event) => {
    if (reducedMotion || isElementDisabled(element) || isElementLoading(element)) {
      return;
    }

    const rect = element.getBoundingClientRect();
    let x = rect.width / 2;
    let y = rect.height / 2;

    if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
      if (event.button !== 0) {
        return;
      }
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    const ripple = createWave(element, { x, y });

    activeRipples.add(ripple);
    element.appendChild(ripple);

    ripple.addEventListener("animationend", () => cleanup(ripple), { once: true });
  };

  const pointerHandler = (event) => spawnRipple(event);
  const keyHandler = (event) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      spawnRipple(event);
    }
  };

  element.addEventListener("pointerdown", pointerHandler);
  element.addEventListener("keydown", keyHandler);

  return {
    destroy: () => {
      element.removeEventListener("pointerdown", pointerHandler);
      element.removeEventListener("keydown", keyHandler);
      activeRipples.forEach((ripple) => ripple.remove());
      activeRipples.clear();
    }
  };
}

function enhanceButton(element, options = {}) {
  if (!element.dataset.chComponent) {
    element.dataset.chComponent = "button";
  }

  if (element instanceof HTMLButtonElement && !element.getAttribute("type")) {
    element.setAttribute("type", "button");
  }

  let rippleOption = options.ripple;
  if (typeof rippleOption === "undefined") {
    const attr = element.getAttribute("data-ch-ripple");
    rippleOption = attr === "false" ? false : true;
  }

  let ripple = null;

  if (rippleOption !== false) {
    ripple = enhanceRipple(element);
  }

  return {
    destroy: () => {
      ripple?.destroy();
    }
  };
}

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
