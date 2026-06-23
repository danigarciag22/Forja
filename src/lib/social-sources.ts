/**
 * Single source of truth for the social platforms shown in "Transmisiones
 * Recientes". `profileUrl` is the link a card uses when there is no live post
 * yet for that platform (e.g. Instagram before its n8n branch is enabled, or
 * any time the table is empty). Swap a platform = change it here, nothing else.
 *
 * Note: the n8n workflow holds the YouTube *channel id* (in its RSS node) and
 * the Instagram *handle* (in its fetch node) — those live in n8n, not here,
 * because the website never reads them. The website only needs the fallback
 * link below.
 */
export type Platform = "youtube" | "instagram";

export interface SocialSource {
  profileUrl: string;
}

export const SOCIAL_SOURCES: Record<Platform, SocialSource> = {
  // TODO: point at the real channel home, e.g. https://www.youtube.com/@forjagym
  youtube: { profileUrl: "https://www.youtube.com" },
  instagram: { profileUrl: "https://www.instagram.com/forjagym.official/" },
};
