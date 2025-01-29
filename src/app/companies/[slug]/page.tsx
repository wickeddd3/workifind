import CompanyDetails from "@/components/companies/CompanyDetails";
import { cache } from "react";
import { notFound } from "next/navigation";
import { findCompanyBySlug } from "@/app/_services/company";

interface PageProps {
  params: { slug: string };
}

const handleFindCompanyBySlug = cache(async (slug: string) => {
  const company = await findCompanyBySlug(slug);

  if (!company) notFound();

  return company;
});

export default async function Page({ params: { slug } }: PageProps) {
  const company = await handleFindCompanyBySlug(slug);

  return (
    <main className="mx-auto h-full max-w-4xl p-4">
      {company && <CompanyDetails company={company} />}
    </main>
  );
}
