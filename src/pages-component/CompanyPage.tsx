import { notFound } from "next/navigation";

import { getEmployerBySlug } from "@/entities/employer";
import { EmployerHeader } from "@/entities/employer/ui/EmployerHeader";
import { EmployerTabs } from "@/entities/employer/ui/EmployerTabs";

export async function CompanyPage({ slug }: { slug: string }) {
  const employer = await getEmployerBySlug(slug);

  if (!employer) notFound();

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col space-y-6 p-4">
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
