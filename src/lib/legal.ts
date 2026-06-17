/** Classified-dossier content for the three legal views. */

export type LegalBlock =
  | { h: string }
  | { p: string }
  | { ul: string[] }
  | { hr: true };

export type LegalDocData = {
  ref: string;
  title: string;
  intro: string;
  blocks: LegalBlock[];
};

export type LegalDocKey = "terminos" | "privacidad" | "reembolsos";

export const FORJA_LEGAL: Record<LegalDocKey, LegalDocData> = {
  terminos: {
    ref: "FRJ-TOS-01",
    title: "Términos de Servicio",
    intro:
      "Este archivo regula tu acceso al Arsenal de FORJA y a la comunidad. Al unirte al Culto aceptas el protocolo completo. Si no estás de acuerdo, abandona el cuartel.",
    blocks: [
      { h: "01 · Acceso al Arsenal" },
      { p: "El acceso a las guías, recetarios y transmisiones se concede a título personal e intransferible. Una licencia, un recluta. Compartir credenciales es traición al Culto y causa baja inmediata." },
      { h: "02 · Uso del Contenido" },
      { ul: [
        "Los e-books son para tu uso personal de entrenamiento.",
        "Prohibida la redistribución, reventa o publicación total o parcial.",
        "No se permite extraer el material para entrenar a terceros sin licencia.",
      ] },
      { hr: true },
      { h: "03 · Cuenta y Conducta" },
      { p: "Eres responsable de la seguridad de tu cuenta y de toda actividad bajo ella. La conducta tóxica, el spam o el acoso dentro de la comunidad se sancionan sin previo aviso." },
      { h: "04 · Responsabilidad Física" },
      { p: "FORJA entrega conocimiento, no diagnósticos. Consulta a un profesional de la salud antes de iniciar cualquier protocolo. El esfuerzo es tuyo; el riesgo también. No nos hacemos responsables de lesiones derivadas de un mal uso del material." },
      { hr: true },
      { h: "05 · Modificaciones del Protocolo" },
      { p: "Podemos actualizar estos términos cuando el sistema evolucione. La versión vigente siempre vivirá en este archivo. El uso continuado implica aceptación de la última revisión." },
    ],
  },
  privacidad: {
    ref: "FRJ-PRV-02",
    title: "Política de Privacidad",
    intro:
      "Tus datos son munición sensible. Aquí declaramos qué recopilamos, por qué, y cómo lo blindamos. Sin letra pequeña, sin trucos.",
    blocks: [
      { h: "01 · Qué Datos Recopilamos" },
      { ul: [
        "Identidad básica: nombre y correo de recluta.",
        "Datos de transacción al adquirir un e-book (procesados por la pasarela de pago).",
        "Métricas de uso anónimas para mejorar las transmisiones.",
      ] },
      { h: "02 · Cómo los Usamos" },
      { p: "Usamos tu correo para enviarte el material adquirido, la guía gratuita y las novedades del Culto. Jamás vendemos ni alquilamos tu información a terceros. Punto." },
      { hr: true },
      { h: "03 · Cookies y Rastreo" },
      { p: "Empleamos cookies estrictamente necesarias y analítica agregada. Puedes desactivarlas desde tu navegador; algunas funciones del cuartel podrían verse limitadas." },
      { h: "04 · Tus Derechos" },
      { ul: [
        "Acceder, rectificar o eliminar tus datos cuando quieras.",
        "Darte de baja de las comunicaciones con un solo clic.",
        "Solicitar una copia de la información que guardamos sobre ti.",
      ] },
      { hr: true },
      { h: "05 · Contacto" },
      { p: "Para ejercer cualquier derecho, transmite a privacidad@forja.gym. Respondemos en un plazo máximo de 30 días terrestres." },
    ],
  },
  reembolsos: {
    ref: "FRJ-RMB-03",
    title: "Política de Reembolsos",
    intro:
      "Confiamos en el material. Por eso respaldamos cada edición con una garantía clara. Lee el protocolo antes de solicitar una baja de misión.",
    blocks: [
      { h: "01 · Productos Digitales" },
      { p: "Los e-books son productos digitales de descarga inmediata. Al confirmar la compra obtienes acceso completo al instante, lo que en condiciones normales anula el derecho de desistimiento estándar." },
      { h: "02 · Garantía de 7 Días" },
      { ul: [
        "Si el material no cumple lo prometido, dispones de 7 días.",
        "Reembolso íntegro, sin interrogatorios incómodos.",
        "Aplica a la primera compra de cada edición.",
      ] },
      { hr: true },
      { h: "03 · Cómo Solicitar la Baja" },
      { p: "Transmite a soporte@forja.gym con el asunto «REEMBOLSO» indicando tu número de orden. El equipo procesará tu caso en un máximo de 48 horas." },
      { h: "04 · Excepciones" },
      { ul: [
        "Compras realizadas fuera del plazo de 7 días.",
        "Solicitudes reincidentes del mismo material.",
        "Paquetes o bundles parcialmente consumidos.",
      ] },
      { hr: true },
      { h: "05 · Tiempos de Procesamiento" },
      { p: "Una vez aprobado, el reembolso se refleja en tu método de pago en 5 a 10 días hábiles, según tu entidad bancaria." },
    ],
  },
};
