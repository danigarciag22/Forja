import type { CSSProperties, ReactNode, HTMLAttributes } from "react";

type ComicPanelProps = {
  children: ReactNode;
  weight?: "default" | "heavy" | "frame";
  tilt?: number;
  inverted?: boolean;
  halftone?: boolean;
  padded?: boolean;
  caption?: ReactNode;
  flat?: boolean;
  as?: "div" | "article" | "section";
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLElement>;

/**
 * A comic panel — the workhorse container. Thick ink border, hard
 * offset shadow, optional halftone wash and a corner narration caption.
 */
export function ComicPanel({
  children,
  weight = "default",
  tilt = 0,
  inverted = false,
  halftone = false,
  padded = false,
  caption,
  flat = false,
  as = "div",
  className = "",
  style = {},
  ...rest
}: ComicPanelProps) {
  const Tag = as;
  const cls = [
    "forja-panel",
    weight !== "default" ? `forja-panel--${weight}` : "",
    inverted ? "forja-panel--inverted" : "",
    padded ? "forja-panel--pad" : "",
    flat ? "forja-panel--flat" : "",
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
      {caption ? <span className="forja-panel__caption">{caption}</span> : null}
      {halftone ? <span className="forja-panel__tone" aria-hidden="true" /> : null}
      <div className="forja-panel__body">{children}</div>
    </Tag>
  );
}
