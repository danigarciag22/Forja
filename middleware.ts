import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Content-Security-Policy with a per-request nonce.
 *
 * Why middleware (not next.config headers): a nonce must be fresh per request,
 * which static headers() can't do. Next.js reads the `Content-Security-Policy`
 * we set on the *request* headers and stamps the same nonce onto its own inline
 * bootstrap/hydration scripts; the JSON-LD scripts read it back via `x-nonce`.
 *
 * THEME_SCRIPT_HASH covers the tiny anti-FOUC <script> rendered by ForjaShell
 * (a Client Component that can't read the per-request nonce). Keep it in sync
 * with THEME_INIT in src/components/landing/ForjaShell.tsx — if the script bytes
 * change, recompute the hash or the theme init is silently blocked (FOUC, no
 * other breakage).
 */
const THEME_SCRIPT_HASH = "sha256-KcoSDHFnsrUmJ3qhxNF6e3mOTNpJbqUEjIq6RNLkRGU=";

export async function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV !== "production";
  const nonce = btoa(crypto.randomUUID());

  // Dev needs unsafe-inline/eval for React Fast Refresh + HMR. Prod is strict:
  // nonce for Next's scripts, hash for the static theme-init script.
  const scriptSrc = isDev
    ? `'self' 'unsafe-inline' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' '${THEME_SCRIPT_HASH}'`;

  // Supabase Auth fetches against the project origin (login/refresh/OAuth).
  const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
    : "";

  const csp = [
    `default-src 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `script-src ${scriptSrc}`,
    // Inline style attributes (React style={}) + Google Fonts stylesheet.
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' blob: data: https:`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' ${supabaseOrigin}`.trim(),
    `upgrade-insecure-requests`,
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  let response = NextResponse.next({ request: { headers: requestHeaders } });

  // Refresh the Supabase session cookies so Server Components/route handlers
  // see a current session. Reads request cookies, writes refreshed ones to the
  // response while preserving the CSP/nonce request headers above.
  if (supabaseOrigin) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({ request: { headers: requestHeaders } });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    await supabase.auth.getUser();
  }

  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Run on page routes only — skip API, static assets, and generated images.
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|icon|opengraph-image|robots.txt|sitemap.xml).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
