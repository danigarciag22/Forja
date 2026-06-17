export const CULT_EVENT = "forja:open-cult";

/** Open the "Únete al Culto" lead-magnet modal from anywhere (client only). */
export function openCult() {
  if (typeof document !== "undefined") {
    document.dispatchEvent(new CustomEvent(CULT_EVENT));
  }
}
