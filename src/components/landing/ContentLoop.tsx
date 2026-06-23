import Image from "next/image";
import { ChapterTitle, PlayButton } from "@/components/ds";
import { getRecentPosts } from "@/lib/recent-posts-repo";
import { SOCIAL_SOURCES, type Platform } from "@/lib/social-sources";
import type { RecentPostRow } from "@/lib/supabase/database.types";

/**
 * Fixed layout template. Each slot is filled with the next live post of its
 * platform (newest first); when none exists yet, the slot renders the static
 * placeholder below linking to the platform profile. Classes/order match the
 * original comic-panel grid so the design is identical whether data is live.
 */
type Slot = { platform: Platform; kind: string; kicker: string; title: string; cls: string };

// platform+kind decides which live post fills each slot:
// youtube/video ×2 (big + 2nd), youtube/short ×2, instagram/reel, instagram/carrusel.
const SLOTS: Slot[] = [
  { platform: "youtube", kind: "video", kicker: "YouTube", title: "Día 1: Rutina de Empuje", cls: "lp-vignette--big" },
  { platform: "instagram", kind: "reel", kicker: "Reel", title: "Shots antiinflamatorios", cls: "" },
  { platform: "youtube", kind: "short", kicker: "Short", title: "Postura en 60s", cls: "" },
  { platform: "instagram", kind: "carrusel", kicker: "Carrusel", title: "Mi semana de volumen", cls: "lp-vignette--wide" },
  { platform: "youtube", kind: "video", kicker: "YouTube", title: "Lookmaxxing real", cls: "" },
  { platform: "youtube", kind: "short", kicker: "Short", title: "Mito: cardio en ayunas", cls: "" },
];

const FALLBACK_IMG = "/assets/titan-video.png";

type Vignette = { kicker: string; title: string; cls: string; href: string; img: string; imgAlt: string };

/** Map live posts onto the fixed slots (by platform+kind), falling back to placeholders. */
function buildVignettes(posts: RecentPostRow[]): Vignette[] {
  // One queue per platform:kind, consumed in display (position) order.
  const queues = new Map<string, RecentPostRow[]>();
  for (const p of posts) {
    if (!p.kind) continue;
    const key = `${p.platform}:${p.kind}`;
    const q = queues.get(key);
    if (q) q.push(p);
    else queues.set(key, [p]);
  }

  return SLOTS.map((slot) => {
    const post = queues.get(`${slot.platform}:${slot.kind}`)?.shift();
    if (post) {
      return {
        kicker: post.kicker,
        title: post.title,
        cls: slot.cls,
        href: post.permalink,
        img: post.thumbnail_url ?? FALLBACK_IMG,
        imgAlt: post.title,
      };
    }
    return {
      kicker: slot.kicker,
      title: slot.title,
      cls: slot.cls,
      href: SOCIAL_SOURCES[slot.platform].profileUrl,
      img: FALLBACK_IMG,
      imgAlt: "",
    };
  });
}

/** "Transmisiones Recientes": comic-panel grid of mixed vignettes with play overlays. */
export async function ContentLoop() {
  const vignettes = buildVignettes(await getRecentPosts());

  return (
    <section className="lp-section lp-section--alt" id="comic">
      <div className="lp-container">
        <div className="lp-loop__head">
          <ChapterTitle align="center" comic eyebrow="En vivo · 24/7">
            Transmisiones Recientes
          </ChapterTitle>
        </div>

        <div className="lp-loop__grid">
          {vignettes.map((v, i) => (
            <a
              key={i}
              className={"lp-vignette " + v.cls}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="lp-img-mono"
                src={v.img}
                alt={v.imgAlt}
                aria-hidden={v.imgAlt === "" ? "true" : undefined}
                fill
                sizes="(max-width: 900px) 50vw, 33vw"
              />
              <span className="lp-vignette__veil" aria-hidden="true" />
              <span className="lp-vignette__play">
                <PlayButton size={i === 0 ? 88 : 54} aria-label={"Reproducir: " + v.title} />
              </span>
              <span className="lp-vignette__meta">
                <span className="lp-vignette__kicker">{v.kicker}</span>
                <span className="lp-vignette__title">{v.title}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
