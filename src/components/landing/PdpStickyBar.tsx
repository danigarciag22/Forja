"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckoutButton } from "./CheckoutButton";

type Props = {
  slug: string;
  title: string;
  priceLabel: string;
  anchorLabel: string;
  visible: boolean;
};

/**
 * Persistent buy bar. Portaled to <body> so its `position: fixed` is relative to
 * the viewport — inside the dark-mode `.lp-invert` (which has a `filter`) a fixed
 * element would be trapped by the filter's containing block. Rendered as a
 * self-contained black bar that reads correctly over both light and dark pages.
 */
export function PdpStickyBar({ slug, title, priceLabel, anchorLabel, visible }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className={"lp-pdp__sticky" + (visible ? " is-visible" : "")} aria-hidden={!visible}>
      <div className="lp-pdp__sticky-inner">
        <div className="lp-pdp__sticky-meta">
          <span className="lp-pdp__sticky-title">{title}</span>
          <span className="lp-pdp__sticky-price">
            <s>{anchorLabel}</s> {priceLabel}
          </span>
        </div>
        <CheckoutButton slug={slug} variant="outline" size="md" className="lp-pdp__sticky-cta">
          Añadir al Arsenal
        </CheckoutButton>
      </div>
    </div>,
    document.body,
  );
}
