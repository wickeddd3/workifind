/** @type {import('next').NextConfig} */

import NextBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  images: {
    remotePatterns: [
      {
        hostname: "gkmp2jrrgr3iczzg.public.blob.vercel-storage.com",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    cssChunking: "loose", // default
  },
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
