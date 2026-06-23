import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ds";

export const metadata: Metadata = {
  title: "Pago confirmado — FORJA",
  robots: { index: false },
};

export default function Exito() {
  return (
    <div className="lp">
      <Navbar />
      <main>
        <div className="lp-success">
          <div className="lp-success__stamp">
            <div className="lp-success__stamp-txt">
              ¡INICIACIÓN<br />COMPLETADA!
            </div>
          </div>
          <h1 className="lp-success__title">Acceso premium desbloqueado</h1>
          <p className="lp-success__text">
            Descarga la app, inicia sesión con tu cuenta y empieza tus 7 días
            premium. Revisa tu correo para la confirmación. Cero excusas. Solo el
            trabajo.
          </p>
          <div className="lp-success__actions">
            <Button as="a" href="/" variant="primary" size="lg">
              Volver al inicio ▸▸
            </Button>
            <Button as="a" href="/precios" variant="outline" size="lg">
              Ver planes
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
