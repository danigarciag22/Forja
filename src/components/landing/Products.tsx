"use client";

import { useEffect, useRef } from "react";
import { ChapterTitle, ComicPanel, Button, Badge } from "@/components/ds";
import { CAROUSEL_BOOKS } from "@/lib/products";

/**
 * "Conocimiento Táctico": an infinite, user-driven comic-strip carousel of
 * e-book covers. No autoplay. Triple-buffered and silently repositioned one
 * copy-width at the edges (wrap distance measured between identical cards, so
 * no drift) for a seamless never-ending loop.
 */
export function Products() {
  const books = CAROUSEL_BOOKS;
  const loop = books.concat(books, books);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const unit = () => {
      const items = el.querySelectorAll<HTMLElement>(".lp-carousel__item");
      return items.length > books.length
        ? items[books.length].offsetLeft - items[0].offsetLeft
        : 0;
    };
    let tries = 0;
    const center = () => {
      const u = unit();
      if (u > 0) {
        el.scrollLeft = u;
      } else if (tries++ < 40) {
        raf = requestAnimationFrame(center);
      }
    };
    raf = requestAnimationFrame(center);
    const onScroll = () => {
      const u = unit();
      if (!u) return;
      if (el.scrollLeft < u * 0.5) el.scrollLeft += u;
      else if (el.scrollLeft > u * 1.5) el.scrollLeft -= u;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      const u = unit();
      if (u) el.scrollLeft = u;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [books.length]);

  const step = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(".lp-carousel__item");
    const cardW = first ? first.getBoundingClientRect().width + 24 : 290;
    el.scrollBy({ left: dir * cardW, behavior: "smooth" });
  };

  return (
    <section className="lp-section" id="arsenal">
      <div className="lp-container">
        <div className="lp-arsenal__head">
          <ChapterTitle eyebrow="Cap. 02 — Arsenal">Conocimiento Táctico</ChapterTitle>
          <p
            style={{
              fontFamily: "var(--font-body)",
              maxWidth: "34ch",
              margin: 0,
              fontSize: ".95rem",
            }}
          >
            Una tira interminable de ediciones. Desliza para explorar — el catálogo
            nunca termina.
          </p>
        </div>
      </div>

      <div
        className="lp-carousel"
        role="region"
        aria-label="Catálogo de e-books — desliza para explorar"
      >
        <button
          type="button"
          className="lp-carousel__arrow lp-carousel__arrow--prev"
          onClick={() => step(-1)}
          aria-label="Anterior"
        >
          <span className="lp-chev lp-chev--l" aria-hidden="true" />
        </button>

        <div className="lp-carousel__track" ref={trackRef}>
          {loop.map((b, i) => (
            <ComicPanel
              key={i}
              weight="heavy"
              className="lp-carousel__item"
              aria-hidden={i >= books.length ? "true" : undefined}
            >
              <article className="lp-cover">
                <div className="lp-cover__art">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="lp-img-mono"
                    src="/assets/titan-cover.png"
                    alt=""
                    aria-hidden="true"
                    width={1408}
                    height={3008}
                    loading="lazy"
                  />
                  <div className="lp-cover__issue">
                    {b.best ? (
                      <Badge solid>Más vendido</Badge>
                    ) : (
                      <span className="lp-cover__chip">{b.kicker}</span>
                    )}
                  </div>
                </div>
                <div className="lp-cover__body">
                  <h3 className="lp-cover__title">{b.title}</h3>
                  <div className="lp-cover__foot">
                    <span className="lp-cover__price">{b.price}</span>
                    <Button variant="outline" size="md" as="a" href="/producto">
                      Adquirir
                    </Button>
                  </div>
                </div>
              </article>
            </ComicPanel>
          ))}
        </div>

        <button
          type="button"
          className="lp-carousel__arrow lp-carousel__arrow--next"
          onClick={() => step(1)}
          aria-label="Siguiente"
        >
          <span className="lp-chev lp-chev--r" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
