export interface Enhancement {
  destroy: () => void;
}

export interface ButtonEnhancementOptions {
  ripple?: boolean;
}

export const enhanceButton = (
  element: HTMLButtonElement,
  _options: ButtonEnhancementOptions = {}
): Enhancement => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "@chamfer/behavior: button enhancement is not implemented yet.",
      element
    );
  }

  return {
    destroy: () => {
      /* no-op placeholder */
    }
  };
};
