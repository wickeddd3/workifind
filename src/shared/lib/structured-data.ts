import { SITE_NAME, SITE_URL } from "@/shared/config/site";

// Only site-level schema lives here. Builders that serialize a domain record
// belong to that record's entity — see `entities/job/lib/structured-data.ts`
// and `entities/employer/lib/structured-data.ts`.

// schema.org/WebSite with SearchAction — enables the sitelinks search box.
export function buildWebsiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/jobs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
