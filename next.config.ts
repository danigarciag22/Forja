import type { NextConfig } from "next";

/**
 * Static security headers applied to every response. CSP is NOT here — it needs
 * a per-request nonce, so it lives in middleware.ts.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Remote thumbnails for "Transmisiones Recientes" (filled by the n8n
    // workflow). YouTube thumbs are stable & hotlinked; Instagram media URLs
    // expire, so that branch re-hosts them in Supabase Storage (public bucket).
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      {
        protocol: "https",
        hostname: "yczbxzpkhgexrhbtwobn.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
