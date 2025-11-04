import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  HTMLAttributes,
  MutableRefObject
} from "react";
import { forwardRef, useCallback, useEffect, useRef } from "react";

import { enhanceButton } from "@chamfer/behavior";

export type ButtonTone = "primary" | "secondary" | "success" | "warning" | "danger";
export type ButtonEmphasis = "solid" | "soft" | "flat" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type SpinnerTone = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
export type SpinnerSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  tone?: ButtonTone;
  emphasis?: ButtonEmphasis;
  size?: ButtonSize;
  ripple?: boolean;
  loading?: boolean;
}

const ButtonInner = (
  {
    tone = "primary",
    emphasis = "solid",
    size = "md",
    ripple = true,
    loading = false,
    className,
    disabled,
    type,
    "aria-busy": ariaBusy,
    children,
    ...rest
  }: ButtonProps,
  forwardedRef: ForwardedRef<HTMLButtonElement>
) => {
  const innerRef = useRef<HTMLButtonElement | null>(null);

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      innerRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    },
    [forwardedRef]
  );

  useEffect(() => {
    if (!innerRef.current || ripple === false) {
      return;
    }

    const enhancement = enhanceButton(innerRef.current);
    return enhancement.destroy;
  }, [ripple]);

  const classes = [
    "ch-button",
    size && `ch-button--${size}`,
    emphasis && `ch-button--${emphasis}`,
    tone && `ch-button--${tone}`,
    className
  ]
    .filter(Boolean)
    .join(" ");

  const isDisabled = Boolean(disabled || loading);
  const rippleAttr = ripple === false ? "false" : undefined;

  return (
    <button
      ref={setRefs}
      data-ch-component="button"
      data-ch-loading={loading ? "true" : undefined}
      data-ch-ripple={rippleAttr}
      className={classes}
      disabled={isDisabled}
      type={type ?? "button"}
      aria-busy={loading ? "true" : ariaBusy}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonInner);
Button.displayName = "ChamferButton";

export interface SpinnerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tone?: SpinnerTone;
  size?: SpinnerSize;
  label?: string;
  paused?: boolean;
}

const SpinnerInner = (
  {
    tone = "primary",
    size = "md",
    label,
    paused = false,
    className,
    role = "status",
    "aria-label": ariaLabel,
    "aria-busy": ariaBusy,
    ...rest
  }: SpinnerProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const classes = [
    "ch-spinner",
    size && `ch-spinner--${size}`,
    tone && `ch-spinner--${tone}`,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={forwardedRef}
      data-ch-component="spinner"
      data-ch-paused={paused ? "true" : undefined}
      className={classes}
      role={role}
      aria-busy={ariaBusy ?? "true"}
      aria-label={ariaLabel ?? label}
      {...rest}
    >
      <svg viewBox="0 0 24 24" className="ch-spinner__icon">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="62.83 62.83" />
      </svg>
      {label && <span className="ch-spinner__label">{label}</span>}
    </div>
  );
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(SpinnerInner);
Spinner.displayName = "ChamferSpinner";
