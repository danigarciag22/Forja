import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";

export const metadata: Metadata = {
  title: "Archivo: Política de Privacidad — FORJA",
  description: "Política de privacidad de FORJA.",
};

export default function Privacidad() {
  return <LegalPage doc="privacidad" />;
}
