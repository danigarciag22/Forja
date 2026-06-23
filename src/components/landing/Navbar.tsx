"use client";

import { SpeechBubble } from "@/components/ds";
import { openCult } from "@/lib/cult";

/** Sticky bar: bold wordmark, links, speech-bubble "¡Únete al Culto!" CTA. */
export function Navbar() {
  return (
    <header className="lp-nav">
      <a className="lp-logo" href="/">
        FORJA<span className="lp-logo__dot" />
      </a>
      <nav className="lp-links">
        <a href="/#apps">Apps</a>
        <a href="/precios">Planes</a>
        <a href="/cuenta">Cuenta</a>
      </nav>
      <div className="lp-nav__cta">
        <SpeechBubble inverted tilt={-2} onClick={openCult}>
          ¡Únete al Culto!
        </SpeechBubble>
      </div>
    </header>
  );
}
