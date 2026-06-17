import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { ComicPanel } from "@/components/ds";

export const metadata: Metadata = {
  title: "404 · Te saliste del protocolo — FORJA",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="lp">
      <Navbar />
      <main className="lp-404">
        <span className="lp-404__rays" aria-hidden="true" />
        <span className="lp-404__tone" aria-hidden="true" />

        <div className="lp-404__inner">
          <ComicPanel weight="frame" className="lp-404__art" caption="Recluta perdido">
            <div className="lp-404__art-img">
              <Image
                className="lp-img-mono"
                src="/assets/titan-404.png"
                alt="El Titán confundido, mirando un mapa roto"
                fill
                sizes="220px"
                priority
              />
            </div>
          </ComicPanel>

          <p className="lp-404__code">404</p>
          <h1 className="lp-404__title">Te saliste del protocolo.</h1>
          <p className="lp-404__body">
            La ruta que buscas no existe. O el enlace fue destruido, o te perdiste
            buscando el camino hacia la hipertrofia. Regresa a la base y sigamos
            construyendo la máquina.
          </p>

          <Link
            href="/"
            className="forja-btn forja-btn--primary forja-btn--lg lp-404__cta"
          >
            Retomar el Entrenamiento
          </Link>
        </div>
      </main>
    </div>
  );
}
