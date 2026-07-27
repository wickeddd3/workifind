import type { Metadata } from "next";

import { getEmployerBySlug, getRecentEmployerSlugs } from "@/entities/employer";
import { CompanyPage } from "@/pages-component/CompanyPage";

// Public company profiles are identical for every visitor, so they are
// prerendered and refreshed hourly rather than rebuilt per request.
export const revalidate = 3600;

// Slugs not listed here are still served — Next renders them on first request
// and caches the result.
export async function generateStaticParams() {
  const slugs = await getRecentEmployerSlugs(200);

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const employer = await getEmployerBySlug(slug);

  if (!employer) return { title: "Company not found" };

  const title = employer.companyName;
  const details = [employer.industry, employer.location]
    .filter(Boolean)
    .join(" · ");
  const description = `${employer.companyName}${
    details ? ` — ${details}` : ""
  }. Discover the company and its open roles on workifind.`;

  return {
    title,
    description,
    alternates: { canonical: `/companies/${slug}` },
    openGraph: {
      type: "profile",
      title,
      description,
      url: `/companies/${slug}`,
      images: ["/og-image.png"],
    },
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <CompanyPage slug={slug} />;
}
