import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";

export const metadata: Metadata = {
  title: "Archivo: Términos de Servicio — FORJA",
  description: "Términos de servicio de FORJA.",
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return <LegalPage doc="terminos" />;
}
