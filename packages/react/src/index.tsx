import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { useEffect, useRef } from "react";

import { enhanceButton, type RippleOptions } from "@chamfer/behavior";

export type ChamferButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  /**
   * Enables/disables the ripple effect once implemented.
   */
  ripple?: boolean | RippleOptions;
};

export const Button: FC<ChamferButtonProps> = ({
  ripple = true,
  className,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!ref.current || ripple === false) {
      return;
    }

    const enhancement = enhanceButton(ref.current, {
      ripple
    });
    return enhancement.destroy;
  }, [ripple]);

  const classes = ["ch-button", className].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      data-ch-component="button"
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
};
