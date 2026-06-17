import type { Metadata } from "next";
import { ProductPage } from "@/components/landing/ProductPage";

export const metadata: Metadata = {
  title: "Protocolo: Volumen Limpio y Construcción Sólida — FORJA",
  description:
    "El sistema de volumen limpio de FORJA: hipertrofia, sobrecarga progresiva y rutinas de 1 hora. Garantía táctica de 30 días.",
};

export default function Producto() {
  return <ProductPage />;
}
