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

export function enhanceRipple(element: HTMLElement): Enhancement {
  const MAX_RIPPLES = 3;
  const activeRipples = new Map<string, HTMLSpanElement>();
  const reducedMotion = prefersReducedMotion();

  const cleanup = (ripple: HTMLSpanElement) => {
    ripple.remove();
    delete ripple.dataset.enterDone;
    delete ripple.dataset.pendingExit;
    delete ripple.dataset.exiting;
    if (activeRipples.size === 0) {
      element.classList.remove("ch-rippling");
    }
  };

  const startExit = (ripple: HTMLSpanElement) => {
    if (ripple.dataset.exiting === "true") {
      return;
    }
    ripple.dataset.exiting = "true";
    delete ripple.dataset.pendingExit;
    ripple.classList.add("ch-ripple--exit");
  };

  const releaseRipple = (key: string) => {
    const ripple = activeRipples.get(key);
    if (!ripple) {
      return;
    }

    activeRipples.delete(key);

    if (ripple.dataset.enterDone === "true") {
      startExit(ripple);
    } else {
      ripple.dataset.pendingExit = "true";
    }
  };

  const spawnRipple = (event: PointerEvent | KeyboardEvent) => {
    if (reducedMotion || isElementDisabled(element) || isElementLoading(element)) {
      return;
    }

    const key =
      typeof PointerEvent !== "undefined" && event instanceof PointerEvent
        ? `pointer-${event.pointerId}`
        : "keyboard";

    if (activeRipples.has(key)) {
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
    ripple.dataset.rippleKey = key;

    ripple.addEventListener("animationend", () => {
      if (ripple.dataset.exiting === "true") {
        cleanup(ripple);
        return;
      }
      ripple.dataset.enterDone = "true";
      if (ripple.dataset.pendingExit === "true") {
        startExit(ripple);
      }
    });

    activeRipples.set(key, ripple);
    element.classList.add("ch-rippling");
    element.appendChild(ripple);

    if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
      element.setPointerCapture(event.pointerId);
    }

    if (activeRipples.size > MAX_RIPPLES) {
      for (const existingKey of activeRipples.keys()) {
        if (existingKey === key) {
          continue;
        }
        releaseRipple(existingKey);
        break;
      }
    }
  };

  const pointerDownHandler = (event: PointerEvent) => {
    spawnRipple(event);
  };

  const pointerUpHandler = (event: PointerEvent) => {
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
    releaseRipple(`pointer-${event.pointerId}`);
  };

  const pointerCancelHandler = (event: PointerEvent) => {
    releaseRipple(`pointer-${event.pointerId}`);
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      spawnRipple(event);
    }
  };

  const keyUpHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      releaseRipple("keyboard");
    }
  };

  element.addEventListener("pointerdown", pointerDownHandler);
  element.addEventListener("pointerup", pointerUpHandler);
  element.addEventListener("pointercancel", pointerCancelHandler);
  element.addEventListener("keydown", keyDownHandler);
  element.addEventListener("keyup", keyUpHandler);

  return {
    destroy: () => {
      element.removeEventListener("pointerdown", pointerDownHandler);
      element.removeEventListener("pointerup", pointerUpHandler);
      element.removeEventListener("pointercancel", pointerCancelHandler);
      element.removeEventListener("keydown", keyDownHandler);
      element.removeEventListener("keyup", keyUpHandler);
      activeRipples.forEach((ripple) => ripple.remove());
      activeRipples.clear();
      element.classList.remove("ch-rippling");
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
