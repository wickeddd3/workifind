/** @type {import('next').NextConfig} */

import NextBundleAnalyzer from "@next/bundle-analyzer";

// Applied to every response. These are broadly compatible (no CSP, which
// would need per-provider tuning for Clerk/Vercel Blob); add a CSP later once
// the allowed sources are pinned down.
const securityHeaders = [
  {
    // Force HTTPS for 2 years, including subdomains. Ignored on plain HTTP.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  // Emit a self-contained server bundle for the production Docker image.
  output: "standalone",
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  images: {
    remotePatterns: [
      {
        hostname: "gkmp2jrrgr3iczzg.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    cssChunking: "loose", // default
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
