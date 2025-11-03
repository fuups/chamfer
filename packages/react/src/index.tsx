import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useEffect, useRef } from "react";
import { enhanceButton } from "@chamfer/behavior";

export type ChamferButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  /**
   * Enables/disables the ripple effect once implemented.
   */
  ripple?: boolean;
};

export const Button: React.FC<ChamferButtonProps> = ({
  ripple = true,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!ref.current || !ripple) {
      return;
    }

    const enhancement = enhanceButton(ref.current, { ripple });
    return enhancement.destroy;
  }, [ripple]);

  return (
    <button ref={ref} data-chamfer-component="button" {...rest}>
      {children}
    </button>
  );
};
