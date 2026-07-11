import type { Employer } from "@/entities/employer/model/types";
import type { Job } from "@/entities/job/model/types";
import { SITE_NAME, SITE_URL } from "@/shared/config/site";

// Maps the app's employment-type labels onto schema.org's JobPosting enum.
const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACTOR",
  Temporary: "TEMPORARY",
  Internship: "INTERN",
  Volunteer: "VOLUNTEER",
};

const toISO = (date: Date | string) =>
  date instanceof Date ? date.toISOString() : new Date(date).toISOString();

// schema.org/JobPosting — makes listings eligible for Google Jobs rich results.
export function buildJobPostingSchema(job: Job): Record<string, unknown> {
  const { employer } = job;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || job.title,
    datePosted: toISO(job.createdAt),
    employmentType: EMPLOYMENT_TYPE_MAP[job.employmentType] ?? "OTHER",
    url: `${SITE_URL}/jobs/${job.slug}`,
    directApply: true,
    identifier: {
      "@type": "PropertyValue",
      name: employer.companyName,
      value: String(job.id),
    },
    hiringOrganization: {
      "@type": "Organization",
      name: employer.companyName,
      sameAs: `${SITE_URL}/companies/${employer.slug}`,
      ...(employer.companyLogoUrl ? { logo: employer.companyLogoUrl } : {}),
    },
  };

  if (job.locationType === "Remote") {
    schema.jobLocationType = "TELECOMMUTE";
    schema.applicantLocationRequirements = {
      "@type": "Country",
      name: job.location || "Anywhere",
    };
  } else if (job.location) {
    schema.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    };
  }

  if (job.minSalary > 0 && job.maxSalary > 0) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.minSalary,
        maxValue: job.maxSalary,
        unitText: "YEAR",
      },
    };
  }

  return schema;
}

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
