import type { MetadataRoute } from "next";

import { SITE_URL } from "@/shared/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/setup",
        "/sign-in",
        "/sign-up",
        "/employer/",
        "/applicant/",
        "/professionals/", // candidate profiles are kept out of the index
        "/companies/search",
        "/professionals/search",
        "/jobs/*/apply",
        "/jobs/*/submitted",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
