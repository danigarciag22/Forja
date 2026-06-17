"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CultModal } from "@/components/ds";
import { CULT_EVENT } from "@/lib/cult";
import { ModeToggle } from "./ModeToggle";

const STORAGE_KEY = "forja-mode";

/**
 * Global comic shell. Holds light/dark state (Yin-Yang inversion via the
 * `.lp-invert`/`is-dark` wrapper, persisted to localStorage), plus the
 * floating ModeToggle and the CultModal — both kept OUTSIDE the inverted
 * layer so they never flip. Wraps every routed page.
 */
export function ForjaShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [cultOpen, setCultOpen] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      setDark(localStorage.getItem(STORAGE_KEY) === "dark");
    } catch {
      /* storage unavailable — stay light */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);

  useEffect(() => {
    const open = () => setCultOpen(true);
    document.addEventListener(CULT_EVENT, open);
    return () => document.removeEventListener(CULT_EVENT, open);
  }, []);

  return (
    <>
      <div className={"lp-invert" + (dark ? " is-dark" : "")}>{children}</div>
      <ModeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
      <CultModal open={cultOpen} onClose={() => setCultOpen(false)} code="CULTO10" />
    </>
  );
}
