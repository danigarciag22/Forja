import { ChapterTitle, PlayButton } from "@/components/ds";

type Tile = { kicker: string; title: string; cls: string; href: string };

// Placeholder destinations → real platform homes until per-video links exist.
const YT = "https://www.youtube.com";
const IG = "https://www.instagram.com/forjagym.official/";

const tiles: Tile[] = [
  { kicker: "YouTube · Push Day", title: "Día 1: Rutina de Empuje", cls: "lp-vignette--big", href: YT },
  { kicker: "Reel", title: "Shots antiinflamatorios", cls: "", href: IG },
  { kicker: "Short", title: "Postura en 60s", cls: "", href: YT },
  { kicker: "Carrusel", title: "Mi semana de volumen", cls: "lp-vignette--wide", href: IG },
  { kicker: "YouTube", title: "Lookmaxxing real", cls: "", href: YT },
  { kicker: "Short", title: "Mito: cardio en ayunas", cls: "", href: YT },
];

/** "Transmisiones Recientes": comic-panel grid of mixed vignettes with play overlays. */
export function ContentLoop() {
  return (
    <section className="lp-section lp-section--alt" id="comic">
      <div className="lp-container">
        <div className="lp-loop__head">
          <ChapterTitle align="center" comic eyebrow="En vivo · 24/7">
            Transmisiones Recientes
          </ChapterTitle>
        </div>

        <div className="lp-loop__grid">
          {tiles.map((t, i) => (
            <a
              key={i}
              className={"lp-vignette " + t.cls}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="lp-img-mono"
                src="/assets/titan-video.png"
                alt=""
                aria-hidden="true"
                width={2752}
                height={1536}
                loading="lazy"
              />
              <span className="lp-vignette__veil" aria-hidden="true" />
              <span className="lp-vignette__play">
                <PlayButton size={i === 0 ? 88 : 54} aria-label={"Reproducir: " + t.title} />
              </span>
              <span className="lp-vignette__meta">
                <span className="lp-vignette__kicker">{t.kicker}</span>
                <span className="lp-vignette__title">{t.title}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
