import type { ProductContent } from "./types";

// Featured book — the fully-finished template all other books follow.
// Swap the gallery `src`s for real per-book artwork when available.
export const volumenLimpio: ProductContent = {
  slug: "volumen-limpio",
  eyebrow: "Arsenal · Edición Nº2",
  title: "Protocolo: Volumen Limpio y Construcción Sólida",
  shortTitle: "Volumen Limpio",
  description:
    "El sistema de volumen limpio de FORJA: hipertrofia, sobrecarga progresiva y rutinas de 1 hora. Sube a 95kg de masa magra sin grasa de relleno. Garantía táctica de 30 días.",
  rating: { value: 4.9, count: 1240 },
  priceCents: 4900,
  anchorCents: 12000,
  currency: "usd",
  urgency: "Solo 15 copias disponibles a este precio",
  gallery: [
    { src: "/assets/titan-cover.png", alt: "Portada del e-book Volumen Limpio de FORJA", w: 1408, h: 3008 },
    { src: "/assets/titan-hero.png", alt: "El Titán — vista de la edición", w: 1536, h: 2752 },
    { src: "/assets/titan-video.png", alt: "Vista previa del contenido", w: 2752, h: 1536 },
    { src: "/assets/titan-cover.png", alt: "Contraportada del e-book", w: 1408, h: 3008 },
  ],
  variants: [
    { id: "hipertrofia", label: "Hipertrofia", note: "Volumen + masa magra", mark: "▲" },
    { id: "acondicionamiento", label: "Acondicionamiento Físico", note: "Resistencia + combate", mark: "✦" },
  ],
  benefits: [
    "Sube a 95kg con masa magra",
    "Sobrecarga progresiva semana a semana",
    "Rutinas de 1 hora, sin relleno",
    "Registro de entrenamiento incluido",
  ],
  format: {
    pages: 124,
    formats: ["PDF", "EPUB"],
    delivery: ["Descarga inmediata", "Acceso de por vida", "Actualizaciones gratis"],
  },
  chapters: [
    { n: "01", title: "Fundamentos del Volumen Limpio" },
    { n: "02", title: "Sobrecarga Progresiva, Semana a Semana" },
    { n: "03", title: "La Máquina de 95kg: Rutina de 6 Días" },
    { n: "04", title: "Nutrición de Precisión y Macros" },
    { n: "05", title: "Recuperación y Descanso Táctico" },
    { n: "06", title: "Registro, Métricas y Progreso" },
    { n: "07", title: "Errores que Frenan tu Masa" },
  ],
  valueStack: [
    { n: "Vol. 01", title: "Manual Base: Hipertrofia Absoluta", was: "$60", tag: "INCLUIDO" },
    { n: "Vol. 02", title: "Combustible: Recetario y Shots de Recuperación", was: "$30", tag: "GRATIS" },
    { n: "Vol. 03", title: "Calculadora Dinámica de Macros", was: "$15", tag: "GRATIS" },
  ],
  valueTotalWas: "$105",
  testimonials: [
    { name: "Marco R.", quote: "Subí 7kg de masa magra en 12 semanas. El sistema no falla." },
    { name: "Daniel V.", quote: "Las rutinas de 1 hora encajan con mi turno. Brutal." },
    { name: "Iván P.", quote: "Por fin un plan sin relleno. Cada semana progreso medible." },
    { name: "Sergio M.", quote: "La calculadora de macros me ahorró meses de prueba y error." },
  ],
  guarantee: {
    days: 30,
    title: "Garantía Táctica de 30 Días",
    copy: "Si el sistema no te funciona, escríbenos dentro de 30 días y te devolvemos el 100%. Sin interrogatorios incómodos. El riesgo lo asumimos nosotros — tú solo entrena.",
  },
  faq: [
    { q: "¿En qué formato recibo el e-book?", a: "PDF y EPUB, con descarga inmediata tras la compra. Sin esperas." },
    { q: "¿En qué dispositivos puedo leerlo?", a: "En cualquiera: móvil, tablet, e-reader o computadora. Es tuyo para siempre." },
    { q: "¿Necesito experiencia previa?", a: "No. El protocolo escala desde principiante a avanzado con la sobrecarga progresiva." },
    { q: "¿Tengo acceso de por vida y actualizaciones?", a: "Sí. Pago único, acceso permanente y todas las futuras revisiones del sistema sin costo." },
    { q: "¿Cómo recibo el acceso después de pagar?", a: "Te llega un correo de confirmación con el enlace de descarga inmediatamente tras el pago." },
    { q: "¿Y si no me convence?", a: "Tienes 30 días de garantía. Reembolso íntegro, sin preguntas incómodas." },
  ],
};
