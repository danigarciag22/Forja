import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";

export const metadata: Metadata = {
  title: "Archivo: Política de Reembolsos — FORJA",
  description: "Política de reembolsos de FORJA.",
  alternates: { canonical: "/reembolsos" },
};

export default function Reembolsos() {
  return <LegalPage doc="reembolsos" />;
}
