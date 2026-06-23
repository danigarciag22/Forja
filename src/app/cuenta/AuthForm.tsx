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

/** Map common Supabase auth errors to clear Spanish messages. */
function authErrorMessage(err: unknown, mode: Mode): string {
  const raw = err instanceof Error ? err.message : "";
  const m = raw.toLowerCase();
  if (m.includes("email not confirmed"))
    return "Confirma tu email antes de entrar (revisa tu correo). Para pruebas, desactiva «Confirm email» en Supabase.";
  if (m.includes("invalid login credentials")) return "Email o contraseña incorrectos.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Ese email ya tiene cuenta. Usa «Ya tengo cuenta».";
  if (m.includes("password")) return raw; // e.g. password too short
  if (m.includes("provider is not enabled"))
    return "Ese proveedor no está habilitado en Supabase todavía.";
  if (m.includes("supabase no configurado") || m.includes("not configured"))
    return "Auth no configurada: faltan variables NEXT_PUBLIC_SUPABASE_* en este entorno.";
  return raw || (mode === "login" ? "No se pudo iniciar sesión." : "No se pudo crear la cuenta.");
}

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
    try {
      const supabase = getSupabaseBrowser();
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
        else setMessage("Cuenta creada. Revisa tu correo para confirmarla antes de entrar.");
      }
    } catch (err) {
      setError(authErrorMessage(err, mode));
    } finally {
      setBusy(false);
    }
  }

  // ---- Supabase OAuth (Google / Facebook / Apple). Redirects to the provider,
  // then back to /auth/callback which exchanges the code for a session.
  async function handleOAuth(provider: Provider, label: string) {
    setBusy(true);
    setError(null);
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) throw error;
      // success → browser redirects to the provider.
    } catch (err) {
      setError(`No se pudo conectar con ${label}: ${authErrorMessage(err, "login")}`);
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
