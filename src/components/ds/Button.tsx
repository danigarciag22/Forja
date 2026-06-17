import type { CSSProperties, ReactNode, HTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  tilt?: number;
  full?: boolean;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLElement>;

/**
 * FORJA primary action. Hard ink border + zero-blur offset shadow;
 * hovering INVERTS the fill, pressing drives it into the page.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  tilt = 0,
  full = false,
  as = "button",
  className = "",
  style = {},
  ...rest
}: ButtonProps) {
  const Tag = as;
  const cls = [
    "forja-btn",
    `forja-btn--${variant}`,
    `forja-btn--${size}`,
    full ? "forja-btn--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag
      className={cls}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
