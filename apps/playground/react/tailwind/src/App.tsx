import type { JSX } from "react";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

const swatchBaseClasses =
  "flex h-[100px] cursor-default items-end rounded-ch-sm p-ch-md font-mono text-ch-xs font-medium transition-transform duration-150 ease-out hover:-translate-y-0.5";

const colorSwatches = [
  {
    label: "--ch-color-default",
    classes: `${swatchBaseClasses} border border-ch-border-default bg-[var(--ch-color-default)] text-[var(--ch-on-inverse-fg)]`
  },
  {
    label: "--ch-color-secondary",
    classes: `${swatchBaseClasses} border border-ch-border-default bg-[var(--ch-color-secondary)] text-[var(--ch-on-inverse-fg)]`
  },
  {
    label: "--ch-color-background",
    classes: `${swatchBaseClasses} border border-ch-border-default bg-[var(--ch-color-background)] text-[var(--ch-color-default)]`
  },
  {
    label: "--ch-color-surface",
    classes: `${swatchBaseClasses} border border-ch-border-default bg-[var(--ch-color-surface)] text-[var(--ch-color-default)]`
  },
  {
    label: "--ch-border-default",
    classes: `${swatchBaseClasses} bg-ch-border-default text-[var(--ch-color-default)]`
  }
];

const solidSwatches = [
  { label: "primary", classes: `${swatchBaseClasses} bg-ch-action-primary text-ch-action-primary-foreground` },
  {
    label: "secondary",
    classes: `${swatchBaseClasses} bg-ch-action-secondary text-ch-action-secondary-foreground`
  },
  { label: "success", classes: `${swatchBaseClasses} bg-ch-action-success text-ch-action-success-foreground` },
  { label: "warning", classes: `${swatchBaseClasses} bg-ch-action-warning text-ch-action-warning-foreground` },
  { label: "danger", classes: `${swatchBaseClasses} bg-ch-action-danger text-ch-action-danger-foreground` }
];

const softSwatches = [
  {
    label: "primary",
    classes: `${swatchBaseClasses} border border-ch-action-primary-soft-border bg-ch-action-primary-soft text-ch-action-primary-soft-foreground`
  },
  {
    label: "secondary",
    classes: `${swatchBaseClasses} border border-ch-action-secondary-soft-border bg-ch-action-secondary-soft text-ch-action-secondary-soft-foreground`
  },
  {
    label: "success",
    classes: `${swatchBaseClasses} border border-ch-action-success-soft-border bg-ch-action-success-soft text-ch-action-success-soft-foreground`
  },
  {
    label: "warning",
    classes: `${swatchBaseClasses} border border-ch-action-warning-soft-border bg-ch-action-warning-soft text-ch-action-warning-soft-foreground`
  },
  {
    label: "danger",
    classes: `${swatchBaseClasses} border border-ch-action-danger-soft-border bg-ch-action-danger-soft text-ch-action-danger-soft-foreground`
  }
];

const outlineSwatches = [
  {
    label: "primary",
    classes: `${swatchBaseClasses} border border-ch-action-outline-primary-border bg-transparent text-ch-action-outline-primary-foreground`
  },
  {
    label: "secondary",
    classes: `${swatchBaseClasses} border border-ch-action-outline-secondary-border bg-transparent text-ch-action-outline-secondary-foreground`
  },
  {
    label: "success",
    classes: `${swatchBaseClasses} border border-ch-action-outline-success-border bg-transparent text-ch-action-outline-success-foreground`
  },
  {
    label: "warning",
    classes: `${swatchBaseClasses} border border-ch-action-outline-warning-border bg-transparent text-ch-action-outline-warning-foreground`
  },
  {
    label: "danger",
    classes: `${swatchBaseClasses} border border-ch-action-outline-danger-border bg-transparent text-ch-action-outline-danger-foreground`
  }
];

const toneSwatches = [
  {
    label: "info",
    classes: `${swatchBaseClasses} border border-ch-tone-info-border bg-ch-tone-info text-ch-tone-info-foreground`
  },
  {
    label: "success",
    classes: `${swatchBaseClasses} border border-ch-tone-success-border bg-ch-tone-success text-ch-tone-success-foreground`
  },
  {
    label: "warning",
    classes: `${swatchBaseClasses} border border-ch-tone-warning-border bg-ch-tone-warning text-ch-tone-warning-foreground`
  },
  {
    label: "danger",
    classes: `${swatchBaseClasses} border border-ch-tone-danger-border bg-ch-tone-danger text-ch-tone-danger-foreground`
  }
];

const textSamples = [
  { label: "Primary — The quick brown fox jumps over the lazy dog", classes: "text-ch-md text-ch-text-primary" },
  {
    label: "Secondary — The quick brown fox jumps over the lazy dog",
    classes: "text-ch-md text-ch-text-secondary"
  },
  { label: "Tertiary — The quick brown fox jumps over the lazy dog", classes: "text-ch-md text-ch-text-tertiary" },
  { label: "Disabled — The quick brown fox jumps over the lazy dog", classes: "text-ch-md text-ch-text-disabled" }
];

const buttonExamples = [
  {
    label: "Primary",
    classes:
      "min-h-ch-pressable-md rounded-ch-sm bg-ch-action-primary px-ch-lg font-ch-medium text-ch-action-primary-foreground transition"
  },
  {
    label: "Secondary",
    classes:
      "min-h-ch-pressable-md rounded-ch-sm bg-ch-action-secondary px-ch-lg font-ch-medium text-ch-action-secondary-foreground transition"
  },
  {
    label: "Outline",
    classes:
      "min-h-ch-pressable-md rounded-ch-sm border border-ch-action-outline-primary-border bg-transparent px-ch-lg font-ch-medium text-ch-action-outline-primary-foreground transition"
  }
];

export default function App(): JSX.Element {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [statusMessage, setStatusMessage] = useState("Theme: system");

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const resolveTheme = (value: ThemeMode): "light" | "dark" =>
      value === "system" ? (prefersDark.matches ? "dark" : "light") : value;

    const applyTheme = (value: ThemeMode) => {
      const resolved = resolveTheme(value);
      root.setAttribute("data-theme", value);
      root.classList.toggle("dark", resolved === "dark");
      root.style.setProperty("color-scheme", resolved);
      setStatusMessage(`Theme: ${resolved}`);
    };

    applyTheme(theme);

    const listener = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    prefersDark.addEventListener("change", listener);
    return () => prefersDark.removeEventListener("change", listener);
  }, [theme]);

  return (
    <>
      <header className="border-b border-ch-border-default">
        <div className="mx-auto max-w-screen-lg px-ch-xl py-ch-2xl">
          <div className="flex items-center justify-between gap-ch-md max-sm:flex-col max-sm:items-start">
            <h1 className="text-ch-lg font-semibold tracking-tight">Chamfer</h1>
            <nav>
              <label className="sr-only" htmlFor="theme-select">
                Theme
              </label>
              <select
                id="theme-select"
                value={theme}
                onChange={event => setTheme(event.target.value as ThemeMode)}
                className="rounded-ch-sm border border-ch-border-default bg-ch-surface-base px-ch-md py-ch-sm text-ch-sm text-ch-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ch-focus-outer"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </nav>
          </div>
        </div>
      </header>

      <p id="status" className="sr-only" aria-live="polite">
        {statusMessage}
      </p>

      <main className="mx-auto max-w-screen-lg px-ch-xl py-ch-2xl">
        <section className="mb-ch-2xl">
          <h2 className="mb-ch-lg text-ch-xs font-semibold uppercase tracking-[0.1em] text-ch-text-secondary">
            Color
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-ch-md">
            {colorSwatches.map(({ label, classes }) => (
              <div key={label} className={classes}>
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-ch-2xl">
          <h2 className="mb-ch-lg text-ch-xs font-semibold uppercase tracking-[0.1em] text-ch-text-secondary">
            Actions
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-ch-md">
            {solidSwatches.map(({ label, classes }) => (
              <div key={label} className={classes}>
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-ch-2xl">
          <h2 className="mb-ch-lg text-ch-xs font-semibold uppercase tracking-[0.1em] text-ch-text-secondary">
            Soft
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-ch-md">
            {softSwatches.map(({ label, classes }) => (
              <div key={label} className={classes}>
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-ch-2xl">
          <h2 className="mb-ch-lg text-ch-xs font-semibold uppercase tracking-[0.1em] text-ch-text-secondary">
            Outline
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-ch-md">
            {outlineSwatches.map(({ label, classes }) => (
              <div key={label} className={classes}>
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-ch-2xl">
          <h2 className="mb-ch-lg text-ch-xs font-semibold uppercase tracking-[0.1em] text-ch-text-secondary">
            Tones
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-ch-md">
            {toneSwatches.map(({ label, classes }) => (
              <div key={label} className={classes}>
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-ch-2xl">
          <h2 className="mb-ch-lg text-ch-xs font-semibold uppercase tracking-[0.1em] text-ch-text-secondary">
            Typography
          </h2>
          <div className="flex flex-col gap-ch-lg">
            {textSamples.map(({ label, classes }) => (
              <p key={label} className={classes}>
                {label}
              </p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-ch-lg text-ch-xs font-semibold uppercase tracking-[0.1em] text-ch-text-secondary">
            Interactive
          </h2>
          <div className="flex flex-wrap gap-ch-md">
            {buttonExamples.map(({ label, classes }) => (
              <button key={label} className={classes}>
                {label}
              </button>
            ))}
            <button className="min-h-ch-pressable-md rounded-ch-sm border border-transparent bg-transparent px-ch-lg font-ch-medium text-ch-text-primary transition hover:bg-ch-hover-on-base focus-visible:focus-ring-ch">
              Ghost
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
