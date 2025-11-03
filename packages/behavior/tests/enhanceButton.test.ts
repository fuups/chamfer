import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { enhanceButton } from "../src/index.js";

describe("enhanceButton", () => {
  let button: HTMLButtonElement;

beforeEach(() => {
  if (!window.matchMedia) {
    window.matchMedia = query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    });
  }

    button = document.createElement("button");
    document.body.appendChild(button);

    const rect = {
      width: 120,
      height: 40,
      top: 0,
      left: 0,
      bottom: 40,
      right: 120,
      x: 0,
      y: 0,
      toJSON: () => ({})
    };

    Object.defineProperty(button, "getBoundingClientRect", {
      configurable: true,
      value: () => rect
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("applies default dataset and type", () => {
    const enhancement = enhanceButton(button);
    expect(button.dataset.chComponent).toBe("button");
    expect(button.getAttribute("type")).toBe("button");
    enhancement.destroy();
  });

  it("creates a ripple for keyboard activation", () => {
    const enhancement = enhanceButton(button);

    button.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(button.querySelector(".ch-ripple")).toBeTruthy();
    enhancement.destroy();
  });

  it("supports non-button elements", () => {
    const anchor = document.createElement("a");
    anchor.href = "#";
    document.body.appendChild(anchor);

    Object.defineProperty(anchor, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        width: 120,
        height: 40,
        top: 0,
        left: 0,
        bottom: 40,
        right: 120,
        x: 0,
        y: 0,
        toJSON: () => ({})
      })
    });

    const enhancement = enhanceButton(anchor);

    expect(anchor.dataset.chComponent).toBe("button");
    expect(anchor.getAttribute("type")).toBeNull();

    anchor.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(anchor.querySelector(".ch-ripple")).toBeTruthy();

    enhancement.destroy();
  });

  it("suppresses ripple when button is loading", () => {
    const enhancement = enhanceButton(button);
    button.setAttribute("data-ch-loading", "true");

    button.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(button.querySelector(".ch-ripple")).toBeFalsy();
    enhancement.destroy();
  });
});
