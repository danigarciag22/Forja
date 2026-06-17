"use client";

type ModeToggleProps = {
  dark: boolean;
  onToggle: () => void;
};

/** Floating Yin-Yang light/dark toggle. Lives OUTSIDE the inverted layer. */
export function ModeToggle({ dark, onToggle }: ModeToggleProps) {
  return (
    <button
      type="button"
      className={"lp-mode-toggle" + (dark ? " is-dark" : "")}
      onClick={onToggle}
      aria-pressed={dark}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={dark ? "Modo Claro" : "Modo Oscuro"}
    >
      <span className="yy" aria-hidden="true" />
    </button>
  );
}
