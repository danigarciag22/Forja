import { ImageResponse } from "next/og";

export const alt = "FORJA — Forja tu físico. Domina el sistema.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Strict black & white comic OG card (no external fonts — satori built-in).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fff",
          padding: 36,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "16px solid #000",
            padding: "60px 70px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 6, color: "#000" }}>
              ARSENAL TÁCTICO · COMUNIDAD
            </div>
            <div
              style={{
                display: "flex",
                background: "#000",
                color: "#fff",
                fontSize: 24,
                fontWeight: 800,
                padding: "12px 18px",
                letterSpacing: 2,
                transform: "rotate(4deg)",
              }}
            >
              NUEVO CAP.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 230, fontWeight: 900, color: "#000", lineHeight: 1, letterSpacing: -6 }}>
              FORJA
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginTop: 18, fontSize: 46, fontWeight: 800, color: "#000" }}>
              <span style={{ display: "flex", marginRight: 16 }}>FORJA TU FÍSICO.</span>
              <span style={{ display: "flex", background: "#000", color: "#fff", padding: "4px 14px" }}>DOMINA EL SISTEMA.</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, fontWeight: 700, color: "#000" }}>
            <div style={{ display: "flex" }}>E-BOOKS · ENTRENAMIENTO · NUTRICIÓN</div>
            <div style={{ display: "flex" }}>forja.gym</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
