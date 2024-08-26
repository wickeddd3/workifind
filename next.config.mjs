/** @type {import('next').NextConfig} */
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
    ],
  },
};

export default nextConfig;
