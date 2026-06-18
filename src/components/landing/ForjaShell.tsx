"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CultModal } from "@/components/ds";
import { CULT_EVENT } from "@/lib/cult";
import { ModeToggle } from "./ModeToggle";

const STORAGE_KEY = "forja-mode";

/**
 * Anti-FOUC: runs before hydration to apply the persisted theme on the wrapper
 * so dark-mode users don't flash light first. Must stay byte-identical to the
 * sha256 hash in middleware.ts (THEME_SCRIPT_HASH) and use the STORAGE_KEY
 * literal — if you change it, recompute the hash or CSP silently blocks it.
 */
const THEME_INIT = `try{if(localStorage.getItem("forja-mode")==="dark"){var e=document.getElementById("forja-shell");if(e)e.className="lp-invert is-dark"}}catch(e){}`;

function readInitialDark(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dark";
  } catch {
    return false;
  }
}

/**
 * Global comic shell. Holds light/dark state (Yin-Yang inversion via the
 * `.lp-invert`/`is-dark` wrapper, persisted to localStorage), plus the
 * floating ModeToggle and the CultModal — both kept OUTSIDE the inverted
 * layer so they never flip. Wraps every routed page.
 */
export function ForjaShell({ children }: { children: ReactNode }) {
  // Lazy-init from localStorage so the hydration render already matches the
  // class the THEME_INIT script set pre-paint (no flip after hydration).
  const [dark, setDark] = useState<boolean>(readInitialDark);
  const [cultOpen, setCultOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      /* storage unavailable — ignore */
    }
  }, [dark]);

  useEffect(() => {
    const open = () => setCultOpen(true);
    document.addEventListener(CULT_EVENT, open);
    return () => document.removeEventListener(CULT_EVENT, open);
  }, []);

  return (
    <>
      <div
        id="forja-shell"
        className={"lp-invert" + (dark ? " is-dark" : "")}
        suppressHydrationWarning
      >
        {children}
      </div>
      <ModeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
      <CultModal open={cultOpen} onClose={() => setCultOpen(false)} code="CULTO10" />
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
    </>
  );
}
