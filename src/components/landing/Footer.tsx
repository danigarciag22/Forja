"use client";

import { useState } from "react";
import { Input, Button } from "@/components/ds";

const socials = [
  { slug: "youtube", label: "YouTube", url: "https://www.youtube.com" },
  { slug: "facebook", label: "Facebook", url: "https://www.facebook.com" },
  { slug: "instagram", label: "Instagram", url: "https://www.instagram.com/forjagym.official/" },
  { slug: "threads", label: "Threads", url: "https://www.threads.net" },
  { slug: "tiktok", label: "TikTok", url: "https://www.tiktok.com" },
];

const legal = [
  { href: "/terminos", label: "Términos de Servicio" },
  { href: "/privacidad", label: "Política de Privacidad" },
  { href: "/reembolsos", label: "Política de Reembolsos" },
];

/** Black newsletter capture + legal-links row + minimal social icons. */
export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="lp-footer" id="comunidad">
      <div className="lp-footer__top">
        <div>
          <h2 className="lp-footer__pitch-title">
            Únete a la<br />resistencia.
          </h2>
          <p className="lp-footer__pitch-sub">
            Suscríbete y recibe gratis la guía de arranque «Primeros 30 días en la
            Forja».
          </p>
        </div>
        <form className="lp-news" onSubmit={(e) => e.preventDefault()}>
          <Input
            onInk
            id="footer-email"
            label="Tu email"
            type="email"
            placeholder="recluta@forja.gym"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="outline" size="lg">
            Reclutarme
          </Button>
        </form>
      </div>

      <nav className="lp-footer__legalrow" aria-label="Enlaces legales">
        {legal.map((l) => (
          <a key={l.href} className="lp-footer__legallink" href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="lp-footer__bottom">
        <span className="lp-footer__logo">FORJA</span>
        <nav className="lp-social" aria-label="Redes sociales">
          {socials.map((s) => (
            <a
              key={s.slug}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={"https://cdn.simpleicons.org/" + s.slug + "/ffffff"}
                alt={s.label}
                width={22}
                height={22}
              />
            </a>
          ))}
        </nav>
        <span className="lp-footer__legal">
          © 2026 FORJA · Forja tu físico, domina el sistema.
        </span>
      </div>
    </footer>
  );
}
