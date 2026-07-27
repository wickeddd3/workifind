import { notFound } from "next/navigation";

import {
  buildOrganizationSchema,
  EmployerHeader,
  EmployerTabs,
  getEmployerBySlug,
} from "@/entities/employer";
import { JsonLd } from "@/shared/ui/JsonLd";

export async function CompanyPage({ slug }: { slug: string }) {
  const employer = await getEmployerBySlug(slug);

  if (!employer) notFound();

  return (
    <div className="mx-3 my-6 flex h-full max-w-4xl flex-col space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card md:mx-auto md:p-8">
      <JsonLd data={buildOrganizationSchema(employer)} />
      <EmployerHeader
        as="h1"
        companyName={employer.companyName}
        companyEmail={employer.companyEmail}
        companyWebsite={employer.companyWebsite}
        companyLogoUrl={employer.companyLogoUrl}
      />
      <EmployerTabs employer={employer} />
    </div>
  );
}
