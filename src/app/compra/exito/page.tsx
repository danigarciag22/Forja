import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button, ComicPanel, Badge } from "@/components/ds";

export const metadata: Metadata = {
  title: "Pago confirmado — FORJA",
  robots: { index: false },
};

export default function Exito() {
  return (
    <div className="lp">
      <Navbar />
      <main className="lp-container" style={{ padding: "var(--space-9) var(--space-6)" }}>
        <ComicPanel
          weight="frame"
          padded
          style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}
        >
          <Badge solid tilt={-3} style={{ marginBottom: "var(--space-5)" }}>
            Acceso concedido
          </Badge>
          <h1 style={{ fontSize: "var(--text-xxl)" }}>Pago Confirmado</h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.5,
              margin: "var(--space-4) 0 var(--space-6)",
            }}
          >
            Bienvenido al Arsenal, recluta. Tu orden está registrada y recibirás un
            correo de confirmación con los siguientes pasos. Revisa tu bandeja —
            incluida la carpeta de spam.
          </p>
          <Button as="a" href="/" variant="primary" size="lg">
            Volver a la Base
          </Button>
        </ComicPanel>
      </main>
      <Footer />
    </div>
  );
}
