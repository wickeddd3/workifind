import type { Metadata } from "next";

import { getEmployerBySlug } from "@/entities/employer";
import { CompanyPage } from "@/pages-component/CompanyPage";

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
