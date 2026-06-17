import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button, ComicPanel } from "@/components/ds";

export const metadata: Metadata = {
  title: "Pago cancelado — FORJA",
  robots: { index: false },
};

export default function Cancelada() {
  return (
    <div className="lp">
      <Navbar />
      <main className="lp-container" style={{ padding: "var(--space-9) var(--space-6)" }}>
        <ComicPanel
          weight="frame"
          padded
          style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}
        >
          <h1 style={{ fontSize: "var(--text-xxl)" }}>Misión Abortada</h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.5,
              margin: "var(--space-4) 0 var(--space-6)",
            }}
          >
            El pago se canceló y no se realizó ningún cargo. El Arsenal sigue
            esperándote cuando estés listo para entrar.
          </p>
          <div
            style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Button as="a" href="/producto" variant="primary" size="lg">
              Reintentar
            </Button>
            <Button as="a" href="/" variant="outline" size="lg">
              Volver a la Base
            </Button>
          </div>
        </ComicPanel>
      </main>
      <Footer />
    </div>
  );
}
