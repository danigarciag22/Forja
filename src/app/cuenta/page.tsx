import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { getSupabaseServer } from "@/lib/supabase/server";
import { AuthForm } from "./AuthForm";
import { AccountPanel } from "./AccountPanel";

export const metadata: Metadata = {
  title: "Mi cuenta · FORJA",
  description: "Inicia sesión o crea tu cuenta FORJA para gestionar tu suscripción premium.",
  robots: { index: false },
};

function safeNext(value: string | string[] | undefined): string {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/precios";
}

export default async function CuentaPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const sp = await searchParams;
  const next = safeNext(sp.next);

  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let hasSubscription = false;
  if (user) {
    const { data } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();
    hasSubscription = Boolean(data);
  }

  return (
    <div className="lp">
      <Navbar />
      <main>
        <div className="lp-authpage">
          <div className="lp-authpage__head">
            <span className="lp-chip lp-chip--solid">
              {user ? "Cuartel" : "Iniciación"}
            </span>
            <h1 className="lp-authpage__title">
              {user ? "Tu cuenta" : "Únete a la Resistencia"}
            </h1>
            <p className="lp-authpage__sub">
              {user
                ? "Gestiona tu suscripción y acceso premium."
                : "Necesitas una cuenta antes de desbloquear cualquier plan."}
            </p>
          </div>
          {user ? (
            <AccountPanel email={user.email ?? ""} hasSubscription={hasSubscription} />
          ) : (
            <AuthForm next={next} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
