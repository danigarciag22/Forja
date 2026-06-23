import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";

/** Safe same-origin relative path, defaulting to /precios. */
function safeNext(value: string | null): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/precios";
}

/** OAuth (Google) redirect target — exchanges the code for a session. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));

  if (code) {
    const supabase = await getSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/callback] exchange failed", error);
      return NextResponse.redirect(new URL("/cuenta?error=auth", url.origin));
    }
  }
  return NextResponse.redirect(new URL(next, url.origin));
}
