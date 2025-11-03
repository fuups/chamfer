import "./index.css";

const root = document.documentElement;
const themeSelect = document.getElementById("theme-select") as HTMLSelectElement | null;
const statusEl = document.getElementById("status");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const resolveTheme = (value: string): "light" | "dark" =>
  value === "system" ? (prefersDark.matches ? "dark" : "light") : (value as "light" | "dark");

const applyTheme = (value: string) => {
  const resolved = resolveTheme(value);
  root.setAttribute("data-theme", value);
  root.classList.toggle("dark", resolved === "dark");
  root.style.setProperty("color-scheme", resolved);
  if (statusEl) statusEl.textContent = `Theme: ${resolved}`;
};

if (themeSelect) {
  themeSelect.addEventListener("change", event => {
    const value = (event.target as HTMLSelectElement).value;
    applyTheme(value);
  });
}

prefersDark.addEventListener("change", () => {
  if (themeSelect && themeSelect.value === "system") {
    applyTheme("system");
  }
});

applyTheme(themeSelect ? themeSelect.value : "system");
