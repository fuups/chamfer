import type { JSX, ReactNode } from "react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import { enhanceButton } from "@chamfer/behavior";

type ThemeOption = "light" | "dark" | "system";

interface Swatch {
  token: string;
  style: CSSProperties;
}

const colorSwatches: Swatch[] = [
  { token: "--ch-color-default", style: { background: "var(--ch-color-default)" } },
  { token: "--ch-color-secondary", style: { background: "var(--ch-color-secondary)" } },
  {
    token: "--ch-color-background",
    style: {
      background: "var(--ch-color-background)",
      border: "1px solid var(--ch-border-default)",
      color: "var(--ch-color-default)"
    }
  },
  {
    token: "--ch-color-surface",
    style: {
      background: "var(--ch-color-surface)",
      border: "1px solid var(--ch-border-default)",
      color: "var(--ch-color-default)"
    }
  },
  { token: "--ch-border-default", style: { background: "var(--ch-border-default)" } }
];

const actionSwatches: Swatch[] = [
  {
    token: "primary",
    style: {
      background: "var(--ch-action-primary-bg)",
      color: "var(--ch-action-primary-fg)"
    }
  },
  {
    token: "secondary",
    style: {
      background: "var(--ch-action-secondary-bg)",
      color: "var(--ch-action-secondary-fg)"
    }
  },
  {
    token: "success",
    style: {
      background: "var(--ch-action-success-bg)",
      color: "var(--ch-action-success-fg)"
    }
  },
  {
    token: "warning",
    style: {
      background: "var(--ch-action-warning-bg)",
      color: "var(--ch-action-warning-fg)"
    }
  },
  {
    token: "danger",
    style: {
      background: "var(--ch-action-danger-bg)",
      color: "var(--ch-action-danger-fg)"
    }
  }
];

const softActionSwatches: Swatch[] = [
  {
    token: "primary",
    style: {
      background: "var(--ch-action-primary-soft-bg)",
      color: "var(--ch-action-primary-soft-fg)",
      border: "1px solid var(--ch-action-primary-soft-border)"
    }
  },
  {
    token: "secondary",
    style: {
      background: "var(--ch-action-secondary-soft-bg)",
      color: "var(--ch-action-secondary-soft-fg)",
      border: "1px solid var(--ch-action-secondary-soft-border)"
    }
  },
  {
    token: "success",
    style: {
      background: "var(--ch-action-success-soft-bg)",
      color: "var(--ch-action-success-soft-fg)",
      border: "1px solid var(--ch-action-success-soft-border)"
    }
  },
  {
    token: "warning",
    style: {
      background: "var(--ch-action-warning-soft-bg)",
      color: "var(--ch-action-warning-soft-fg)",
      border: "1px solid var(--ch-action-warning-soft-border)"
    }
  },
  {
    token: "danger",
    style: {
      background: "var(--ch-action-danger-soft-bg)",
      color: "var(--ch-action-danger-soft-fg)",
      border: "1px solid var(--ch-action-danger-soft-border)"
    }
  }
];

const outlineSwatches: Swatch[] = [
  {
    token: "primary",
    style: {
      background: "transparent",
      color: "var(--ch-action-outline-primary-fg)",
      border: "1px solid var(--ch-action-outline-primary-border)"
    }
  },
  {
    token: "secondary",
    style: {
      background: "transparent",
      color: "var(--ch-action-outline-secondary-fg)",
      border: "1px solid var(--ch-action-outline-secondary-border)"
    }
  },
  {
    token: "success",
    style: {
      background: "transparent",
      color: "var(--ch-action-outline-success-fg)",
      border: "1px solid var(--ch-action-outline-success-border)"
    }
  },
  {
    token: "warning",
    style: {
      background: "transparent",
      color: "var(--ch-action-outline-warning-fg)",
      border: "1px solid var(--ch-action-outline-warning-border)"
    }
  },
  {
    token: "danger",
    style: {
      background: "transparent",
      color: "var(--ch-action-outline-danger-fg)",
      border: "1px solid var(--ch-action-outline-danger-border)"
    }
  }
];

const toneSwatches: Swatch[] = [
  {
    token: "info",
    style: {
      background: "var(--ch-tone-info-soft-bg)",
      color: "var(--ch-tone-info-soft-fg)",
      border: "1px solid var(--ch-tone-info-soft-border)"
    }
  },
  {
    token: "success",
    style: {
      background: "var(--ch-tone-success-soft-bg)",
      color: "var(--ch-tone-success-soft-fg)",
      border: "1px solid var(--ch-tone-success-soft-border)"
    }
  },
  {
    token: "warning",
    style: {
      background: "var(--ch-tone-warning-soft-bg)",
      color: "var(--ch-tone-warning-soft-fg)",
      border: "1px solid var(--ch-tone-warning-soft-border)"
    }
  },
  {
    token: "danger",
    style: {
      background: "var(--ch-tone-danger-soft-bg)",
      color: "var(--ch-tone-danger-soft-fg)",
      border: "1px solid var(--ch-tone-danger-soft-border)"
    }
  }
];

const textSamples = [
  { label: "Primary", style: { color: "var(--ch-text-primary)" } },
  { label: "Secondary", style: { color: "var(--ch-text-secondary)" } },
  { label: "Tertiary", style: { color: "var(--ch-text-tertiary)" } },
  { label: "Disabled", style: { color: "var(--ch-text-disabled)" } }
];

const buttonExamples = [
  {
    key: "solid-primary",
    className: "ch-button--md ch-button--solid ch-button--primary",
    label: "Primary"
  },
  {
    key: "solid-secondary",
    className: "ch-button--md ch-button--solid ch-button--secondary",
    label: "Secondary",
    leading: "★"
  },
  {
    key: "soft-success",
    className: "ch-button--md ch-button--soft ch-button--success",
    label: "Success",
    trailing: "→"
  },
  {
    key: "outline-warning",
    className: "ch-button--md ch-button--outline ch-button--warning",
    label: "Warning"
  },
  {
    key: "ghost-danger",
    className: "ch-button--md ch-button--ghost ch-button--danger",
    label: "Danger"
  },
  {
    key: "icon-only",
    className:
      "ch-button--sm ch-button--ghost ch-button--primary ch-button--icon-only",
    label: "Notifications",
    leading: "🔔",
    ariaLabel: "Notifications"
  }
] satisfies Array<{
  key: string;
  className: string;
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  ariaLabel?: string;
}>;

function DemoButton({
  className,
  label,
  leading,
  trailing,
  ariaLabel
}: {
  className: string;
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  ariaLabel?: string;
}): JSX.Element {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const enhancement = enhanceButton(ref.current);
    return () => enhancement.destroy();
  }, []);

  return (
    <button
      ref={ref}
      data-ch-component="button"
      className={`ch-button ${className}`}
      type="button"
      aria-label={ariaLabel}
    >
      {leading ? (
        <span className="ch-button__leading" aria-hidden="true">
          {leading}
        </span>
      ) : null}
      <span className="ch-button__label">{label}</span>
      {trailing ? (
        <span className="ch-button__trailing" aria-hidden="true">
          {trailing}
        </span>
      ) : null}
    </button>
  );
}

export default function App(): JSX.Element {
  const [theme, setTheme] = useState<ThemeOption>("system");
  const [statusMessage, setStatusMessage] = useState("Theme: system");

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const resolveTheme = (value: ThemeOption): "light" | "dark" =>
      value === "system" ? (prefersDark.matches ? "dark" : "light") : value;

    const applyTheme = (value: ThemeOption) => {
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
    return () => {
      prefersDark.removeEventListener("change", listener);
    };
  }, [theme]);

  return (
    <>
      <header>
        <div className="container">
          <h1>Chamfer</h1>
          <nav>
            <select
              aria-label="Theme"
              value={theme}
              onChange={event => setTheme(event.target.value as ThemeOption)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </nav>
        </div>
      </header>

      <p id="status" className="sr-only" aria-live="polite">
        {statusMessage}
      </p>

      <main className="container">
        <section>
          <h2>Color</h2>
          <div className="swatches">
            {colorSwatches.map(({ token, style }) => (
              <div key={token} className="swatch" data-token={token} style={style}>
                {token}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Actions</h2>
          <div className="swatches">
            {actionSwatches.map(({ token, style }) => (
              <div key={token} className="swatch" data-token={token} style={style}>
                {token}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Soft</h2>
          <div className="swatches">
            {softActionSwatches.map(({ token, style }) => (
              <div key={token} className="swatch" data-token={token} style={style}>
                {token}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Outline</h2>
          <div className="swatches">
            {outlineSwatches.map(({ token, style }) => (
              <div key={token} className="swatch" data-token={token} style={style}>
                {token}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Tones</h2>
          <div className="swatches">
            {toneSwatches.map(({ token, style }) => (
              <div key={token} className="swatch" data-token={token} style={style}>
                {token}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Typography</h2>
          <div className="text-samples">
            {textSamples.map(({ label, style }) => (
              <p key={label} className="sample" style={style}>
                {label} - The quick brown fox jumps over the lazy dog
              </p>
            ))}
          </div>
        </section>

        <section>
          <h2>Buttons</h2>
          <div className="button-grid">
            {buttonExamples.map(({ key, ...example }) => (
              <DemoButton key={key} {...example} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
