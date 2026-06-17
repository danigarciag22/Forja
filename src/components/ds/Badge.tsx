import type { CSSProperties, ReactNode, HTMLAttributes } from "react";

type BadgeProps = {
  children: ReactNode;
  shape?: "tag" | "burst";
  solid?: boolean;
  tilt?: number;
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLSpanElement>;

/**
 * Inked label or comic price-burst.
 * - shape "tag"   : rectangular label (solid or outline)
 * - shape "burst" : spiky starburst for prices / "NUEVO"
 */
export function Badge({
  children,
  shape = "tag",
  solid = false,
  tilt = 0,
  className = "",
  style = {},
  ...rest
}: BadgeProps) {
  const cls = [
    "forja-badge",
    `forja-badge--${shape}`,
    shape === "tag" && solid ? "is-solid" : "",
    shape === "burst" && !solid ? "is-outline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span
      className={cls}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}
