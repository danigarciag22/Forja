import type { CSSProperties, ReactNode, HTMLAttributes } from "react";

type ChapterTitleProps = {
  eyebrow?: ReactNode;
  children: ReactNode;
  align?: "left" | "center" | "right";
  comic?: boolean;
  rule?: boolean;
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLElement>;

/**
 * Comic chapter-title block — a small "chapter" eyebrow with a rule,
 * then a big condensed/comic title. Opens every section.
 */
export function ChapterTitle({
  eyebrow,
  children,
  align = "left",
  comic = false,
  rule = false,
  className = "",
  style = {},
  ...rest
}: ChapterTitleProps) {
  const cls = [
    "forja-chapter",
    align !== "left" ? `forja-chapter--${align}` : "",
    comic ? "forja-chapter--comic" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <header className={cls} style={style} {...rest}>
      {eyebrow ? <span className="forja-chapter__eyebrow">{eyebrow}</span> : null}
      <h2 className="forja-chapter__title">{children}</h2>
      {rule ? <span className="forja-chapter__rule" aria-hidden="true" /> : null}
    </header>
  );
}
