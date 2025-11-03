import "@chamfer/core/css";
import { enhanceButton } from "@chamfer/behavior";

const ROOT = document.documentElement;
const themeSelect = document.getElementById("theme-select");
const statusEl = document.getElementById("status");
const hcmToggle = document.getElementById("hcm-toggle");
const prefersDark =
  typeof window !== "undefined" && "matchMedia" in window
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

const enhancements = new Set();

function resolveTheme(value) {
  if (value === "system" && prefersDark) {
    return prefersDark.matches ? "dark" : "light";
  }

  return value;
}

function applyTheme(value) {
  const resolved = resolveTheme(value);
  ROOT.setAttribute("data-theme", value);
  ROOT.classList.toggle("dark", resolved === "dark");
  ROOT.style.setProperty("color-scheme", resolved);

  updateStatus(resolved);

  return resolved;
}

function updateStatus(theme) {
  if (!statusEl) {
    return;
  }

  const hcmActive = ROOT.classList.contains("hcm");
  statusEl.textContent = `Theme: ${theme}${hcmActive ? " · high contrast" : ""}`;
}

function setHighContrast(state) {
  ROOT.classList.toggle("hcm", state);

  if (hcmToggle instanceof HTMLButtonElement) {
    hcmToggle.setAttribute("aria-pressed", String(state));
    hcmToggle.textContent = state ? "High contrast on" : "High contrast off";
  }

  const currentTheme = resolveTheme(
    themeSelect instanceof HTMLSelectElement ? themeSelect.value : "system"
  );
  updateStatus(currentTheme);
}

function initThemeControls() {
  if (!(themeSelect instanceof HTMLSelectElement)) {
    return;
  }

  themeSelect.addEventListener("change", event => {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      applyTheme(target.value);
    }
  });

  if (prefersDark) {
    const listener = () => {
      if (themeSelect.value === "system") {
        applyTheme("system");
      }
    };

    if (typeof prefersDark.addEventListener === "function") {
      prefersDark.addEventListener("change", listener);
    } else if (typeof prefersDark.addListener === "function") {
      prefersDark.addListener(listener);
    }
  }

  applyTheme(themeSelect.value || "system");
}

function initHighContrastToggle() {
  if (!(hcmToggle instanceof HTMLButtonElement)) {
    return;
  }

  hcmToggle.addEventListener("click", () => {
    const nextState = !ROOT.classList.contains("hcm");
    setHighContrast(nextState);
  });

  // Ensure aria state is synced on initial load
  setHighContrast(ROOT.classList.contains("hcm"));
}

function initButtonEnhancements() {
  document.querySelectorAll('[data-ch-component="button"]').forEach(element => {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    const enhancement = enhanceButton(element);
    enhancements.add(enhancement);
  });

  window.addEventListener("beforeunload", () => {
    enhancements.forEach(enhancement => enhancement.destroy());
    enhancements.clear();
  });
}

initThemeControls();
initHighContrastToggle();
initButtonEnhancements();
