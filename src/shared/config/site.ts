// Central site configuration reused across metadata, robots, sitemap, and
// manifest. Override the URL per-environment with NEXT_PUBLIC_SITE_URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://workifind.vercel.app";

export const SITE_NAME = "workifind";

export const SITE_DESCRIPTION =
  "workifind connects talent with opportunity. Search thousands of jobs, discover great companies, and find your next role.";
