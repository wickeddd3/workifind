import { notFound } from "next/navigation";
import { EmployerHeader, EmployerTabs } from "@/entities/employer";
import { getEmployer } from "@/entities/employer/server";
import { getAuthUser } from "@/shared/lib/clerk.server";

export async function EmployerPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const employer = await getEmployer(userId);

  if (!employer) notFound();

  return (
    <section className="flex flex-col space-y-6 px-4">
      <EmployerHeader
        companyName={employer.companyName}
        companyEmail={employer.companyEmail}
        companyWebsite={employer.companyWebsite}
        companyLogoUrl={employer.companyLogoUrl}
        hasEditButton={true}
      />
      <EmployerTabs employer={employer} />
    </section>
  );
}
