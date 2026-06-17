import type { CSSProperties, ReactNode, HTMLAttributes } from "react";

type SpeechBubbleProps = {
  children: ReactNode;
  inverted?: boolean;
  tilt?: number;
  as?: "button" | "a";
  href?: string;
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLElement>;

/**
 * Comic speech-bubble CTA — rounded balloon with a pointing tail.
 * Used for the community / "join" calls to action.
 */
export function SpeechBubble({
  children,
  inverted = false,
  tilt = 0,
  as = "button",
  className = "",
  style = {},
  ...rest
}: SpeechBubbleProps) {
  const Tag = as;
  const cls = ["forja-bubble", inverted ? "forja-bubble--inverted" : "", className]
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
