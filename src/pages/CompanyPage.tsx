import { notFound } from "next/navigation";
import {
  EmployerHeader,
  EmployerTabs,
  getEmployerProfileBySlug,
} from "@/entities/employer";

export async function CompanyPage({ slug }: { slug: string }) {
  const employer = await getEmployerProfileBySlug(slug);

  if (!employer) notFound();

  return (
    <main className="mx-auto flex h-full max-w-4xl flex-col space-y-6 p-4">
      <EmployerHeader
        companyName={employer.companyName}
        companyEmail={employer.companyEmail}
        companyWebsite={employer.companyWebsite}
        companyLogoUrl={employer.companyLogoUrl}
        hasEditButton={true}
      />
      <EmployerTabs employer={employer} />
    </main>
  );
}
