export interface Enhancement {
  destroy: () => void;
}

export interface RippleOptions {
  surface?: "base" | "raised";
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
  const radius = Math.max(rect.width, rect.height) * 1.2;

  ripple.style.width = `${radius}px`;
  ripple.style.height = `${radius}px`;
  ripple.style.left = `${position.x - radius / 2}px`;
  ripple.style.top = `${position.y - radius / 2}px`;

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
  element: HTMLElement,
  options: RippleOptions = {}
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

    if (options.surface === "raised") {
      ripple.dataset.surface = "raised";
    }

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
  ripple?: boolean | RippleOptions;
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
    if (attr === "false") {
      rippleOption = false;
    } else if (attr === "raised") {
      rippleOption = { surface: "raised" };
    } else {
      rippleOption = true;
    }
  }

  const shouldAttachRipple = rippleOption !== false;
  let ripple: Enhancement | null = null;

  if (shouldAttachRipple) {
    const rippleOptions =
      rippleOption && typeof rippleOption === "object" ? rippleOption : {};
    ripple = enhanceRipple(element, rippleOptions);
  }

  return {
    destroy: () => {
      ripple?.destroy();
    }
  };
};
