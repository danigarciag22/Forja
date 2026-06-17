import type { CSSProperties, ButtonHTMLAttributes } from "react";

type PlayButtonProps = {
  size?: number;
  tilt?: number;
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style">;

/**
 * Minimal black & white circular play button — sits over video
 * thumbnails to mark "this is a transmission".
 */
export function PlayButton({
  size = 64,
  tilt = 0,
  "aria-label": ariaLabel = "Reproducir",
  className = "",
  style = {},
  ...rest
}: PlayButtonProps) {
  const cls = ["forja-play", className].filter(Boolean).join(" ");
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cls}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
        ...style,
      }}
      {...rest}
    >
      <span className="forja-play__tri" aria-hidden="true" />
    </button>
  );
}
