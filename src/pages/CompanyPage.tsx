import CompanyDetails from "@/components/companies/CompanyDetails";
import { cache } from "react";
import { notFound } from "next/navigation";
import { findCompanyBySlug } from "@/app/_services/company";

const handleFindCompanyBySlug = cache(async (slug: string) => {
  const company = await findCompanyBySlug(slug);

  if (!company) notFound();

  return company;
});

export async function CompanyPage({ slug }: { slug: string }) {
  const company = await handleFindCompanyBySlug(slug);

  return (
    <main className="mx-auto h-full max-w-4xl p-4">
      {company && <CompanyDetails company={company} />}
    </main>
  );
}
