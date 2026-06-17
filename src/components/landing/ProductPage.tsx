"use client";

import { useState } from "react";
import { Badge, ComicPanel } from "@/components/ds";
import { FEATURED_SLUG } from "@/lib/products";
import { CheckoutButton } from "./CheckoutButton";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type Thumb = { src: string; w: number; h: number };

const thumbs: Thumb[] = [
  { src: "/assets/titan-cover.png", w: 1408, h: 3008 },
  { src: "/assets/titan-hero.png", w: 1536, h: 2752 },
  { src: "/assets/titan-video.png", w: 2752, h: 1536 },
  { src: "/assets/titan-cover.png", w: 1408, h: 3008 },
];

const variants = [
  { id: "hipertrofia", label: "Hipertrofia", note: "Volumen + masa magra", mark: "▲" },
  { id: "acondicionamiento", label: "Acondicionamiento Físico", note: "Resistencia + combate", mark: "✦" },
];

const benefits = [
  "Sube a 95kg con masa magra",
  "Sobrecarga progresiva semana a semana",
  "Rutinas de 1 hora, sin relleno",
  "Registro de entrenamiento incluido",
];

const stack = [
  { t: "Manual Base: Hipertrofia Absoluta", was: "$60", tag: "INCLUIDO", n: "Vol. 01" },
  { t: "Combustible: Recetario y Shots de Recuperación", was: "$30", tag: "GRATIS", n: "Vol. 02" },
  { t: "Calculadora Dinámica de Macros", was: "$15", tag: "GRATIS", n: "Vol. 03" },
];

const testimonials = [
  { n: "Marco R.", q: "Subí 7kg de masa magra en 12 semanas. El sistema no falla." },
  { n: "Daniel V.", q: "Las rutinas de 1 hora encajan con mi turno. Brutal." },
];

/** Product-detail / buy-box page for the featured "Volumen Limpio" funnel. */
export function ProductPage() {
  const [variant, setVariant] = useState("hipertrofia");
  const [thumb, setThumb] = useState(0);
  const main = thumbs[thumb];

  return (
    <div className="lp lp-product">
      <Navbar />

      <main>
        <div className="lp-container">
          <nav className="lp-pdp__crumbs" aria-label="Ruta">
            <a href="/">Base</a>
            <span>/</span>
            <a href="/#arsenal">Arsenal</a>
            <span>/</span>
            <b>Volumen Limpio</b>
          </nav>
        </div>

        {/* ---------- BUY BOX ---------- */}
        <section className="lp-container lp-pdp__buybox">
          <div className="lp-pdp__gallery">
            <ComicPanel weight="frame" className="lp-pdp__hero-frame" caption="Edición física">
              <div className="lp-pdp__hero-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="lp-img-mono"
                  src={main.src}
                  alt="Mockup del e-book de FORJA en tablet con El Titán"
                  width={main.w}
                  height={main.h}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </ComicPanel>
            <div className="lp-pdp__thumbs">
              {thumbs.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  className={"lp-pdp__thumb" + (i === thumb ? " is-active" : "")}
                  onClick={() => setThumb(i)}
                  aria-label={"Vista " + (i + 1)}
                  aria-pressed={i === thumb}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="lp-img-mono"
                    src={t.src}
                    alt=""
                    aria-hidden="true"
                    width={t.w}
                    height={t.h}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lp-pdp__info">
            <span className="lp-pdp__eyebrow">Arsenal · Edición Nº2</span>
            <h1 className="lp-pdp__title">
              Protocolo: Volumen Limpio y Construcción Sólida
            </h1>

            <div className="lp-pdp__rating">
              <span className="lp-stars" aria-hidden="true">★★★★★</span>
              <span className="lp-pdp__rating-txt">4.9 · 1.240 reclutas iniciados</span>
            </div>

            <fieldset className="lp-pdp__variants">
              <legend className="lp-pdp__label">Elige tu protocolo</legend>
              <div className="lp-pdp__variant-grid">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={"lp-pdp__variant" + (variant === v.id ? " is-active" : "")}
                    onClick={() => setVariant(v.id)}
                    aria-pressed={variant === v.id}
                  >
                    <span className="lp-pdp__variant-mark" aria-hidden="true">{v.mark}</span>
                    <span className="lp-pdp__variant-label">{v.label}</span>
                    <span className="lp-pdp__variant-note">{v.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="lp-pdp__pricing">
              <span className="lp-pdp__price-old">$120.00</span>
              <span className="lp-pdp__price-now">$49.00</span>
              <span className="lp-pdp__price-cur">USD</span>
              <Badge shape="burst" solid tilt={-8} className="lp-pdp__save">-59%</Badge>
            </div>

            <div className="lp-pdp__urgency">
              <span className="lp-pdp__urgency-bolt" aria-hidden="true">⚡</span>
              Solo 15 copias disponibles a este precio
            </div>

            <ul className="lp-pdp__benefits">
              {benefits.map((b, i) => (
                <li key={i}>
                  <span className="lp-pdp__check" aria-hidden="true">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            <CheckoutButton slug={FEATURED_SLUG} full size="lg" className="lp-pdp__cta">
              Añadir al Arsenal — $49.00
            </CheckoutButton>

            <div className="lp-pdp__trust">
              <Badge shape="burst" solid tilt={5} className="lp-pdp__guarantee">
                30<br />DÍAS
              </Badge>
              <div className="lp-pdp__trust-copy">
                <span className="lp-pdp__trust-head">Garantía Táctica</span>
                <span className="lp-pdp__trust-txt">
                  Pago seguro · Descarga inmediata · Acceso de por vida
                </span>
              </div>
            </div>

            <div className="lp-pdp__testimonials">
              {testimonials.map((t, i) => (
                <ComicPanel
                  key={i}
                  weight="default"
                  padded
                  tilt={i === 0 ? -1 : 1}
                  className="lp-pdp__testi"
                >
                  <span className="lp-stars" aria-hidden="true">★★★★★</span>
                  <p className="lp-pdp__testi-q">&quot;{t.q}&quot;</p>
                  <span className="lp-pdp__testi-n">— {t.n}</span>
                </ComicPanel>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- ZIGZAG SEPARATOR ---------- */}
        <div className="lp-zigzag" role="separator" aria-hidden="true" />

        {/* ---------- VALUE STACKING ---------- */}
        <section className="lp-container lp-pdp__stack-wrap">
          <header className="lp-pdp__stack-head">
            <span className="lp-pdp__eyebrow">Cap. 03 — Lo que recibes</span>
            <h2 className="lp-pdp__stack-title">Desglose del Sistema</h2>
          </header>

          <div className="lp-pdp__stack-grid">
            <ComicPanel weight="heavy" padded tilt={-1} className="lp-pdp__value">
              <span className="lp-pdp__value-n">{stack[0].n}</span>
              <h3 className="lp-pdp__value-t">{stack[0].t}</h3>
              <div className="lp-pdp__value-foot">
                <span className="lp-pdp__value-was">{stack[0].was}</span>
                <Badge solid>{stack[0].tag}</Badge>
              </div>
            </ComicPanel>

            <div className="lp-pdp__phone">
              <ComicPanel weight="frame" className="lp-pdp__phone-frame" caption="El Sistema">
                <div className="lp-pdp__phone-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="lp-img-mono"
                    src="/assets/titan-hero.png"
                    alt="Smartphone mostrando el índice del sistema FORJA"
                    width={1536}
                    height={2752}
                    loading="lazy"
                  />
                </div>
              </ComicPanel>
            </div>

            <div className="lp-pdp__value-col">
              {[stack[1], stack[2]].map((s, i) => (
                <ComicPanel
                  key={i}
                  weight="heavy"
                  padded
                  tilt={i === 0 ? 1 : -1}
                  className="lp-pdp__value"
                >
                  <span className="lp-pdp__value-n">{s.n}</span>
                  <h3 className="lp-pdp__value-t">{s.t}</h3>
                  <div className="lp-pdp__value-foot">
                    <span className="lp-pdp__value-was">{s.was}</span>
                    <Badge solid>{s.tag}</Badge>
                  </div>
                </ComicPanel>
              ))}
            </div>
          </div>

          <div className="lp-pdp__stack-total">
            <span className="lp-pdp__stack-total-lbl">Valor total del paquete</span>
            <span className="lp-pdp__stack-total-was">$105</span>
            <span className="lp-pdp__stack-total-now">Hoy: $49</span>
            <CheckoutButton slug={FEATURED_SLUG} size="lg" className="lp-pdp__stack-cta">
              Reclamar el Sistema completo
            </CheckoutButton>
          </div>
        </section>

        <div className="lp-pdp__back">
          <a className="forja-btn forja-btn--outline forja-btn--md" href="/">
            ← Volver a la Base
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
