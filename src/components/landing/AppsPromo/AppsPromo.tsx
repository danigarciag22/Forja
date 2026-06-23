import { Button } from "@/components/ds";

const MARQUEE =
  "Dos armas. Un sistema ▸ Forja tu físico ▸ Domina tu nutrición ▸ Cero excusas ▸ ";

/** Two-app freemium promo (comic design). Drives YouTube traffic to subscriptions. */
export function AppsPromo() {
  return (
    <section className="lp-apps" id="apps" aria-labelledby="apps-heading">
      {/* Marquee */}
      <div className="lp-marquee" aria-hidden="true">
        <div className="lp-marquee__track">
          <span>{MARQUEE.repeat(2)}</span>
          <span>{MARQUEE.repeat(2)}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="lp-apps__hero">
        <span className="lp-chip">Cap. 04 — El Arsenal Móvil</span>
        <h1 className="lp-apps__title" id="apps-heading">
          Dos Apps. Un Solo Sistema.
        </h1>
        <p className="lp-apps__lead">
          Entrena con <strong>HIERRO</strong> y come con <strong>COMBUSTIBLE</strong>.
          Empieza gratis hoy, sube a premium cuando estés listo para forjar en serio.
        </p>
      </div>

      {/* Split apps */}
      <div className="lp-apps__splitwrap">
        <div className="lp-apps__split">
          {/* HIERRO — entrenamiento */}
          <div className="lp-apps__col lp-apps__col--ink">
            <span className="lp-apps__halftone" aria-hidden="true" />
            <span className="lp-apps__col-kicker">App de Entrenamiento</span>
            <h2 className="lp-apps__col-title">FORJA Hierro</h2>
            <p className="lp-apps__col-desc">
              Protocolos de hipertrofia, registro de cargas y progresión táctica,
              viñeta a viñeta.
            </p>
            <div className="lp-phone lp-phone--ink">
              <div className="lp-phone__screen">
                <div className="lp-phone__bar">Día 1 · Empuje</div>
                <div className="lp-phone__body">
                  <div className="lp-phone__row"><span>Press banca</span><span>4×8</span></div>
                  <div className="lp-phone__row"><span>Fondos</span><span>3×10</span></div>
                  <div className="lp-phone__row lp-phone__row--solid"><span>Press militar</span><span>4×6</span></div>
                  <div className="lp-phone__timer">02:14</div>
                  <div className="lp-phone__caption">Descanso</div>
                </div>
              </div>
            </div>
            <span className="lp-apps__tier">Freemium · Premium desde $7.99/mes</span>
          </div>

          {/* COMBUSTIBLE — nutrición */}
          <div className="lp-apps__col lp-apps__col--paper">
            <span className="lp-apps__col-kicker">App de Nutrición</span>
            <h2 className="lp-apps__col-title">FORJA Combustible</h2>
            <p className="lp-apps__col-desc">
              Planes de macros, recetas tácticas y seguimiento de tu combustible
              diario sin relleno.
            </p>
            <div className="lp-phone lp-phone--paper">
              <div className="lp-phone__screen">
                <div className="lp-phone__bar">Hoy · Macros</div>
                <div className="lp-phone__body lp-phone__body--center">
                  <div className="lp-ring">
                    <span className="lp-ring__num">1.840</span>
                    <span className="lp-ring__unit">KCAL</span>
                  </div>
                  <div className="lp-macros">
                    <div className="lp-macros__cell">P<br />180g</div>
                    <div className="lp-macros__cell">C<br />160g</div>
                    <div className="lp-macros__cell">G<br />55g</div>
                  </div>
                </div>
              </div>
            </div>
            <span className="lp-apps__tier">Freemium · Premium desde $7.99/mes</span>
          </div>
        </div>
      </div>

      {/* Combined CTA */}
      <div className="lp-apps__cta">
        <p className="lp-apps__cta-line">
          ¿Las quieres todas? El <strong>Combo Titán</strong> te da ambas premium.
        </p>
        <div className="lp-apps__cta-actions">
          <Button as="a" href="/cuenta?next=/precios" variant="primary" size="lg">
            Crear cuenta gratis ▸▸
          </Button>
          <Button as="a" href="/precios" variant="outline" size="lg">
            Ver todos los planes ▸▸
          </Button>
        </div>
      </div>
    </section>
  );
}
