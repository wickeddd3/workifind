import { SITE_URL } from "@/shared/config/site";

import type { Employer } from "../model/types";

// schema.org/Organization — company identity for company detail pages.
export function buildOrganizationSchema(
  employer: Employer,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: employer.companyName,
    url: `${SITE_URL}/companies/${employer.slug}`,
    ...(employer.companyLogoUrl ? { logo: employer.companyLogoUrl } : {}),
    ...(employer.about ? { description: employer.about } : {}),
    ...(employer.location
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: employer.location,
          },
        }
      : {}),
  };
}
