"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Badge, ComicPanel } from "@/components/ds";
import type { ProductContent } from "@/content/products/types";
import { CheckoutButton } from "./CheckoutButton";
import { PdpStickyBar } from "./PdpStickyBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const moneyRound = (cents: number) => `$${Math.round(cents / 100)}`;

function discountPct(price: number, anchor: number) {
  if (anchor <= 0 || price >= anchor) return 0;
  return Math.round((1 - price / anchor) * 100);
}

/** Product-detail / buy page. Fully driven by a `ProductContent` (per-book file). */
export function ProductPage({ content }: { content: ProductContent }) {
  const [variant, setVariant] = useState(content.variants[0]?.id ?? "");
  const [thumb, setThumb] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const main = content.gallery[thumb] ?? content.gallery[0];
  const priceLabel = money(content.priceCents);
  const anchorLabel = money(content.anchorCents);
  const off = discountPct(content.priceCents, content.anchorCents);
  const reclutas = content.rating.count.toLocaleString("es");

  // Sticky buy-bar appears once the primary CTA scrolls out of view.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
            <b>{content.shortTitle}</b>
          </nav>
        </div>

        {/* ---------- BUY BOX ---------- */}
        <section className="lp-container lp-pdp__buybox">
          <div className="lp-pdp__gallery">
            <ComicPanel weight="frame" className="lp-pdp__hero-frame" caption="Edición física">
              <div className="lp-pdp__hero-img">
                <Image
                  className="lp-img-mono"
                  src={main.src}
                  alt={main.alt}
                  fill
                  sizes="(max-width: 900px) 92vw, 45vw"
                  priority
                />
              </div>
            </ComicPanel>
            <div className="lp-pdp__thumbs">
              {content.gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  className={"lp-pdp__thumb" + (i === thumb ? " is-active" : "")}
                  onClick={() => setThumb(i)}
                  aria-label={"Vista " + (i + 1)}
                  aria-pressed={i === thumb}
                >
                  <Image
                    className="lp-img-mono"
                    src={g.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 900px) 22vw, 110px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lp-pdp__info">
            <span className="lp-pdp__eyebrow">{content.eyebrow}</span>
            <h1 className="lp-pdp__title">{content.title}</h1>

            <div className="lp-pdp__rating">
              <span className="lp-stars" aria-hidden="true">★★★★★</span>
              <span className="lp-pdp__rating-txt">
                {content.rating.value.toFixed(1)} · {reclutas} reclutas iniciados
              </span>
            </div>

            {content.variants.length > 1 && (
              <fieldset className="lp-pdp__variants">
                <legend className="lp-pdp__label">Elige tu protocolo</legend>
                <div className="lp-pdp__variant-grid">
                  {content.variants.map((v) => (
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
            )}

            <div className="lp-pdp__pricing">
              <span className="lp-pdp__price-old">{anchorLabel}</span>
              <span className="lp-pdp__price-now">{priceLabel}</span>
              <span className="lp-pdp__price-cur">{content.currency.toUpperCase()}</span>
              {off > 0 && (
                <Badge shape="burst" solid tilt={-8} className="lp-pdp__save">
                  -{off}%
                </Badge>
              )}
            </div>

            {content.urgency && (
              <div className="lp-pdp__urgency">
                <span className="lp-pdp__urgency-bolt" aria-hidden="true">⚡</span>
                {content.urgency}
              </div>
            )}

            <ul className="lp-pdp__benefits">
              {content.benefits.map((b, i) => (
                <li key={i}>
                  <span className="lp-pdp__check" aria-hidden="true">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            <div ref={ctaRef}>
              <CheckoutButton slug={content.slug} full size="lg" className="lp-pdp__cta">
                Añadir al Arsenal — {priceLabel}
              </CheckoutButton>
            </div>

            <ul className="lp-pdp__trustbadges" aria-label="Garantías de compra">
              <li><span className="lp-pdp__tb-ico" aria-hidden="true">🔒</span>Pago seguro</li>
              <li><span className="lp-pdp__tb-ico" aria-hidden="true">⬇</span>Descarga inmediata</li>
              <li><span className="lp-pdp__tb-ico" aria-hidden="true">∞</span>Acceso de por vida</li>
              <li><span className="lp-pdp__tb-ico" aria-hidden="true">↺</span>Garantía {content.guarantee.days} días</li>
            </ul>

            <div className="lp-pdp__trust">
              <Badge shape="burst" solid tilt={5} className="lp-pdp__guarantee">
                {content.guarantee.days}<br />DÍAS
              </Badge>
              <div className="lp-pdp__trust-copy">
                <span className="lp-pdp__trust-head">Garantía Táctica</span>
                <span className="lp-pdp__trust-txt">
                  Pago seguro · Descarga inmediata · Acceso de por vida
                </span>
              </div>
            </div>

            <div className="lp-pdp__testimonials">
              {content.testimonials.slice(0, 2).map((t, i) => (
                <ComicPanel key={i} weight="default" padded tilt={i === 0 ? -1 : 1} className="lp-pdp__testi">
                  <span className="lp-stars" aria-hidden="true">★★★★★</span>
                  <p className="lp-pdp__testi-q">&quot;{t.quote}&quot;</p>
                  <span className="lp-pdp__testi-n">— {t.name}</span>
                </ComicPanel>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- ¿QUÉ INCLUYE? + FORMATO ---------- */}
        <div className="lp-zigzag" role="separator" aria-hidden="true" />
        <section className="lp-container lp-pdp__includes">
          <header className="lp-pdp__stack-head">
            <span className="lp-pdp__eyebrow">El Dossier</span>
            <h2 className="lp-pdp__stack-title">¿Qué Incluye?</h2>
          </header>
          <div className="lp-pdp__includes-grid">
            <ComicPanel weight="heavy" padded className="lp-pdp__format">
              <span className="lp-pdp__value-n">Formato &amp; Entrega</span>
              <div className="lp-pdp__format-chips">
                {content.format.formats.map((f) => (
                  <span key={f} className="lp-pdp__chip">{f}</span>
                ))}
                <span className="lp-pdp__chip">{content.format.pages} págs</span>
              </div>
              <ul className="lp-pdp__format-list">
                {content.format.delivery.map((d, i) => (
                  <li key={i}>
                    <span className="lp-pdp__check" aria-hidden="true">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </ComicPanel>

            <ComicPanel weight="heavy" padded className="lp-pdp__toc">
              <span className="lp-pdp__value-n">Índice del Sistema</span>
              <ol className="lp-pdp__toc-list">
                {content.chapters.map((c) => (
                  <li key={c.n}>
                    <span className="lp-pdp__toc-n">{c.n}</span>
                    <span className="lp-pdp__toc-t">{c.title}</span>
                  </li>
                ))}
              </ol>
            </ComicPanel>
          </div>
        </section>

        {/* ---------- VALUE STACKING ---------- */}
        <div className="lp-zigzag" role="separator" aria-hidden="true" />
        <section className="lp-container lp-pdp__stack-wrap">
          <header className="lp-pdp__stack-head">
            <span className="lp-pdp__eyebrow">Lo que recibes</span>
            <h2 className="lp-pdp__stack-title">Desglose del Sistema</h2>
          </header>

          <div className="lp-pdp__stack-grid">
            <ComicPanel weight="heavy" padded tilt={-1} className="lp-pdp__value">
              <span className="lp-pdp__value-n">{content.valueStack[0].n}</span>
              <h3 className="lp-pdp__value-t">{content.valueStack[0].title}</h3>
              <div className="lp-pdp__value-foot">
                <span className="lp-pdp__value-was">{content.valueStack[0].was}</span>
                <Badge solid>{content.valueStack[0].tag}</Badge>
              </div>
            </ComicPanel>

            <div className="lp-pdp__phone">
              <ComicPanel weight="frame" className="lp-pdp__phone-frame" caption="El Sistema">
                <div className="lp-pdp__phone-img">
                  <Image
                    className="lp-img-mono"
                    src={content.gallery[1]?.src ?? content.gallery[0].src}
                    alt="Vista del sistema FORJA"
                    fill
                    sizes="(max-width: 900px) 60vw, 22vw"
                  />
                </div>
              </ComicPanel>
            </div>

            <div className="lp-pdp__value-col">
              {content.valueStack.slice(1, 3).map((s, i) => (
                <ComicPanel key={i} weight="heavy" padded tilt={i === 0 ? 1 : -1} className="lp-pdp__value">
                  <span className="lp-pdp__value-n">{s.n}</span>
                  <h3 className="lp-pdp__value-t">{s.title}</h3>
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
            <span className="lp-pdp__stack-total-was">{content.valueTotalWas}</span>
            <span className="lp-pdp__stack-total-now">Hoy: {moneyRound(content.priceCents)}</span>
            <CheckoutButton slug={content.slug} size="lg" className="lp-pdp__stack-cta">
              Reclamar el Sistema completo
            </CheckoutButton>
          </div>
        </section>

        {/* ---------- SOCIAL PROOF ---------- */}
        <section className="lp-container lp-pdp__proof">
          <header className="lp-pdp__stack-head">
            <span className="lp-pdp__eyebrow">El Culto habla</span>
            <h2 className="lp-pdp__stack-title">
              {content.rating.value.toFixed(1)} ★ · {reclutas} Reclutas
            </h2>
          </header>
          <div className="lp-pdp__proof-grid">
            {content.testimonials.map((t, i) => (
              <ComicPanel key={i} weight="default" padded tilt={i % 2 === 0 ? -1 : 1} className="lp-pdp__testi">
                <span className="lp-stars" aria-hidden="true">★★★★★</span>
                <p className="lp-pdp__testi-q">&quot;{t.quote}&quot;</p>
                <span className="lp-pdp__testi-n">— {t.name}</span>
              </ComicPanel>
            ))}
          </div>
        </section>

        {/* ---------- GUARANTEE (risk reversal) ---------- */}
        <section className="lp-container lp-pdp__guarantee-wrap">
          <ComicPanel weight="frame" padded className="lp-pdp__guarantee-box">
            <Badge shape="burst" solid tilt={-6} className="lp-pdp__guarantee-burst">
              {content.guarantee.days}<br />DÍAS
            </Badge>
            <div className="lp-pdp__guarantee-copy">
              <h3 className="lp-pdp__guarantee-title">{content.guarantee.title}</h3>
              <p className="lp-pdp__guarantee-txt">{content.guarantee.copy}</p>
            </div>
          </ComicPanel>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="lp-container lp-pdp__faq">
          <header className="lp-pdp__stack-head">
            <span className="lp-pdp__eyebrow">Archivo de Dudas</span>
            <h2 className="lp-pdp__stack-title">Preguntas Frecuentes</h2>
          </header>
          <div className="lp-pdp__faq-list">
            {content.faq.map((f, i) => (
              <details key={i} className="lp-pdp__faq-item">
                <summary className="lp-pdp__faq-q">{f.q}</summary>
                <div className="lp-pdp__faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="lp-pdp__back">
          <a className="forja-btn forja-btn--outline forja-btn--md" href="/">
            ← Volver a la Base
          </a>
        </div>
      </main>

      <Footer />

      <PdpStickyBar
        slug={content.slug}
        title={content.shortTitle}
        priceLabel={priceLabel}
        anchorLabel={anchorLabel}
        visible={showSticky}
      />
    </div>
  );
}
