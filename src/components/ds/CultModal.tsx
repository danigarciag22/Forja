"use client";

import { useEffect, useRef, useState } from "react";

type CultModalProps = {
  open: boolean;
  onClose: () => void;
  code?: string;
};

/**
 * The "Únete al Culto" lead-magnet modal — a comic-panel popup that
 * captures alias + email in exchange for a 10% discount code, with a
 * built-in success ("INICIACIÓN COMPLETADA") state. Visual only (no
 * backend capture, per scope).
 */
export function CultModal({ open, onClose, code = "CULTO10" }: CultModalProps) {
  const [done, setDone] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstRef.current?.focus(), 30);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="forja-cult-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="forja-cult-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Iníciate en el Culto"
      >
        <div className="forja-cult-modal__bar">
          <span className="forja-cult-modal__kicker">
            FORJA · Archivo de Reclutamiento
          </span>
          <button
            type="button"
            className="forja-cult-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M2 2 L16 16 M16 2 L2 16"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="forja-cult-modal__body">
          <span className="forja-cult-modal__tone" aria-hidden="true" />
          <div className="forja-cult-modal__inner">
            {!done ? (
              <>
                <h2 className="forja-cult-title">
                  Iníciate en<br />el Culto
                </h2>
                <p className="forja-cult-sub">
                  Únete a la resistencia. Ingresa tu correo para recibir un{" "}
                  <b>10% de descuento</b> en tu primer e-book del Arsenal y acceso a
                  transmisiones clasificadas.
                </p>
                <form
                  className="forja-cult-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDone(true);
                  }}
                >
                  <div className="forja-cult-field">
                    <label htmlFor="forja-cult-alias">Tu Alias / Nombre</label>
                    <input
                      ref={firstRef}
                      id="forja-cult-alias"
                      type="text"
                      placeholder="El Recluta"
                      required
                    />
                  </div>
                  <div className="forja-cult-field">
                    <label htmlFor="forja-cult-email">Correo Electrónico</label>
                    <input
                      id="forja-cult-email"
                      type="email"
                      placeholder="recluta@forja.gym"
                      required
                    />
                  </div>
                  <button type="submit" className="forja-cult-submit">
                    Reclamar mi 10%
                  </button>
                  <p className="forja-cult-fine">
                    Sin spam. Solo órdenes desde la base.
                  </p>
                </form>
              </>
            ) : (
              <div className="forja-cult-success">
                <span className="forja-cult-success__stamp">Acceso concedido</span>
                <h2 className="forja-cult-success__title">
                  Iniciación<br />completada
                </h2>
                <span className="forja-cult-success__rule" aria-hidden="true" />
                <p className="forja-cult-success__msg">
                  Bienvenido a la resistencia. Tu código de descuento está activo —
                  úsalo al pagar tu primer e-book del Arsenal.
                </p>
                <div className="forja-cult-code">
                  <span className="forja-cult-code__label">Tu código</span>
                  <span className="forja-cult-code__value">{code}</span>
                </div>
                <button
                  type="button"
                  className="forja-cult-submit"
                  onClick={onClose}
                >
                  Entrar a la base
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
