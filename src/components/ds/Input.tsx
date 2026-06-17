import type { CSSProperties, InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  id?: string;
  onInk?: boolean;
  className?: string;
  style?: CSSProperties;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "style">;

/**
 * Hard-edged text field. Uppercase Space-Grotesk label, thick ink
 * border, a small offset shadow that lifts on focus. `onInk` recolors
 * it for the black footer.
 */
export function Input({
  label,
  id,
  onInk = false,
  className = "",
  style = {},
  ...rest
}: InputProps) {
  return (
    <div
      className={["forja-field", onInk ? "forja-field--on-ink" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {label ? (
        <label className="forja-field__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input id={id} className="forja-input" {...rest} />
    </div>
  );
}
