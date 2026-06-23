import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

/** Browser Supabase client (cookie-based session). Use only in Client Components. */
export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "Supabase no configurado: define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  return createBrowserClient<Database>(url, anon);
}
