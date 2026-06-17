"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ds";

type CheckoutButtonProps = {
  slug: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  className?: string;
};

/** Starts a Stripe Checkout session for the given product slug, then redirects. */
export function CheckoutButton({
  slug,
  children,
  variant = "primary",
  size = "lg",
  full = false,
  className = "",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function go() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) throw new Error(`checkout ${res.status}`);
      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error("missing checkout url");
      window.location.href = data.url;
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      full={full}
      className={className}
      onClick={go}
      disabled={loading}
    >
      {loading ? "Procesando…" : error ? "Reintentar pago" : children}
    </Button>
  );
}
