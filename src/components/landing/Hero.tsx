"use client";

import Image from "next/image";
import { Button, Badge, ComicPanel } from "@/components/ds";
import { openCult } from "@/lib/cult";

/** Asymmetric two-column impact section. Giant headline + heavy-framed art. */
export function Hero() {
  return (
    <section className="lp-hero">
      <span className="lp-hero__speed" aria-hidden="true" />
      <div className="lp-hero__grid">
        <div className="lp-hero__copy">
          <span className="lp-hero__eyebrow">Comunidad de mejora física</span>
          <h1 className="lp-hero__title">
            Forja tu Físico.<br />
            <em>Domina</em> el Sistema.
          </h1>
          <p className="lp-hero__sub">
            Protocolos sin relleno, guías tácticas y una comunidad que entrena en
            serio. Cero excusas. Solo el trabajo, viñeta a viñeta.
          </p>
          <div className="lp-hero__actions">
            <Button variant="primary" size="lg" onClick={openCult}>
              Desbloquear Arsenal
            </Button>
            <Button variant="ghost" size="lg" as="a" href="/#comic">
              Ver el cómic ▸
            </Button>
          </div>
        </div>

        <div className="lp-hero__art">
          <div className="lp-hero__burst">
            <Badge shape="burst" solid tilt={-8}>
              NUEVO<br />CAP.
            </Badge>
          </div>
          <ComicPanel weight="frame" className="lp-hero__frame" caption="El Titán">
            <div className="lp-art-slot">
              <Image
                className="lp-img-mono"
                src="/assets/titan-hero.png"
                alt="El Titán — personaje humanoide de FORJA en pose de acción"
                fill
                sizes="(max-width: 900px) 92vw, 45vw"
                priority
              />
            </div>
          </ComicPanel>
        </div>
      </div>
    </section>
  );
}
