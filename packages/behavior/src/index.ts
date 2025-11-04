export interface Enhancement {
  destroy: () => void;
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

function createWave(
  container: HTMLElement,
  position: { x: number; y: number }
): HTMLSpanElement {
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

function isBooleanAttrTrue(value: string | null): boolean {
  return value === "" || value === "true";
}

function isElementDisabled(element: HTMLElement): boolean {
  if ("disabled" in element && typeof (element as HTMLButtonElement).disabled === "boolean") {
    return (element as HTMLButtonElement).disabled;
  }

  const ariaDisabled = element.getAttribute("aria-disabled");
  return ariaDisabled === "true";
}

function isElementLoading(element: HTMLElement): boolean {
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

export function enhanceRipple(
  element: HTMLElement
): Enhancement {
  const activeRipples = new Set<HTMLSpanElement>();
  const reducedMotion = prefersReducedMotion();

  const cleanup = (ripple: HTMLSpanElement) => {
    if (!activeRipples.has(ripple)) {
      return;
    }
    activeRipples.delete(ripple);
    ripple.remove();
  };

  const spawnRipple = (event: PointerEvent | KeyboardEvent) => {
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

    ripple.addEventListener("animationend", () => cleanup(ripple), {
      once: true
    });
  };

  const pointerHandler = (event: PointerEvent) => spawnRipple(event);
  const keyHandler = (event: KeyboardEvent) => {
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
      activeRipples.forEach(ripple => ripple.remove());
      activeRipples.clear();
    }
  };
}

export interface ButtonEnhancementOptions {
  ripple?: boolean;
}

export const enhanceButton = (
  element: HTMLElement,
  options: ButtonEnhancementOptions = {}
): Enhancement => {
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

  let ripple: Enhancement | null = null;

  if (rippleOption !== false) {
    ripple = enhanceRipple(element);
  }

  return {
    destroy: () => {
      ripple?.destroy();
    }
  };
};
