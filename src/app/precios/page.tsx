import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { PricingPlans } from "@/components/landing/PricingPlans";

export const metadata: Metadata = {
  title: "Planes Premium · FORJA Hierro, Combustible y Combo",
  description:
    "Desbloquea el modo premium de las apps FORJA Hierro (entrenamiento) y Combustible (nutrición). Prueba gratis 7 días, planes mensuales o anuales, y el Combo Titán con ambas.",
  alternates: { canonical: "/precios" },
};

export default function PreciosPage() {
  return (
    <div className="lp">
      <Navbar />
      <main>
        <PricingPlans />
      </main>
      <Footer />
    </div>
  );
}
