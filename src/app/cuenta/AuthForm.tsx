"use client";

import { useState } from "react";
import type { Provider } from "@supabase/supabase-js";
import { Button, Input } from "@/components/ds";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type Mode = "register" | "login";

// Apple stays disabled until the Apple Developer account + Services ID exist.
// Flip `enabled: true` once configured in the Supabase dashboard.
const SOCIALS: { id: Provider; label: string; enabled: boolean }[] = [
  { id: "google", label: "Google", enabled: true },
  { id: "facebook", label: "Facebook", enabled: true },
  { id: "apple", label: "Apple", enabled: false },
];

export function AuthForm({ next }: { next: string }) {
  const [mode, setMode] = useState<Mode>("register");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ---- PRESERVED: Supabase email/password auth.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    const supabase = getSupabaseBrowser();
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = next;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { alias: alias.trim() || undefined },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (error) throw error;
        if (data.session) window.location.href = next;
        else setMessage("Revisa tu correo para confirmar la cuenta.");
      }
    } catch {
      setError(
        mode === "login"
          ? "Credenciales incorrectas."
          : "No se pudo crear la cuenta. ¿Ya existe?",
      );
    } finally {
      setBusy(false);
    }
  }

  // ---- Supabase OAuth (Google / Facebook / Apple). Redirects to the provider,
  // then back to /auth/callback which exchanges the code for a session.
  async function handleOAuth(provider: Provider, label: string) {
    setBusy(true);
    setError(null);
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setError(`No se pudo conectar con ${label}.`);
      setBusy(false);
    }
  }

  const isRegister = mode === "register";

  return (
    <div className="lp-authcard">
      <div className="lp-authcard__tabs" role="tablist" aria-label="Crear cuenta o entrar">
        <button
          type="button"
          role="tab"
          aria-selected={isRegister}
          className={`lp-authcard__tab${isRegister ? " is-active" : ""}`}
          onClick={() => setMode("register")}
        >
          Crear cuenta
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isRegister}
          className={`lp-authcard__tab${!isRegister ? " is-active" : ""}`}
          onClick={() => setMode("login")}
        >
          Ya tengo cuenta
        </button>
      </div>

      <form className="lp-authcard__body" onSubmit={handleSubmit}>
        <div className="lp-authcard__socials">
          {SOCIALS.map((s) => (
            <Button
              key={s.id}
              variant="outline"
              size="lg"
              full
              type="button"
              disabled={busy || !s.enabled}
              onClick={() => handleOAuth(s.id, s.label)}
            >
              {s.enabled ? `Continuar con ${s.label}` : `${s.label} · pronto`}
            </Button>
          ))}
        </div>
        <p className="lp-authcard__or">— o con email —</p>

        {isRegister ? (
          <Input
            id="auth-alias"
            label="Alias de recluta"
            type="text"
            autoComplete="nickname"
            placeholder="El Titán Jr."
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        ) : null}
        <Input
          id="auth-email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          placeholder="recluta@forja.gym"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="auth-password"
          label="Contraseña"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          required
          minLength={8}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="lp-authcard__submit" disabled={busy}>
          {busy ? "Procesando…" : isRegister ? "Crear cuenta ▸▸" : "Acceder ▸▸"}
        </button>
        <p className="lp-authcard__fineprint">
          Al continuar aceptas el Protocolo y la Resistencia.
        </p>

        {message ? <p className="lp-authcard__msg" role="status">{message}</p> : null}
        {error ? <p className="lp-authcard__error" role="alert">{error}</p> : null}
      </form>
    </div>
  );
}
